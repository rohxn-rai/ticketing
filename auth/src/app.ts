import express, { json } from "express";
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

export { app };
