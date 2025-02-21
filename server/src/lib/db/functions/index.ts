import { db } from "..";

export const getUserWithId = async ({
  id,
}: {
  id: string;
}) => {
  return await db.user.findUnique({
    where: { id },
  });
};

export const createUser = async ({
  id,
  email,
  name,
}: {
  id: string;
  email: string;
  name: string;
}) => {
  try {
    return await db.user.create({
      data: {
        id,
        email,
        name,
      },
    });
  } catch {
    return null;
  }
};


