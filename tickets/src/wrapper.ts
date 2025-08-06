import amqp from "amqplib";
import type { ChannelModel, Channel, ConsumeMessage } from "amqplib";

class RabbitMQConnection {
  private connection?: ChannelModel;
  private channel?: Channel;
  private connected = false;

  async connect(): Promise<void> {
    if (this.connected && this.channel) return;

    this.connection = await amqp.connect(process.env.RABBITMQ_URL!);
    this.channel = await this.connection.createChannel();
    this.connected = true;
  }

  async sendToQueue(queue: string, message: any): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    this.channel!.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
  }

  async consume(
    queue: string,
    onMessage: (msg: ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel) {
      await this.connect();
    }
    await this.channel!.assertQueue(queue, { durable: true });
    this.channel!.consume(queue, onMessage);
  }

  async close(): Promise<void> {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
    this.connected = false;
    console.log("🛑 Connection closed");
  }
}

const rabbitMQ = new RabbitMQConnection();
export default rabbitMQ;
