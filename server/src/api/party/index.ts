import { createParty, findParty, getAllParties, updateParty } from "@/lib/db";
import { sendSuperJson } from "@/lib/superjson-sender";
import { partySchema } from "@/validation/party.schema";
import { Router } from "express";
import { z } from "zod";

export const partyRouter = Router();

partyRouter.get("/fetch/all", async (_, res) => {
  try {
    const parties = await getAllParties();

    if (!parties || !parties.length) {
      return sendSuperJson(res, 404, {
        success: false,
        message: "No parties found.",
      });
    }

    return sendSuperJson(res, 200, {
      success: true,
      message: "Fetched all parties successfully.",
      data: parties,
    });
  } catch (error) {
    console.error("Error fetching parties:", error);
    return sendSuperJson(res, 500, {
      success: false,
      message: "An error occurred while fetching parties.",
    });
  }
});

partyRouter.get("/fetch/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const party = await findParty(id);
    return sendSuperJson(res, 200, { data: party, success: true, message: "Fetched party"})
  } catch (error) {
    return sendSuperJson(res, 500, { success: false, message: "An error occurred while fetching party." });
  }
});

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
      });
    }
    return sendSuperJson(res, 500, {
      success: false,
      message: "Internal server error.",
    });
  }
});

partyRouter.post("/join/:partyId", async (req, res) => {
  try {
    const user = res.locals.user;
    
    if (!user) {
      return sendSuperJson(res, 401, { success: false, message: "You are not authenticated." });
    }

    const {partyId} = req.params;
    const userId = user.uuid;

    const party = await findParty(partyId);
    if (!party) {
      return sendSuperJson(res, 404, { success: false, message: "Party not found." });
    }
    
    if (!userId) {
      return sendSuperJson(res, 400, { success: false, message: "User ID is required." });
    }

    const updatedParty = await updateParty(partyId, userId);

    if (!updatedParty) {
      return sendSuperJson(res, 500, { success: false, message: "Failed to update party." });
    }

    return sendSuperJson(res, 200, 
      { data: updatedParty, 
        success: true, 
        message: "Updated party"
      })
  } catch (error) {

    return sendSuperJson(res, 500, { 
      success: false, 
      message: "An error occurred while updating party." 
    });
  }
})