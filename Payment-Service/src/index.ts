import express, { Request, Response } from "express";
import { getRabbitMQChannel } from "../../shared/src/config/rabbitMQ.config";
import "dotenv/config";
import { PAYMENT_QUEUE } from "./config/index";
import { prisma } from "../../shared/src/lib/client";
const app = express();
const port = process.env.PORT || 3000;

interface PaymentPayloadType {
  bookingDetailsId: number;
  status: "COMPLETED" | "FAILED";
  razorpay_payment_id: string;
  order_id: string;
  userId: string;
}

async function init() {
  const { channel } = await getRabbitMQChannel();

  channel?.consume(PAYMENT_QUEUE!, async (msg) => {
    if (msg) {
      let {
        bookingDetailsId,
        order_id,
        razorpay_payment_id,
        status,
        userId,
      }: PaymentPayloadType = JSON.parse(msg.content.toString());

      console.log("Received at consumer end ", {
        bookingDetailsId,
        order_id,
        razorpay_payment_id,
        status,
        userId,
      });

      //Creating a transaction :-
      await prisma.$transaction(async (tx) => {
        // Updating the booking status TO "COMPLETED" :-
        await tx.booking.update({
          where: {
            id: bookingDetailsId,
          },
          data: {
            status,
          },
        });

        // Creating an entry in the Payment table with razorpay Payment Id :-

        await tx.payment.create({
          data: {
            paymentKey: razorpay_payment_id,
            userId,
            bookingId: bookingDetailsId,
          },
        });

        // remove all the temporary Locked seats corresponding to that booking and add into the booked seat table :-
        const allTemporaryLockedSeats = await tx.temporaryLockSeats.findMany({
          where: {
            orderId: order_id,
          },
        });

        if (allTemporaryLockedSeats && allTemporaryLockedSeats.length > 0) {
          const ids = allTemporaryLockedSeats.map((x) => x.id);
          await tx.temporaryLockSeats.deleteMany({
            where: {
              id: {
                in: ids,
              },
            },
          });
        }
        const bookedSeatsData = allTemporaryLockedSeats.map(
          (temporarySeats) => ({
            bookingId: bookingDetailsId,
            singleSeatId: temporarySeats.singleSeatId,
          })
        );

        if (bookedSeatsData && bookedSeatsData.length > 0) {
          await tx.bookedSeat.createMany({
            data: bookedSeatsData,
          });
        }
        // update the entry for singleSeatId to IsBooked "True"
        const allSingleSeatsId = allTemporaryLockedSeats.map(
          (tL) => tL.singleSeatId
        );

        await tx.singleEventSeat.updateMany({
          where: {
            id: {
              in: allSingleSeatsId,
            },
          },
          data: {
            isBooked: true,
          },
        });
      });

      channel.ack(msg);
    } else {
      console.log("waiting for msg");
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  init();
});
