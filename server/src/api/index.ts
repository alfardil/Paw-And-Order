import { Router } from "express";

export const apiRouter = Router();

apiRouter.get("", (_, res) => {
  res.json({ status: true, message: "Hello, world!" });
});

// Place the different api routers below here, for example:
//
// ```tsx
// apiRouter.use("/lobby". lobbyRouter);
// apiRouter.use("/game". gameRouter);
// ```
//
