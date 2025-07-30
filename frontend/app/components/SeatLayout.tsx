import React from "react";
import { FaCrown } from "react-icons/fa";
import { eventSeatType, singleSeatType } from "../interfaces/event.interface";
function SeatLayout({
  singleSeats,
  sectionName,
  eventSeatsDetails,
}: {
  singleSeats: singleSeatType[];
  sectionName: string;
  eventSeatsDetails: eventSeatType; // NOTE :- need to create a interface for this :-
}) {
  return (
    <div className="w-[100%] min-h-[60%] py-4">
      <div className="flex items-center gap-2">
        <FaCrown color="white" size={"2%"} />
        <h2>
          {sectionName} Section - ${eventSeatsDetails.price}
        </h2>
      </div>
      {/* Seats Location */}
      <div className="seat-location max-w-[45%] mx-auto ">
        <div className="flex items-center justify-center gap-2 flex-wrap ">
          {singleSeats.map((val, index) => {
            return (
              <div
                key={index}
                className="w-8 h-8 bg-gray-500 hover:bg-green-400 rounded"
              >
                {" "}
                <p className="text-sm text-center">
                  {val.isBooked ? "L" : val.seatNumber}
                </p>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SeatLayout;
