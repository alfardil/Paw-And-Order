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
  googleId
}: {
  email?: string;
  googleId?: string;
}) => {
  try {
    return await db.user.create({
      data: {
        googleId,
        email,
      },
    });
  } catch {
    return null;
  }
};


