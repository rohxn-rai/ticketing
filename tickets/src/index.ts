import { app } from "./app";
import mongoose from "mongoose";
import rabbitMQ from "./wrapper";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const connectWithRetry = async (
  connectFn: () => Promise<any>,
  serviceName: string
) => {
  let attempts = 0;
  const maxAttempts = 10;

  while (attempts < maxAttempts) {
    try {
      await connectFn();
      console.log(`Connected to ${serviceName} ✓`);
      return;
    } catch (err) {
      attempts++;
      console.log(
        `${serviceName} connection failed (${attempts}/${maxAttempts}), retrying in 5s...`
      );
      if (attempts >= maxAttempts) throw err;
      await sleep(5000);
    }
  }
};

const start = async () => {
  const PORT = 3000;

  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
  }
  if (!process.env.RABBITMQ_URL) {
    throw new Error("RABBITMQ_URL must be defined");
  }

  await connectWithRetry(
    () => mongoose.connect(process.env.MONGODB_URI!),
    "MongoDB"
  );

  await connectWithRetry(() => rabbitMQ.connect(), "RabbitMQ");

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error("Failed to start:", err);
  process.exit(1);
});
