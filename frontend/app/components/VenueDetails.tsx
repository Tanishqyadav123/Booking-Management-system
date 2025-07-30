import React from "react";
import { FaMapPin } from "react-icons/fa";
import LightButton from "./LightButton";
import { useEventContext } from "../Context/event.context";

function VenueDetails() {
  const { venueDetails } = useEventContext();

  if (!venueDetails) {
    return (
      <div className="text-center text-red-500 mt-5">
        Please Select Any Venue...
      </div>
    );
  }
  return (
    <div className="w-[100%] max-h-[20%] p-2  shadow-xl mt-6">
      <div className="flex items-center justify-between ">
        <div className="venue-heading flex flex-col ">
          <h4 className="text-sm font-semibold">{venueDetails.name}</h4>
          <h6 className="text-xs flex">
            {" "}
            <FaMapPin color="text-red-500" /> {venueDetails.address}
          </h6>
        </div>
      </div>
      <div className="mt-5 mx-auto flex justify-evenly text-xs">
        <div>
          <h5>VIP Seats</h5>
          <p>
            {
              venueDetails.VenueSeatDetails.find((x) => x.seatId == 1)
                ?.seatCount
            }{" "}
            available
          </p>
        </div>
        <div>
          <h5>Mid Seats</h5>
          <p>
            {" "}
            {
              venueDetails.VenueSeatDetails.find((x) => x.seatId == 2)
                ?.seatCount
            }{" "}
            available
          </p>
        </div>
        <div>
          <h5>Front Seats</h5>
          <p>
            {" "}
            {
              venueDetails.VenueSeatDetails.find((x) => x.seatId == 3)
                ?.seatCount
            }{" "}
            available
          </p>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
