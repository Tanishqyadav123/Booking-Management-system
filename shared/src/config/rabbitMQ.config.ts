import amqplib, { Channel, ChannelModel } from "amqplib";
import { CONNECTION_ENDPOINT, PAYMENT_QUEUE } from "./index";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;
async function getRabbitMQChannel() {
  if (!connection) {
    connection = await amqplib.connect(CONNECTION_ENDPOINT!);
    channel = await connection.createChannel();
    await channel.assertQueue(PAYMENT_QUEUE!, { durable: true });

    console.log("RabbitMQ connected & payment channel ready");
  }

  return { channel };
}

export { getRabbitMQChannel };
