/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateOrderSchema, verifyPaymentSchema } from "../validations/booking.validation";
import {
  isExistInBookedSeats,
  isExistTemporaryTableAndNotExpired,
  isValidEventIdForBooking,
  isValidSeatIds
} from "../repo/booking.repo";
import { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { ErrorHandler } from "../middlewares/error.middleware";
import { prisma } from "../lib/client";
import { razorpay } from "../config/razorpay.config";
import { RAZORPAY_KEY_SECRET } from "../config";
import { responseHandler } from "../handlers/response.handler";
const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;
    const parsedData = CreateOrderSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw next(new ErrorHandler(`Validation Failed : ${parsedData.error.errors.join(" ")}`, 400));
    }

    const { selectedSeatIds, totalPrice, eventId, receiptId } = parsedData.data;

    // // Step - 0 :- Check if the eventId is of valid Event and not started yet :-
    // const isValidEventId = await isValidEventIdForBooking(eventId);

    // if (!isValidEventId) {
    //   throw next(new ErrorHandler("Event Id is invalid or Event has already started", 400));
    // }
    // // Step - 1 :- Seats are valid and belongs to provided Event Id and not marked as booked:-

    // const isValid = await isValidSeatIds(selectedSeatIds, eventId);

    // if (!isValid) {
    //   throw next(new ErrorHandler("Invalid Seat Id for provided Event Id", 400));
    // }

    // // Step - 2 :- Check if already not in any temporary booking table and not expired yet :-

    // const isSeatLockedAlready = await isExistTemporaryTableAndNotExpired(selectedSeatIds);

    // if (isSeatLockedAlready) {
    //   throw next(new ErrorHandler("Seat Already Booked By other user...Please Refresh", 400));
    // }

    // // Step - 3 :- Check in the BookedSeats table :-

    // const isSeatBookedAlready = await isExistInBookedSeats(selectedSeatIds);

    // if (isSeatBookedAlready) {
    //   throw next(new ErrorHandler("Seat Already Booked By other user...Please Refresh", 400));
    // }

    // // Step - 4 :- Created transaction :-
    // await prisma.$transaction(async (tx) => {
    //   // Step - 5 :- Created an entry in the temporary lock table :-
    //   const temporarySeatDetails = selectedSeatIds.map((seatId) => ({
    //     userId,
    //     singleSeatId: seatId,
    //     expiresAt: new Date(new Date().setMinutes(new Date().getMinutes() + 10)).toISOString()
    //   }));

    //   await tx.temporaryLockSeats.createMany({
    //     data: temporarySeatDetails
    //   });

    //   // Step - 5 :- Create an order_id with razorpay:-

    //   const order = await razorpay.orders.create({
    //     amount: totalPrice * 100,
    //     currency: "INR",
    //     receipt: receiptId
    //   });
    //   // Step - 7 :- Create a b ooking entry in the table with status as PENDING :-

    //   const bookingEntry = await tx.booking.create({
    //     data: {
    //       amountPaid: totalPrice,
    //       orderId: order.id,
    //       userId
    //     }
    //   });

    //   if (!bookingEntry) {
    //     throw next(new ErrorHandler("Booking entry could not get created", 417));
    //   }
    // });

    const order = await razorpay.orders.create({
      amount: totalPrice * 100,
      currency: "INR",
      receipt: receiptId
    });

    return responseHandler(res, "Order Created SuccessFully", 201, {
      orderId: order.id
    });
  } catch (error) {
    throw error;
  }
};

const verifyPayment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { success, data } = verifyPaymentSchema.safeParse(req.body);

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

    console.log("Both the signatures are ", generated_signature, razorpay_signature!);

    if (generated_signature !== razorpay_signature) {
      throw next(new ErrorHandler("Payment Not Verified!!!", 402));
    }

    return responseHandler(res, "Payment Confirmed SuccessFully", 200);
  } catch (error) {
    throw error;
  }
};
export { createOrder, verifyPayment };
