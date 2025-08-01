import mongoose from "mongoose";

import { app } from "./app";

const start = async () => {
  const PORT = 3000;

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB :]");
  } catch (err) {
    console.log(err);
  }

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start();
