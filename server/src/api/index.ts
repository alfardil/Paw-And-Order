import { partyRouter } from "@/api/party";
import { Router } from "express";
import { authRouter } from "./auth";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/party", partyRouter);

// Place the different api routers below here, for example:
//
// ```tsx
// apiRouter.use("/lobby". lobbyRouter);
// apiRouter.use("/game". gameRouter);
// ```
//

// Route to fetch all users
// apiRouter.get("/users", async (_, res) => {
//   try {
//     const user = await getUserWithId({ id: "1" });
//     res.json({ data: user, status: true, message: "Fetched all users" });
//   } catch (error) {
//     res.status(500).json({ status: false, message: "Failed to fetch users", error });
//   }
// });
