/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllMyEventsService,
  getEventDetailByIdService,
  getEventDetailsWithSingleSeats,
  isVenueBookForThatTimeService
} from "../repo/event.repo";
import { NextFunction, Request, Response } from "express";
import { createNewEventSchema } from "../validations/comedian.validation";
import { ErrorHandler } from "../middlewares/error.middleware";
import { generateFilePath } from "../utils/generateFilepath";
import { getVenueByIdService } from "../repo/venue.repo";
import { prisma } from "../lib/client";
import { responseHandler } from "../handlers/response.handler";

// Controller for comedian Routes :-
const allMyEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const { userId } = req.user!;
    const eventList = await getAllMyEventsService({ comedianId: userId });

    eventList.forEach((eventDetails) => {
      if (eventDetails.eventBanner) {
        eventDetails.eventBanner = generateFilePath(eventDetails.eventBanner);
      }
    });

    return responseHandler(res, "List of all your events ", 200, eventList);
  } catch (error) {
    throw error;
  }
};

const createNewEvent = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { userId } = req.user!;

    const file = req.file;
    const { success, data, error } = createNewEventSchema.safeParse(req.body);
    console.log("Error are ", error?.errors);

    if (!success) {
      throw next(new ErrorHandler("Validation Failed", 400));
    }

    if (!file || !file?.path) {
      throw next(new ErrorHandler("Please Provide a Banner for your Event", 400));
    }

    const { endTime, entireVenue, startTime, venueId } = data;

    if (startTime > endTime) {
      throw next(new ErrorHandler("Start Time can not be greater than endTime", 400));
    }

    const isVenueExist = await getVenueByIdService(+venueId);

    if (!isVenueExist) {
      throw next(new ErrorHandler("Venue with provided Id not found", 404));
    }
    // Check if the venue is already booked for some else and the comdian have request to book the whole venue :-

    // for that time :-
    const isVenueEngage = await isVenueBookForThatTimeService({ venueId: +venueId, end: endTime, start: startTime });

    if (isVenueEngage && entireVenue === "true") {
      throw next(new ErrorHandler("We already have a booking for this time slot", 400));
    }

    // Otherwise create an event in the transaction :-

    const { eventSeats, ...rest } = data;

    const eventData = await prisma.$transaction(async (tx) => {
      const newEvent = await tx.event.create({
        data: {
          ...rest,
          comedianId: userId,
          eventBanner: file.path,
          venueId: +rest.venueId,
          entireVenue: entireVenue === "true" ? true : false
        }
      });
      console.log("Printing the New Add Event", newEvent);
      await Promise.all(
        (eventSeats ?? [])?.map(async (eventSeat) => {
          // First Create an entry for Event Seat Details :-
          const eventSeatDetails = await tx.eventSeats.create({
            data: {
              ...eventSeat,
              eventId: newEvent.id,
              price: +eventSeat.price,
              seatId: +eventSeat.seatId,
              seatCount: +eventSeat.seatCount
            }
          });
          // then for single Seat of that event :-

          for (let i = 0; i < +eventSeat.seatCount; i++) {
            await tx.singleEventSeat.create({
              data: {
                seatNumber: `${eventSeat.seatId === "1" ? "V" : eventSeat.seatId === "2" ? "M" : "F"}${i + 1}`,
                eventSeatId: eventSeatDetails.id
              }
            });
          }

          return eventSeatDetails;
        })
      );

      return { newEvent };
    });

    return responseHandler(res, "Event Created SuccessFully", 201, eventData);
  } catch (error) {
    throw error;
  }
};

const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      throw next(new ErrorHandler("EventId is not provided", 400));
    }

    const eventDetails = await getEventDetailByIdService(+eventId);

    if (!eventDetails) {
      throw next(new ErrorHandler("No Event Found", 404));
    }

    eventDetails.eventBanner = generateFilePath(eventDetails.eventBanner);

    return responseHandler(res, "Event Details", 200, eventDetails);
  } catch (error) {
    throw error;
  }
};

const getEventDetailsWithSingleSeat = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      throw next(new ErrorHandler("Event id is not provided", 400));
    }

    // Fetching the event Details with their individual Seats :-
    const eventDetailsWithSeats = await getEventDetailsWithSingleSeats(+eventId);

    if (!eventDetailsWithSeats || !eventDetailsWithSeats?.id) {
      throw next(new ErrorHandler("Event Details not found", 404));
    }

    return responseHandler(res, "Event Details with associated single seat details", 200, eventDetailsWithSeats);
  } catch (error) {
    throw error;
  }
};
export { allMyEvents, createNewEvent, getEventById, getEventDetailsWithSingleSeat };
