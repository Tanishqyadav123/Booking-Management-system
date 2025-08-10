import nodemailer from "nodemailer";
import { MAIL_APP_PASS, MAIL_USER } from ".";
import { EmailPayloadType } from "../interfaces/email.interface";
import { generateEmailHtml } from "../helper/generateEmailTemplate";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_APP_PASS,
  },
});

export async function sendMailToUser({
  userEmail,
  text,
  bookedSeatNumbers,
  eventEndTime,
  eventName,
  eventStartTime,
  viewerName,
}: EmailPayloadType) {
  return await mailTransporter.sendMail({
    from: MAIL_USER,
    to: userEmail,
    subject: "E-Ticket for your Seat",
    html: generateEmailHtml({
      viewerName,
      bookedSeatNumbers,
      eventName,
      eventEndTime,
      eventStartTime,
      text,
    }),
  });
}
