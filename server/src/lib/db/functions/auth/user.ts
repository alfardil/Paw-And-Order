import { db } from "../..";

export const getUserWithId = async ({
  uuid,
}: {
  uuid: string;
}) => {
  return await db.user.findUnique({
    where: { uuid },
  });
};

export const getUserWithGoogleId = async ({
  googleId, 
}: {
  googleId: string;
}) => {
  return await db.user.findUnique({
    where: { googleId },
  });
}

export const createGoogleUser = async ({
  uuid,
  googleId,
  joinedAt,
  email,
  firstName,
  lastName,
  authProvider,
}: {
  uuid: string;
  googleId: string;
  joinedAt: Date;
  email: string;
  firstName: string;
  lastName: string;
  name: string;
  authProvider: string;
}) => {
  try {
    return await db.user.create({
      data: {
        uuid,
        googleId,
        joinedAt,
        email,
        firstName,
        lastName,
        authProvider,
      },
    });
  } catch {
    return null;
  }
};


