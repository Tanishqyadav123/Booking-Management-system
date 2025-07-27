import React from "react";
import { FaMapPin } from "react-icons/fa";
import LightButton from "./LightButton";

function VenueDetails() {
  return (
    <div className="w-[100%] max-h-[20%] p-2  shadow-xl mt-6">
      <div className="flex items-center justify-between ">
        <div className="venue-heading flex flex-col ">
          <h4 className="text-sm font-semibold">Cafe Central Indore</h4>
          <h6 className="text-xs flex">
            {" "}
            <FaMapPin color="text-red-500" /> MG Road, Indore
          </h6>
        </div>

        <LightButton btnText="Change Venue" />
      </div>
      <div className="mt-5 mx-auto flex justify-evenly text-xs">
        <div>
          <h5>Front Seats</h5>
          <p>20 available</p>
        </div>
        <div>
          <h5>Front Seats</h5>
          <p>20 available</p>
        </div>
        <div>
          <h5>Front Seats</h5>
          <p>20 available</p>
        </div>
      </div>
    </div>
  );
}

export default VenueDetails;
