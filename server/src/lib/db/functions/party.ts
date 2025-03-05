import { db } from "..";
import { Party } from "shared/db";


export type PartyInput = Party & {
  users?: {
    uuid: string;
    authProvider: string;
    email: string;
    firstName: string;
    lastName: string;
    googleId: string;
    joinedAt: Date;
  }[];
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
        
        users: users?.length
        ? {
            connectOrCreate: users.map((user) => ({
              where: { uuid: user.uuid },
              create: {
                uuid: user.uuid,
                authProvider: user.authProvider,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                googleId: user.googleId,
                joinedAt: user.joinedAt,
              },
            })),
          }
        : undefined,

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
      include: {users: true, reports: true, feedbacks: true},
    });
  }
  catch (error) {
    console.error("Function couldn't find the party", error);
    return null;
  }
};

export const updateParty = async (partyId: string, currentUserId: string) => {
  try {
    return await db.party.update({
      where: { id: partyId },
      data: {
        users: {
          connect: { uuid: currentUserId },
        },
      },
    });
  } catch (error) {
    console.error("Failed to update the party:", error);
    throw new Error("Failed to update the party");
  }
};


// export const updateParty = async (
//   partyId: string,
//   currentUserId: string,
//   data: Partial<PartyInput> = {}
// ) => {
//   try {
//     return await db.party.update({
//       where: { id: partyId },
//       data: {
//         ...data,
        
//         users: {
//           connect: { uuid: currentUserId }
//         },
//         reports: data.reports
//           ? {
//               set: [],
//               create: data.reports.map((report) => ({
//                 id: report.id,
//                 createdAt: report.createdAt,
//                 message: report.message,
//                 userUuid: report.userUuid,
//               })),
//             }
//           : undefined,
//         feedbacks: data.feedbacks
//           ? {
//               set: [],
//               create: data.feedbacks.map((feedback) => ({
//                 id: feedback.id,
//                 createdAt: feedback.createdAt,
//                 content: feedback.content,
//                 userUuid: feedback.userUuid,
//               })),
//             }
//           : undefined,
//       },
//     });
//   } catch (error) {
//     console.error("Function couldn't update the party", error);
//     throw new Error("Failed to update the party");
//   }
// };