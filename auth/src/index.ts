import express, { json } from "express";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import dotenv from "dotenv";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import errorHandler from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";

dotenv.config();

const app = express();

app.enable("trust proxy");
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
    httpOnly: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(async (req, res, next) => {
  next(new NotFoundError());
});

app.use(errorHandler);

const start = async () => {
  const PORT = 8000;

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/ticketing-auth");
    console.log("Connected to MongoDB :]");
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log("Listening on port 8000");
  });
};

start();
