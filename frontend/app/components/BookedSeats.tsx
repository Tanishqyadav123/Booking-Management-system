import React from "react";
import { RxCross2 } from "react-icons/rx";
function BookedSeats() {
  return (
    <div className="w-[100%] text-white rounded-md h-12 bg-[#1f2a38]  flex items-center justify-around">
      <p className="text-sm">VIP - 1</p>
      <p className="text-sm">$299</p>
      <RxCross2 size={25} />
    </div>
  );
}

export default BookedSeats;
