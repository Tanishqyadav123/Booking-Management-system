/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { deleteEventByIdSerice } from "../repo/comedian.repo";
import { ErrorHandler } from "../middlewares/error.middleware";
import { getEventDetailByIdService } from "../repo/event.repo";
import { prisma } from "../lib/client";
import { responseHandler } from "../handlers/response.handler";
import { updateEventSeatPriceSchema } from "../validations/comedian.validation";
import { userType } from "../entity/auth.entity";

// API for deleting existing Event details :-
const cancelEventById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { eventId } = req.params;

    const { userId, userRole } = req.user!;
    if (!eventId) {
      throw next(new ErrorHandler("Event Id is not provided", 400));
    }
    const isEventExist = await getEventDetailByIdService(+eventId);

    if (!isEventExist) {
      throw next(new ErrorHandler("Event Details not found", 404));
    }

    if (userRole !== userType.ADMIN && isEventExist.comedianId !== userId) {
      throw next(new ErrorHandler("You can only cancel your Events", 403));
    }

    // First Check whether the event have not started :-
    const currentTime = new Date().toISOString();
    if (new Date(isEventExist.startTime).toISOString() < currentTime) {
      throw next(new ErrorHandler("Can not cancel event as it is already started", 400));
    }

    // Delete the event :-
    const deletedEvent = await deleteEventByIdSerice(+eventId);

    return responseHandler(res, "Event Cancelled SuccessFully", 200, deletedEvent);
  } catch (error) {
    throw error;
  }
};

//  API for updating the Pricing of seats of any event :-
const updateEventSeatsPrice = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { eventId } = req.params;

    const { userId } = req.user!;
    const { success, data } = updateEventSeatPriceSchema.safeParse(req.body);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }
    if (!eventId) {
      throw next(new ErrorHandler("Event Id is not provided", 400));
    }

    const { seatDetails } = data;

    const isValidEvent = await getEventDetailByIdService(+eventId);
    if (!isValidEvent) {
      throw next(new ErrorHandler("Event Details not found", 400));
    }

    if (isValidEvent.comedianId !== userId) {
      throw next(new ErrorHandler("You can only updated your event seat Price", 403));
    }

    // First Check whether the event have not started :-
    const currentTime = new Date().toISOString();
    if (new Date(isValidEvent.startTime).toISOString() < currentTime) {
      throw next(new ErrorHandler("Can not change the event seat price as it is already started", 400));
    }

    // Extracting all the seatId for that event :-
    const seatIds = isValidEvent.EventSeatDetails.map((eventSeats) => eventSeats.id);

    seatDetails.map((seat) => {
      if (!seatIds.includes(seat.eventSeatId)) {
        return next(new ErrorHandler("Invalid Event Seat Id Provided", 400));
      }
    });

    // Promsify the Process of updating the seat pricing :-
    await Promise.all(
      seatDetails.map(
        async (updateSeatDetails) =>
          await prisma.eventSeats.update({
            where: {
              id: updateSeatDetails.eventSeatId
            },
            data: {
              price: updateSeatDetails.price
            }
          })
      )
    );

    return responseHandler(res, `Seat Price updated successfully for ${isValidEvent.name}`, 200);
  } catch (error) {
    throw error;
  }
};

export { cancelEventById, updateEventSeatsPrice };
