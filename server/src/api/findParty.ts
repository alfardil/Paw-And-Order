import { findParty } from "@/lib/db/functions/party";
import { Router } from "express"

export const findPartyRouter = Router();

findPartyRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const party = await findParty(id);
        res.status(200).json(party);
    }
    catch (error) {
    res.status(500).json({ status: false, message: "Failed to find party", error });    
    }
})