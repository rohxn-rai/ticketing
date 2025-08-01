import express, { json } from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

import {
  errorHandler,
  NotFoundError,
} from "@ticketing-backend-packages/common";

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

app.use(async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
