import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useBookingContext } from "../Context/booking.context";
function BookedSeats({
  seatNumber,
  currentId,
}: {
  seatNumber: string;
  currentId: number;
}) {
  const { setSeatDetails, seatDetails } = useBookingContext();

  const handleRemoveSeat = (currentId: number) => {
    setSeatDetails(
      seatDetails.filter((seatInfo) => {
        return seatInfo.id !== currentId;
      })
    );
  };

  return (
    <div className="w-[100%] text-white rounded-md h-12 bg-[#1f2a38]  flex items-center justify-around">
      <p className="text-sm">{seatNumber}</p>
      <RxCross2 size={25} onClick={() => handleRemoveSeat(currentId)} />
    </div>
  );
}

export default BookedSeats;
