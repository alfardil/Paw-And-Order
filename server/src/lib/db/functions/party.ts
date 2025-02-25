import { db } from "..";
import { z } from "zod";
import { partySchema } from "@/validation/party.schema";
import { Party } from "@prisma/client";

type CreatePartyInput = z.infer<typeof partySchema>;

export const getAllParties = async () => {
  try {
    return await db.party.findMany();
  }
  catch (error) {
    console.error("Function couldn't get all parties", error);
    return null;
  }
};

export const findParty = async (id: string) => {
  try {
    return await db.party.findUnique({
      where: { id },
      include: {users: true}
    });
  }
  catch (error) {
    console.error("Function couldn't find the party", error);
    return null;
  }
}

export const createParty = async (data: CreatePartyInput): Promise<Party | null> => {
  const {
    id,
    name,
    prompt,
    createdAt,
    users,
    roomCode,
    maxPlayers,
    started,
    ended,
    isFull,
    reports,
    feedbacks,
  } = data;

  try {
    return await db.party.create({
      data: {
        id,
        name,
        prompt,
        createdAt,
        roomCode,
        maxPlayers,
        started,
        ended,
        isFull,

        users: users.length > 0 ? {
          connect: users.map((uuid) => ({ uuid })),
        } : undefined,

        reports: undefined,
        feedbacks: undefined,
        
      },
    });
  } catch (error) {
    console.error("Function couldn't create the party", error);
    return null;
  }
};