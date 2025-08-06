"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { eventDetailsType } from "../interfaces/event.interface";
import { getEventDetailsByIdService } from "../Services/event.service";
import toast from "react-hot-toast";

export interface EventContextInterface {
  eventDetails?: eventDetailsType;
  venueDetails?: VenueData;
  setEventDetails: Dispatch<SetStateAction<eventDetailsType | undefined>>;
  setVenueDetails: Dispatch<SetStateAction<VenueData | undefined>>;
  fetchEventDetailsById: (eventId: string) => Promise<void>;
}
export const EventContext = createContext<EventContextInterface | null>(null);

export const EventContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State for Event Details with event Seats and Venues Details :-
  const [eventDetails, setEventDetails] = useState<eventDetailsType>();
  const [venueDetails, setVenueDetails] = useState<VenueData>();

  const fetchEventDetailsById = async (eventId: string) => {
    try {
      const resData = await getEventDetailsByIdService(+eventId);

      console.log(resData.data, "resData.data");
      if (resData.success) {
        setEventDetails(resData.data);
      }

      toast.success(resData.message);
    } catch (error) {
      toast.error("Event Details could not get");
    }
  };

  return (
    <EventContext.Provider
      value={{
        eventDetails,
        setEventDetails,
        fetchEventDetailsById,
        venueDetails,
        setVenueDetails,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextInterface => {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error(
      "useEventContext must be used within an EventContextProvider"
    );
  }
  return context;
};
