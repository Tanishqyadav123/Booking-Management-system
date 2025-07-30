import axios from "axios";
import {
  eventDetailsType,
  getAllUpComingEventType,
  globalResponseType,
} from "../interfaces/event.interface";

const token =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
export const getAllUpComingEventsService = async () => {
  const res: { data: globalResponseType<getAllUpComingEventType[]> } =
    await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/viewer/all-upcoming-event`,
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

// Service for fetching Event Details By Id :-
export const getEventDetailsByIdService = async (eventId: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/event/single-seats/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as globalResponseType<eventDetailsType>;
};
