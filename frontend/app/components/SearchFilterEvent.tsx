import React, { useEffect, useState } from "react";
import Input from "./Input";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";
import { useDropDownContext } from "../Context/dropdown.context";

function SearchFilterEvent() {
  const {
    comedianDropDown,
    setComedianDropDown,
    fetchComedianDropDown,

    locationDropDown,
    setLocationDropDown,
    fetchLocationDropDown,

    venueDropDown,
    setVenueDropDown,
    fetchVenueDropDown,
  } = useDropDownContext();

  const [comedianId, setComedianId] = useState<number | undefined>(undefined);
  const [locationId, setLocationId] = useState<number | undefined>(undefined);
  const [venueId, setVenueId] = useState<number | undefined>(undefined);

  useEffect(() => {
    fetchComedianDropDown();
    fetchLocationDropDown();
  }, []);

  useEffect(() => {
    if (locationId) {
      fetchVenueDropDown(locationId.toString());
    }
  }, [locationId]);

  if (!comedianDropDown || !locationDropDown) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }
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
            <option value="">Select Comedian</option>

            {comedianDropDown.map((comedianDetails) => {
              return (
                <option value={comedianDetails.id}>
                  {comedianDetails.firstName} {comedianDetails.lastName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Location </label>
          <select
            onChange={(e) => setLocationId(parseInt(e.target.value))}
            className="p-2 text-sm"
            name=""
            id=""
          >
            <option value="">Select Location</option>

            {locationDropDown.map((locationDetails) => {
              return (
                <option value={locationDetails.id}>
                  {locationDetails.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Venue</label>
          <select
            disabled={!!!locationId}
            className="p-2 text-sm"
            name=""
            id=""
          >
            <option value="">Select Venue</option>

            {venueDropDown.map((venueDetails) => {
              return (
                <option value={venueDetails.id}>{venueDetails.name}</option>
              );
            })}
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
