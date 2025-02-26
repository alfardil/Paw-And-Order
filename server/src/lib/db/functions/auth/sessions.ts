import { Session } from "shared/db";
import { db } from "../../index";

export async function findSessionById({
  id,
}: {
  id: string;
}): Promise<Session | null> {
  return await db.session.findUnique({
    where: { id },
  });
}

export async function findSessionsByUserId({
  userId,
}: {
  userId: string;
}): Promise<Session[]> {
  return await db.session.findMany({
    where: { userId },
  });
}

export async function createSession({
  userId,
  expiresAt,
}: {
  userId: string;
  expiresAt: Date;
}): Promise<Session | null> {
  try {
    const session = await db.session.create({
      data: {
        userId,
        expiresAt,
      },
    });
    return session;
  } catch (error) {
    console.error("Error creating session:", error);
    return null;
  }
}

export async function updateSessionById({
  id,
  deletedAt,
}: {
  id: string;
  deletedAt: Date;
}): Promise<boolean> {
  try {
    const session = await db.session.update({
      where: { id },
      data: { deletedAt },
    });
    return !!session;
  } catch (error) {
    console.error("Error updating session:", error);
    return false;
  }
}

export async function deleteSessionById({ id }: { id: string }) {
  try {
    const session = await db.session.delete({
      where: { id },
    });
    return !!session;
  } catch (error) {
    console.error("Error deleting session:", error);
    return false;
  }
}

export async function deleteSessionsByUserId({
  userId,
}: {
  userId: string;
}): Promise<boolean> {
  try {
    const result = await db.session.deleteMany({
      where: { userId },
    });
    return result.count > 0;
  } catch (error) {
    console.error("Error deleting sessions for user:", error);
    return false;
  }
}
