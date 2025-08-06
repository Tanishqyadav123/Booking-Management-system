"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useEventContext } from "./event.context";
import { singleSeatType } from "../interfaces/event.interface";

interface BookingContextType {
  seatDetails: singleSeatType[];
  setSeatDetails: Dispatch<SetStateAction<singleSeatType[]>>;
  totalPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  isBooked: boolean;
  setIsBooked: Dispatch<SetStateAction<boolean>>;
}
const BookingContext = createContext<BookingContextType | null>(null);

export const BookingContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const [seatDetails, setSeatDetails] = useState<singleSeatType[]>([]);
  const { eventDetails } = useEventContext();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isBooked, setIsBooked] = useState<boolean>(false);
  // Function for calculating the Booking Summary :-
  const calSummaryPrice = (seatDetails: singleSeatType[]) => {
    if (seatDetails.length) {
      let total = seatDetails.reduce((acc, curr) => {
        let price = eventDetails?.EventSeatDetails.find(
          (es) => es.id === curr.eventSeatId
        )?.price;

        console.log("Type of price is ", price, typeof price);
        acc += (price && +price) || 0;
        return acc;
      }, 0);

      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calSummaryPrice(seatDetails);
  }, [seatDetails]);

  return (
    <BookingContext.Provider
      value={{
        seatDetails,
        setSeatDetails,
        totalPrice,
        setTotalPrice,
        isBooked,
        setIsBooked,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingContext = () => {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("Booking Context can not be initialized");
  }
  return context;
};
