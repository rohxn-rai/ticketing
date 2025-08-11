import amqp from "amqplib";
import type { ChannelModel, Channel, ConsumeMessage } from "amqplib";

class RabbitMQConnection {
  private connection?: ChannelModel;
  private channel?: Channel;
  private connected = false;
  private connecting = false;

  async setupServiceQueue(
    exchangeName: string,
    serviceName: string,
    type: "fanout" | "direct" | "topic" = "fanout",
    routingKey = ""
  ): Promise<string> {
    await this.ensureConnected();

    await this.channel!.assertExchange(exchangeName, type, {
      durable: true,
    });

    const queueName = `${serviceName}-queue`;
    await this.channel!.assertQueue(queueName, { durable: true });

    await this.channel!.bindQueue(queueName, exchangeName, routingKey);

    return queueName;
  }

  async publishEvent(
    exchangeName: string,
    event: any,
    routingKey = ""
  ): Promise<void> {
    if (!this.channel) await this.connect();

    this.channel!.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(event)),
      { persistent: true }
    );
  }

  async connect(): Promise<void> {
    if (this.connected && this.channel) return;

    this.connection = await amqp.connect(process.env.RABBITMQ_URL!);
    this.channel = await this.connection.createChannel();
    this.connected = true;
    this.connecting = false;
  }

  async consume(
    queue: string,
    onMessage: (msg: ConsumeMessage | null) => void
  ): Promise<void> {
    await this.ensureConnected();

    try {
      await this.channel!.consume(queue, onMessage, { noAck: false });
    } catch (error) {
      console.error("Failed to consume from queue:", error);
      this.handleConnectionError();
      throw error;
    }
  }

  ack(msg: ConsumeMessage): void {
    try {
      if (this.channel) {
        this.channel.ack(msg);
      }
    } catch (error) {
      console.error("Failed to ack message:", error);
    }
  }

  nack(msg: ConsumeMessage, requeue = true): void {
    try {
      if (this.channel) {
        this.channel.nack(msg, false, requeue);
      }
    } catch (error) {
      console.error("Failed to nack message:", error);
    }
  }

  async close(): Promise<void> {
    this.connected = false;
    try {
      if (this.channel) {
        await this.channel.close();
      }
    } catch (e) {
      console.error("Error closing channel:", e);
    }

    try {
      if (this.connection) {
        await this.connection.close();
      }
    } catch (e) {
      console.error("Error closing connection:", e);
    }

    this.channel = undefined;
    this.connection = undefined;
    console.log("X - Connection closed!");
  }

  private async ensureConnected(): Promise<void> {
    if (!this.connected || !this.channel) {
      await this.connect();
    }
  }

  private handleConnectionError(): void {
    this.connected = false;
    this.channel = undefined;
    this.connection = undefined;
  }

  isConnected(): boolean {
    return this.connected && !!this.channel;
  }
}

const rabbitMQ = new RabbitMQConnection();
export default rabbitMQ;
