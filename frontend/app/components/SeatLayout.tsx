import React from "react";
import { FaCrown } from "react-icons/fa";
function SeatLayout({
  Icon,
  sectionName,
  eventSeats,
}: {
  Icon?: React.ElementType;
  sectionName?: string;
  eventSeats?: any[]; // NOTE :- need to create a interface for this :-
}) {
  let arr = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5,
    6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ];
  return (
    <div className="w-[100%] min-h-[60%] py-4">
      <div className="flex items-center gap-2">
        <FaCrown color="white" size={"2%"} />
        <h2>VIP Section - $299</h2>
      </div>
      {/* Seats Location */}
      <div className="seat-location max-w-[45%] mx-auto ">
        <div className="flex items-center justify-center gap-2 flex-wrap ">
          {arr.map((val, index) => {
            return (
              <div
                key={index}
                className="w-8 h-8 bg-gray-500 hover:bg-green-400 rounded"
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SeatLayout;
