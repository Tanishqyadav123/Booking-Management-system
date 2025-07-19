import React from "react";
import Input from "./Input";
import VenueDetails from "./VenueDetails";

function VenueSelection() {
  return (
    <div className="w-[100%]  mt-8 p-4 bg-[#111826] ">
      <h2 className="text-xl">Venue Selection</h2>

      <div className="mt-3 flex  items-center gap-5 justify-between">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="city">City</label>
          <select className="p-2 text-sm" name="" id="">
            <option value="">All City 1</option>
            <option value="">All City 2</option>
            <option value="">All City 3</option>
            <option value="">All City 4</option>
            <option value="">All City 5</option>
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="venue">Venue</label>
          <select className="p-2 text-sm" name="" id="">
            <option value="">All Venue 1</option>
            <option value="">All Venue 2</option>
            <option value="">All Venue 3</option>
            <option value="">All Venue 4</option>
            <option value="">All Venue 5</option>
          </select>
        </div>

      </div>
        {/* Venue Details That you have selected */}
        <VenueDetails />
    </div>
  );
}

export default VenueSelection;
