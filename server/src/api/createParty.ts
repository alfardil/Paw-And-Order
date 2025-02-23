import { createParty } from "@/lib/db/functions/party";
import { Router } from "express";
import { createPartySchema } from "@/validation/party.schema";
import { ZodError } from "zod";

export const createPartyRouter = Router();

createPartyRouter.post("/", async (req, res): Promise<any> => {
  console.log("Request body", req.body);

  try {
    const parsedBody = createPartySchema.parse(req.body);

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
    if (error instanceof ZodError) {
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