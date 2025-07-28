import express, { Request, Response } from "express";

import { currentUser } from "../middlewares/current-user";
// import { requireAuth } from "../middlewares/require-auth";
// helper middleware for other services

const router = express.Router();

router.get("/api/users/currentuser", currentUser, ((
  req: Request,
  res: Response
) => {
  console.log(`${new Date().toLocaleString()} - Checked for user!`);

  res.send({ currentUser: req.currentUser || null });
}) as express.RequestHandler);

export { router as currentUserRouter };
