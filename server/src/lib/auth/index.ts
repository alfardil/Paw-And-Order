import cookieGen from "../cookie-gen";
import { db, getUserWithId } from "../db";
import { createSession, findSessionById, deleteSessionById, updateSessionById, deleteSessionsByUserId } from "../db/functions/auth/sessions";
import { User, Session } from "@prisma/client";
import { attempt } from "@/validation/attempt";
import { Response } from "express";

const DAYS_TILL_EXPIRE = 30;

const calculateExpiresAt = () => {
  const now = new Date();
  now.setDate(now.getDate() + DAYS_TILL_EXPIRE);
  return now;
};

export async function generateSession(userId: string): Promise<Session> {
  const [sessionError, session] = await attempt(
    createSession({ userId, expiresAt: calculateExpiresAt() }),
  );

  if (!session || sessionError) {
    throw new Error(`Failed to generate session: ${sessionError}`);
  }

  return session;
}

export async function validateSessionToken(
  token: string,
): Promise<SessionValidationResult> {
  const [sessionError, session] = await attempt(
    findSessionById({ id: token }),
  );

  if (!session || sessionError) {
    return { session: null, user: null };
  }

  const [userError, user] = await attempt(
    getUserWithId({ uuid: session.userId }),
  );

  if (!user || userError) {
    return { session: null, user: null };
  }

  const now = Date.now();

  if (now >= session.expiresAt.getTime()) {
    deleteSessionById({ id: session.id });
    return { session: null, user: null };
  }

  if (now >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * (DAYS_TILL_EXPIRE / 2)) {
    const expiresAt = calculateExpiresAt();
    const [error, successBool] = await attempt(
      updateSessionById({ id: session.id, deletedAt: expiresAt }),
    );

    if (error) {
      return { user, session };
    }

    if (!successBool) {
      return { user, session };
    }

    session.expiresAt = expiresAt;
  }

  return { user, session };
}

export async function invalidateSession(sessionId: string): Promise<boolean> {
  const [sessionError, sessionDeleted] = await attempt(
    deleteSessionById({ id: sessionId }),
  );

  if (sessionError) {
    return false;
  }

  return sessionDeleted;
}

export async function invalidateAllSessions(userId: string): Promise<boolean> {
  const [sessionsError, sessionsDeleted] = await attempt(
    deleteSessionsByUserId({ userId }),
  );

  if (sessionsError) {
    return false;
  }

  return sessionsDeleted;
}

export function setSessionTokenCookie(
  response: Response,
  token: string,
  expiresAt: Date,
): void {
  response.appendHeader(
    "Set-Cookie",
    cookieGen({
      name: "session_token",
      value: token,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      expires: expiresAt.toUTCString(),
    }),
  );
}

export function deleteSessionTokenCookie(response: Response): void {
  response.appendHeader(
    "Set-Cookie",
    cookieGen({
      name: "session_token",
      sameSite: "Lax",
      maxAge: 0,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    }),
  );
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };
