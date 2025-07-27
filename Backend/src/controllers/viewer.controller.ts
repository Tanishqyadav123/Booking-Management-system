/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllCompletedEventList, getAllEventsList, getAllLatestEvents } from "../repo/viewer.repo";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares/error.middleware";
import { generateFilePath } from "../utils/generateFilepath";
import { getEventDetailByIdService } from "../repo/event.repo";
import { responseHandler } from "../handlers/response.handler";

export const getAllUpComingEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    // Fetch all the latest posted events :-
    const allEvents = await getAllLatestEvents();

    if (allEvents.length) {
      allEvents.forEach((event) => {
        if (event.eventBanner) {
          event.eventBanner = generateFilePath(event.eventBanner);
        }
      });
    }

    return responseHandler(res, "All Upcoming Events List", 201, allEvents);
  } catch (error) {
    throw error;
  }
};

export const getAllEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    let allEvents = await getAllEventsList();

    allEvents = allEvents.map((eventDetails) => {
      if (eventDetails.eventBanner) {
        eventDetails.eventBanner = generateFilePath(eventDetails.eventBanner);
      }

      return eventDetails;
    });

    return responseHandler(res, "All Events", 200, allEvents);
  } catch (error) {
    throw error;
  }
};

export const getAllCompletedEvents = async (req: Request, res: Response): Promise<any> => {
  try {
    const allCompletedEvent = await getAllCompletedEventList();

    return responseHandler(res, "All Completed Event List", 200, allCompletedEvent);
  } catch (error) {
    throw error;
  }
};
export const getEventDetails = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { eventId } = req.params;
    // Fetch all the latest posted events :-
    const eventDetails = await getEventDetailByIdService(+eventId);

    if (!eventDetails) {
      throw next(new ErrorHandler("Event Details not found", 404));
    }

    return responseHandler(res, `${eventDetails.name} details`, 201, eventDetails);
  } catch (error) {
    throw error;
  }
};
