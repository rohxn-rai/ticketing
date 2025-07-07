import express, { Request, Response } from "express";

import { currentUser } from "../middlewares/current-users";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, ((
  req: Request,
  res: Response
) => {
  res.send({ currentUser: req.currentUser || null });
}) as express.RequestHandler);

export { router as currentUserRouter };
