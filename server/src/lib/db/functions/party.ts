import { db } from "..";
import { Party } from "@prisma/client";

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

export type PartyInput = Party & {
  users?: string[];
  reports?: {
    id?: string;
    createdAt: Date;
    message: string;
    userUuid: string;
  }[];
  feedbacks?: {
    id?: string;
    createdAt: Date;
    content: string;
    userUuid: string;
  }[];
}

export const createParty = async (data: PartyInput): Promise<Party> => {
  const {
    id,
    name,
    prompt,
    createdAt,
    roomCode,
    maxPlayers,
    started,
    ended,
    isFull,
    users,
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
        
        users: users?.length ? {connect: users.map((uuid) => ({uuid}))} : undefined,

        reports: reports?.length
          ? {
              create: reports.map((report) => ({
                id: report.id ?? undefined,
                createdAt: report.createdAt,
                message: report.message,
                user: {
                  connect: { uuid: report.userUuid },
                },
              })),
            }
          : undefined,

          feedbacks: feedbacks?.length
          ? {
              create: feedbacks.map((feedback) => ({
                id: feedback.id ?? undefined,
                createdAt: feedback.createdAt,
                content: feedback.content,
                user: {
                  connect: { uuid: feedback.userUuid },
                },
              })),
            }
          : undefined,

          
      }});
    } 
  
  catch (error) {
    console.error("Function couldn't create the party", error);
    throw new Error("Failed to create party");
  }
};