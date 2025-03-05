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
  email,
  googleId,
  firstName,
  lastName,
  authProvider,
}: {
  email?: string;
  googleId?: string;
  firstName?: string;
  lastName?: string;
  authProvider?: string;
}) => {
  try {
    return await db.user.create({
      data: {
        googleId,
        email,
        firstName,
        lastName,
        authProvider
      },
    });
  } catch {
    return null;
  }
};


