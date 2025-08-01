import express, { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "@ticketing-backend-packages/common";
// import { requireAuth } from "@ticketing-backend-packages/common";

const router = express.Router();

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("requireAuth called, currentUser:", req.currentUser);
  if (!req.currentUser) {
    console.log("Throwing NotAuthorizedError");
    const error = new NotAuthorizedError();
    console.log("Error statusCode:", error.statusCode);
    console.log(
      "Error instanceof NotAuthorizedError:",
      error instanceof NotAuthorizedError
    );
    throw error;
  }
  next();
};

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export { router as createTicketRouter };
