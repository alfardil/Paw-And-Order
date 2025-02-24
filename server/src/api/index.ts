import { Router } from "express";
import { createPartyRouter } from "./createParty";
import { fetchAllParties } from "./getAllParties";

export const apiRouter = Router();

apiRouter.get("", (_, res) => {
  res.json({ status: true, message: "Hello, world!" });
});

apiRouter.use("/party/create", createPartyRouter);
apiRouter.use("/party/fetch", fetchAllParties);


// Place the different api routers below here, for example:
//
// ```tsx
// apiRouter.use("/lobby". lobbyRouter);
// apiRouter.use("/game". gameRouter);
// ```
//
