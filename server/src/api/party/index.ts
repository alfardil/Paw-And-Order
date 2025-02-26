import { createParty, findParty, getAllParties } from "@/lib/db";
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

partyRouter.post("/create", async (req, res): Promise<any> => {
  try {
    const parsedBody = partySchema.parse(req.body);

    const newParty = await createParty(parsedBody);

    if (!newParty) {
      return res.status(500).json({
        status: false,
        message: "Failed to create party.",
      });
    }

    return res.status(201).json({
      status: true,
      data: newParty,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        status: false,
        message: "Validation failed.",
        errors: error.errors,
      });
    }

    console.error("Error in createPartyRouter POST:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error.",
    });
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
