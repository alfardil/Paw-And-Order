import { createParty, findParty, getAllParties } from "@/lib/db";
import { sendSuperJson } from "@/lib/superjson-sender";
import { attempt } from "@/validation/attempt";
import { partySchema } from "@/validation/party.schema";
import { Router } from "express";
import { z } from "zod";

export const partyRouter = Router();

partyRouter.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const party = await findParty(id);
    res.status(200).json(party);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Failed to find party", error });
  }
});

partyRouter.get("/fetch/all", async (_, res) => {
  // TODO: IMPLEMENT THIS
})
 

partyRouter.post("/create", async (req, res): Promise<any> => {
  try {
    const parsedBody = partySchema.parse(req.body);
    const newParty = await createParty(parsedBody);

    if (!newParty) {
      return sendSuperJson(res, 500, {
        success: false,
        message: "Failed to create party.",
      });
    }

    return sendSuperJson(res, 201, {
      success: true,
      message: "Party created successfully.",
      data: newParty,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendSuperJson(res, 400, {
        success: false,
        message: "Zod error",
      })
    }
    return sendSuperJson(res, 500, {
      success: false,
      message: "Internal server error.",
    })
  }
});

partyRouter.get("/find", async (_, res) => {
  try {
    const parties = await getAllParties();
    res.status(200).json(parties);
  } catch (error) {
    res
      .status(500)
      .json({ status: false, message: "Failed to fetch parties", error });
  }
});
