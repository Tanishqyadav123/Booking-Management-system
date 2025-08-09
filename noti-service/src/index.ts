import express from "express";
import "dotenv/config";
import { EMAIL_QUEUE, PORT } from "./config/index";
import { getRabbitMQChannel } from "../../shared/src/config/rabbitMQ.config";
import { EmailPayloadType } from "./interfaces/email.interface";
import { sendMailToUser } from "./config/mailer.config";
const app = express();

async function init() {
  try {
    const { channel } = await getRabbitMQChannel();
    if (!channel) {
      throw new Error("Channel is not initialized for queues");
    }

    await channel.consume(EMAIL_QUEUE!, async (msg) => {
      // Need to convert the msg content into JSON object :-
      if (!msg) {
        throw new Error("Message could not found");
      }
      const msgPayload: EmailPayloadType = JSON.parse(msg?.content.toString());

      const { text, userEmail } = msgPayload;

      if (!text || !userEmail) {
        throw new Error("Required Fields are not provided");
      }

      // Send Email :-
      const mailResponse = await sendMailToUser({ userEmail, text });
      if (!mailResponse) {
        throw new Error("E-ticket could not sent over mail");
      }

      channel.ack(msg);
    });
  } catch (error) {
    throw error;
  }
}
app.listen(PORT, () => {
  console.log(
    `Notification Service : Server running on http://localhost:${PORT}`
  );
  init();
});
