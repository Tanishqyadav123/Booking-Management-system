/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllLocationService, getLocationByIdService } from "../repo/location.repo";
import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../middlewares/error.middleware";
import { fetchComediantype } from "../@types/comedian.types";
import { getAllComedianList } from "../repo/comedian.repo";
import { getAllVenueByLocationService } from "../repo/venue.repo";
import { responseHandler } from "../handlers/response.handler";

// API for comedian DropDown :-
const comedianDropDown = async (req: Request, res: Response): Promise<any> => {
  try {
    // Fetch all Comedians :-
    const allComedians: fetchComediantype[] = await getAllComedianList();

    return responseHandler(res, "Comedian DropDown Data", 200, allComedians);
  } catch (error) {
    throw error;
  }
};

// API for location DropDown :-
const locationDropDown = async (req: Request, res: Response): Promise<any> => {
  try {
    const allLocations = await getAllLocationService();

    return responseHandler(res, "Location Drop Down Data", 200, allLocations);
  } catch (error) {
    throw error;
  }
};

// API for venue DropDown :-
const venueDropDown = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { cityId } = req.query;

    if (!cityId) {
      throw next(new ErrorHandler("City Id is not provided", 400));
    }

    // Is Valid City Id :-
    const isValidCityId = await getLocationByIdService(+cityId);

    if (!isValidCityId) {
      throw next(new ErrorHandler("Invalid City Id Provided", 400));
    }

    const allVenues = await getAllVenueByLocationService(+cityId);

    return responseHandler(res, "Venue Drop Down", 200, allVenues);
  } catch (error) {
    throw error;
  }
};

export { comedianDropDown, locationDropDown, venueDropDown };
