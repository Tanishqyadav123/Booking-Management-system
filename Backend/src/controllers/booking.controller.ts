/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateOrderSchema, verifyPaymentSchema } from "../validations/booking.validation";
import {
  isExistInBookedSeats,
  isExistTemporaryTableAndNotExpired,
  isValidEventIdForBooking,
  isValidSeatIds
} from "../repo/booking.repo";
import { NextFunction, Request, Response } from "express";
import { PAYMENT_QUEUE, RAZORPAY_KEY_SECRET } from "../config";
import crypto from "crypto";
import { ErrorHandler } from "../middlewares/error.middleware";
import { getRabbitMQChannel } from "../../../shared/src/config/rabbitMQ.config";
import { prisma } from "../lib/client";
import { razorpay } from "../config/razorpay.config";
import { responseHandler } from "../handlers/response.handler";
const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;
    const parsedData = CreateOrderSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw next(new ErrorHandler(`Validation Failed : ${parsedData.error.errors.join(" ")}`, 400));
    }

    const { selectedSeatIds, totalPrice, eventId, receiptId } = parsedData.data;

    // Step - 0 :- Check if the eventId is of valid Event and not started yet :-
    const isValidEventId = await isValidEventIdForBooking(eventId);

    if (!isValidEventId) {
      throw next(new ErrorHandler("Event Id is invalid or Event has already started", 400));
    }
    // Step - 1 :- Seats are valid and belongs to provided Event Id and not marked as booked:-

    const isValid = await isValidSeatIds(selectedSeatIds, eventId);

    if (!isValid) {
      throw next(new ErrorHandler("Invalid Seat Id for provided Event Id", 400));
    }

    // Step - 2 :- Check if already not in any temporary booking table and not expired yet :-

    const isSeatLockedAlready = await isExistTemporaryTableAndNotExpired(selectedSeatIds);

    if (isSeatLockedAlready) {
      throw next(new ErrorHandler("Seat Already Booked By other user...Please Refresh", 400));
    }

    // Step - 3 :- Check in the BookedSeats table :-

    const isSeatBookedAlready = await isExistInBookedSeats(selectedSeatIds);

    if (isSeatBookedAlready) {
      throw next(new ErrorHandler("Seat Already Booked By other user...Please Refresh", 400));
    }

    // Step - 4 :- Created transaction :-
    let orderId: string = "";
    await prisma.$transaction(async (tx) => {
      // Step - 5 :- Create an order_id with razorpay:-

      const order = await razorpay.orders.create({
        amount: totalPrice * 100,
        currency: "INR",
        receipt: receiptId
      });

      // Step - 5 :- Created an entry in the temporary lock table :-
      const temporarySeatDetails = selectedSeatIds.map((seatId) => ({
        userId,
        singleSeatId: seatId,
        expiresAt: new Date(new Date().setMinutes(new Date().getMinutes() + 10)).toISOString(),
        orderId: order.id
      }));

      await tx.temporaryLockSeats.createMany({
        data: temporarySeatDetails
      });
      // Step - 7 :- Create a b ooking entry in the table with status as PENDING :-

      const bookingEntry = await tx.booking.create({
        data: {
          amountPaid: totalPrice,
          orderId: order.id,
          userId,
          status: "PENDING"
        }
      });

      if (!bookingEntry) {
        throw next(new ErrorHandler("Booking entry could not get created", 417));
      }
      orderId = order.id;
    });

    return responseHandler(res, "Order Created SuccessFully", 201, {
      orderId
    });
  } catch (error) {
    throw error;
  }
};

const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = verifyPaymentSchema.safeParse(req.body);
    const { userId } = req.user!;

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = data;

    // Verify the Signature :-
    const payload = `${razorpay_order_id}|${razorpay_payment_id}`;
    const generated_signature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET!)
      .update(payload.toString())
      .digest("hex");

    // Fetch the booking Details
    const bookingDetails = await prisma.booking.findFirst({
      where: {
        orderId: razorpay_order_id
      }
    });
    if (!bookingDetails) {
      throw next(new ErrorHandler("No Booking Details Found", 404));
    }

    if (generated_signature !== razorpay_signature) {
      //Update  for cancel booking :-

      // Update the entry :-
      await prisma.booking.update({
        where: {
          id: bookingDetails.id
        },
        data: {
          status: "FAILED"
        }
      });

      throw next(new ErrorHandler("Payment Not Verified!!!", 402));
    }

    // Pushing in to my Payment Queue for off-loading the load :-

    const { channel } = await getRabbitMQChannel();

    if (!channel) {
      throw next(new ErrorHandler("Payment Queue is not initialized", 500));
    }

    const paymentJson = {
      bookingDetailsId: bookingDetails.id,
      status: "COMPLETED",
      razorpay_payment_id,
      order_id: razorpay_order_id,
      userId
    };

    console.log("Off Loading the payment load ", paymentJson);
    channel?.sendToQueue(PAYMENT_QUEUE!, Buffer.from(JSON.stringify(paymentJson)), {
      persistent: true
    });

    return responseHandler(res, "Payment Verification Process Initiated", 200);
  } catch (error) {
    throw error;
  }
};
export { createOrder, verifyPayment };
