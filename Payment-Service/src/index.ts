import express, { Request, Response } from "express";
import { getRabbitMQChannel } from "../../shared/src/config/rabbitMQ.config";
import "dotenv/config";
import { PAYMENT_QUEUE, EMAIL_QUEUE } from "./config/index";
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
  try {
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

        //Creating a transaction :-
        let allTemporaryLockedSeats: any[] = [];
        const singleSeatUpdate = await prisma.$transaction(async (tx) => {
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
          allTemporaryLockedSeats = await tx.temporaryLockSeats.findMany({
            where: {
              orderId: order_id,
            },
            include: {
              singleSeatDetails: true,
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

          return await tx.singleEventSeat.updateMany({
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

        // Add An Entry in the Email-Queue for E-ticket :-
        if (singleSeatUpdate.count <= 0) {
          throw new Error("Failed to verify payment");
        }

        // Fetch the user Details :-
        const userDetails = await prisma.user.findUnique({
          where: {
            id: userId,
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        });

        // Seat Details / Seat Name :-

        if (!userDetails) throw new Error("User Details not found");

        if (allTemporaryLockedSeats.length) {
          let seatDetails = await prisma.bookedSeat.findMany({
            where: {
              bookingId: bookingDetailsId,
            },
            include: {
              singleSeatDetails: {
                select: {
                  seatNumber: true,
                  eventSeatDetails: {
                    select: {
                      eventDetails: {
                        select: {
                          name: true,
                          startTime: true,
                          endTime: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          });

          const emailPayloadJson = {
            viewerName: `${userDetails.firstName} ${userDetails.lastName}`,
            userEmail: userDetails?.email,
            text: `Thanks you choosing us , your ticket is confirmed`,
            bookedSeatNumbers: seatDetails.map(
              (seat) => seat.singleSeatDetails.seatNumber
            ),
            eventName:
              seatDetails.length &&
              seatDetails[0]?.singleSeatDetails?.eventSeatDetails?.eventDetails
                ?.name,
            eventStartTime:
              seatDetails.length &&
              seatDetails[0]?.singleSeatDetails?.eventSeatDetails?.eventDetails
                ?.endTime,
            eventEndTime:
              seatDetails.length &&
              seatDetails[0]?.singleSeatDetails?.eventSeatDetails?.eventDetails
                ?.startTime,
          };
          channel.sendToQueue(
            EMAIL_QUEUE!,
            Buffer.from(JSON.stringify(emailPayloadJson))
          );
        }

        // Acknowledgement for Payment Queue :-
        channel.ack(msg);
      } else {
        console.log("waiting for msg");
      }
    });
  } catch (error) {
    throw error;
  }
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  init();
});
