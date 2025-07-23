import React from "react";
import { FaMusic } from "react-icons/fa6";
import SeatLayout from "./SeatLayout";
function SeatArragement() {
  return (
    <div className="w-[100%] h-[100%] mt-5 ">
      <div
        id="stage"
        className="bg-[#2c3645] rounded-md shadow-2xl border-gray-600 border-1 flex items-center justify-center p-3 flex-col gap-3 w-[100%] h-[35%]"
      >
        <FaMusic color="white" size={"3%"} />
        <h2 className="text-md uppercase">Stage</h2>
      </div>

      {/* Seat Layout for different Seats */}
      <div className="w-[100%] h-[100%] mt-4 flex flex-col gap-3">
        <SeatLayout />
        <SeatLayout />
        <SeatLayout />
      </div>
    </div>
  );
}

export default SeatArragement;
