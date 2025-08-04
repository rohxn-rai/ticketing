import express, { json } from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@ticketing-backend-packages/common";

import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes/index";
import { updateTicketRouter } from "./routes/update";

dotenv.config();

const app = express();

app.set("trust proxy", true);

app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.use(async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
