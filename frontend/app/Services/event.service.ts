import axios from "axios";
import {
  eventDetailsType,
  EventFilterType,
  getAllUpComingEventType,
  globalResponseType,
} from "../interfaces/event.interface";
import { GiToken } from "react-icons/gi";

const token =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

export const getAllUpComingEventsService = async ({
  ename,
  comedianId,
  venueId,
  locationId,
}: EventFilterType) => {
  console.log("Logging the venruId ", venueId);
  const res: { data: globalResponseType<getAllUpComingEventType[]> } =
    await axios.get(
      `${
        process.env.NEXT_PUBLIC_BACKEND_BASE_URL
      }/viewer/all-upcoming-event?ename=${ename || ""}&comedianId=${
        comedianId || ""
      }&venueId=${venueId && +venueId > 0 ? venueId : ""}&locationId=${
        locationId || ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

  return res.data as globalResponseType<getAllUpComingEventType[]>;
};

// Service for Creating a new Event :-
export const createNewEventService = async (formData: FormData) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/event`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Service for Event Details with single seats :-
export const getEventDetailsByIdService = async (eventId: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/event/single-seats/${eventId}` , {
       headers : { 
        "Authorization" : `Bearer ${token}`
       }
    }
  );

  return res.data as globalResponseType<eventDetailsType>;
};
