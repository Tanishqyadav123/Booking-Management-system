import React from "react";
import { RxCross2 } from "react-icons/rx";
function BookedSeats() {
  return (
    <div className="w-[100%] text-white  h-12 bg-[#1f2a38] flex items-center justify-around">
      <p>VIP - 1</p>
      <p>$299</p>
      <RxCross2 />
    </div>
  );
}

export default BookedSeats;
