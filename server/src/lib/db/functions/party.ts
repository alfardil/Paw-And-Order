import { db } from "..";
import { z } from "zod";
import { partySchema } from "@/validation/party.schema";

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

export const createParty = async (data: CreatePartyInput) => {
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

        users: {
          connect: users.map((uuid) => ({ uuid })),
        },

        reports: {
          create: reports.map((report) => ({
            id: report.id ?? undefined,
            createdAt: report.createdAt,
            message: report.message,
            user: {
              connect: { uuid: report.userUuid },
            },
          })),
        },

        feedbacks:
          feedbacks && feedbacks.length > 0
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
      },
    });
  } catch (error) {
    console.error("Function couldn't create the party", error);
    return null;
  }
};