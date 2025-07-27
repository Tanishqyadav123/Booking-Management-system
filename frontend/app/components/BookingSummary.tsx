import React from "react";
import BookedSeats from "./BookedSeats";

function BookingSummary() {
  return (
    <div className="bg-black rounded-2xl w-[100%] min-h-32 p-4">
      <h2 className="text-lg font-bold">Booking Summary</h2>

      <div className="flex flex-col mt-5 text-xs text-gray-500 gap-3">
        <BookedSeats />
        <BookedSeats />
        <BookedSeats />
      </div>

      <div className="sub-total flex items-center justify-between  mt-6 text-sm">
        <p>SubTotal</p>
        <p>$598.00</p>
      </div>
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <p>Total Revenue</p>
        <p className="flex items-center">0</p>
      </div>
    </div>
  );
}

export default BookingSummary;
