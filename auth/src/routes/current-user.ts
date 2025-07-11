import express, { Request, Response } from "express";

import { currentUser } from "../middlewares/current-users";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, requireAuth, ((
  req: Request,
  res: Response
) => {
  res.send({ currentUser: req.currentUser || null });
}) as express.RequestHandler);

export { router as currentUserRouter };
