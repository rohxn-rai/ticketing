import express, { json } from "express";
import cookieSession from "cookie-session";

import {
  currentUser,
  errorHandler,
  NotFoundError,
} from "@rohxnrai/todo-backend";

import { indexOrderRouter } from "./routes/index";
import { cancelOrderRouter } from "./routes/cancel";
import { showOrderRouter } from "./routes/show";
import { newOrderRouter } from "./routes/new";

const app = express ();

app.set ( "trust proxy", true );

app.use ( json () );

app.use (
  cookieSession ( {
    signed : false,
    secure : process.env.NODE_ENV !== "test",
  } )
);

app.use ( currentUser );

app.use ( indexOrderRouter );
app.use ( cancelOrderRouter );
app.use ( showOrderRouter );
app.use ( newOrderRouter );

app.use ( async ( req, res, next ) => {
  next ( new NotFoundError () );
} );

app.use ( errorHandler );

export { app };
