/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { getAllLatestEvents } from "../repo/viewer.repo";
import { responseHandler } from "../handlers/response.handler";
import { getEventDetailByIdService } from "../repo/event.repo";
import { ErrorHandler } from "../middlewares/error.middleware";

export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    // Fetch all the latest posted events :-
    const allEvents = await getAllLatestEvents();

    return responseHandler(res, "All Events List", 201, allEvents);
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
