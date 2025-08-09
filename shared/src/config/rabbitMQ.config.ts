import amqplib, { Channel, ChannelModel } from "amqplib";
import { CONNECTION_ENDPOINT, EMAIL_QUEUE, PAYMENT_QUEUE } from "./index";

let connection: ChannelModel | null = null;
let channel: Channel | null = null;
async function getRabbitMQChannel() {
  if (!connection) {
    connection = await amqplib.connect(CONNECTION_ENDPOINT!);
    channel = await connection.createChannel();

    // Asserting queues for payment Service and Notification-Service :-
    await channel.assertQueue(PAYMENT_QUEUE!, { durable: true });
    await channel.assertQueue(EMAIL_QUEUE!, { durable: true });

    console.log("RabbitMQ connected & payment channel ready");
  }

  return { channel };
}

export { getRabbitMQChannel };
