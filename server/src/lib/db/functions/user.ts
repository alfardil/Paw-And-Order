import { db } from "..";

export const getUserWithId = async ({
  uuid,
}: {
  uuid: string;
}) => {
  return await db.user.findUnique({
    where: { uuid },
  });
};

export const createUser = async ({
  uuid,
  joinedAt,
  email,
  name,
  authProvider,
}: {
  uuid: string;
  joinedAt: Date;
  email: string;
  name: string;
  authProvider: string;
}) => {
  try {
    return await db.user.create({
      data: {
        uuid,
        joinedAt,
        email,
        name,
        authProvider,
      },
    });
  } catch {
    return null;
  }
};


