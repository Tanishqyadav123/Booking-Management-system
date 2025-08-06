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

    console.log("Is here API hittinhg");
    //Creating a transaction :-
    await prisma.$transaction(async (tx) => {
      // Updating the booking status TO "COMPLETED" :-
      await tx.booking.update({
        where: {
          id: bookingDetails.id
        },
        data: {
          status: "COMPLETED"
        }
      });

      // Creating an entry in the Payment table with razorpay Payment Id :-

      await tx.payment.create({
        data: {
          paymentKey: razorpay_payment_id,
          userId,
          bookingId: bookingDetails.id
        }
      });

      // remove all the temporary Locked seats corresponding to that booking and add into the booked seat table :-
      const allTemporaryLockedSeats = await tx.temporaryLockSeats.findMany({
        where: {
          orderId: razorpay_order_id
        }
      });

      if (allTemporaryLockedSeats && allTemporaryLockedSeats.length > 0) {
        const ids = allTemporaryLockedSeats.map((x) => x.id);
        await tx.temporaryLockSeats.deleteMany({
          where: {
            id: {
              in: ids
            }
          }
        });
      }
      const bookedSeatsData = allTemporaryLockedSeats.map((temporarySeats) => ({
        bookingId: bookingDetails.id,
        singleSeatId: temporarySeats.singleSeatId
      }));

      if (bookedSeatsData && bookedSeatsData.length > 0) {
        await tx.bookedSeat.createMany({
          data: bookedSeatsData
        });
      }
      // update the entry for singleSeatId to IsBooked "True"
      const allSingleSeatsId = allTemporaryLockedSeats.map((tL) => tL.singleSeatId);

      await tx.singleEventSeat.updateMany({
        where: {
          id: {
            in: allSingleSeatsId
          }
        },
        data: {
          isBooked: true
        }
      });
    });

    return responseHandler(res, "Payment Confirmed SuccessFully", 200);
  } catch (error) {
    throw error;
  }
};
export { createOrder, verifyPayment };
