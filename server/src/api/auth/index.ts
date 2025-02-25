import { authRouterV1 } from "@/api/auth/v1";
import { Router } from "express";

export const authRouter = Router();

authRouter.use("/v1", authRouterV1);
