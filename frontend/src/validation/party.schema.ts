import { z } from "zod";

export const partySchema = z.object({
  id: z.string().default(() => crypto.randomUUID()),
  name: z.string().nonempty("Party name is required."),
  prompt: z.string().nonempty("Prompt is required."),
  roomCode: z.string().nonempty("Room code is required."),

  createdAt: z.coerce.date().default(() => new Date()),
  maxPlayers: z.coerce.number().default(2),
  
  started: z.coerce.boolean().default(false),
  ended: z.coerce.boolean().default(false),
  isFull: z.coerce.boolean().default(false),

  users: z.array(z.string()).default([]),

  reports: z
    .array(
      z.object({
        id: z.string().optional(),
        createdAt: z.coerce.date().default(() => new Date()),

        message: z.string(),

        userUuid: z.string(),
      })
    )
    .default([]),

  feedbacks: z
    .array(
      z.object({
        id: z.string().optional(),
        createdAt: z.coerce.date().default(() => new Date()),
        content: z.string(),
        userUuid: z.string(),
      })
    )
    .default([]),
});

export type Party = z.infer<typeof partySchema>;