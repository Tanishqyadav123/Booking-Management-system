import React from "react";
import BookedSeats from "./BookedSeats";
import { useBookingContext } from "../Context/booking.context";
import LightButton from "./LightButton";

function BookingSummary() {
  const { totalPrice, seatDetails } = useBookingContext();

  return (
    <div className="bg-black rounded-2xl w-[100%] min-h-32 p-4">
      <h2 className="text-lg font-bold">Booking Summary</h2>

      {seatDetails.length > 0 && (
        <div className="flex flex-col mt-5 text-xs text-gray-500 gap-3">
          {seatDetails.map((seatInfo) => {
            return (
              <BookedSeats
                seatNumber={seatInfo.seatNumber}
                currentId={seatInfo.id}
              />
            );
          })}
        </div>
      )}

      {/* <div className="sub-total flex items-center justify-between  mt-6 text-sm">
        <p>SubTotal</p>
        <p>$598.00</p>
      </div> */}
      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <p>Total Revenue</p>
        <p className="flex items-center">Rs. {totalPrice}</p>
      </div>

      {totalPrice > 0 && (
        <div className="mt-4 flex items-center justify-center">
          <LightButton btnText="Book Now" />
        </div>
      )}
    </div>
  );
}

export default BookingSummary;
