import React from "react";
import Input from "./Input";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";

function SearchFilterEvent() {
  return (
    <div className="h-[40%] w-[100%] mt-5 border-2 border-gray-600 p-4  rounded-md bg-[#111826]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="">Search Events</label>
          <Input inputType="text" placeHolder="Search by event Name..." />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="">Comedian</label>
          <select className="p-2 text-sm" name="" id="">
            <option value="">All Comedians1</option>
            <option value="">All Comedians2</option>
            <option value="">All Comedians3</option>
            <option value="">All Comedians4</option>
            <option value="">All Comedians5</option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Location </label>
          <select className="p-2 text-sm" name="" id="">
            <option value="">All Locations1 </option>
            <option value="">All Locations2 </option>
            <option value="">All Locations3 </option>
            <option value="">All Locations4 </option>
            <option value="">All Locations5 </option>
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Venue</label>
          <select className="p-2 text-sm" name="" id="">
            <option value="">All Venues1</option>
            <option value="">All Venues2</option>
            <option value="">All Venues3</option>
            <option value="">All Venues4</option>
            <option value="">All Venues5</option>
          </select>
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <LightButton btnText="Reset Filter" />
        <DarkButton btnText="Apply Filters" />
      </div>
    </div>
  );
}

export default SearchFilterEvent;
