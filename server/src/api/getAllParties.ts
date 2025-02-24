import { getAllParties } from "@/lib/db/functions/party";
import { Router } from "express";

export const fetchAllParties = Router();

fetchAllParties.get("/", async (_, res) => {
    try {
        const parties = await getAllParties();
        res.status(200).json(parties);
        } 
    catch (error) {
    res.status(500).json({ status: false, message: "Failed to fetch parties", error });
    }
});