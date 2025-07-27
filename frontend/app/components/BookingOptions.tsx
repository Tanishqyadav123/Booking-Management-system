import React from "react";
import { useFormContext } from "react-hook-form";
import { addEventSchemaType } from "../event/add/page";

function BookingOptions() {
  const { register } = useFormContext<addEventSchemaType>();
  return (
    <div className="w-[100%]  mt-8 p-4 bg-[#111826] ">
      <h2 className="text-xl">Booking Options</h2>

      <div className="mt-5   flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="radio"
            value="false"
            {...register("entireVenue")}
            name="entireVenue"
          />
          <label htmlFor="">Partial Venue Booking</label>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="radio"
            value="true"
            {...register("entireVenue")}
            name="entireVenue"
          />
          <label htmlFor="">Full Venue Booking</label>
          <p className="text-sm p-1 rounded-md  bg-gray-400">10% discount</p>
        </div>
      </div>
    </div>
  );
}

export default BookingOptions;
