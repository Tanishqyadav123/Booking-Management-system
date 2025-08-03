import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Input from "./Input";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";
import { useDropDownContext } from "../Context/dropdown.context";
import { debounce } from "../utils/debouncing";

function SearchFilterEvent({
  comedianId,
  ename,
  locationId,
  venueId,
  setComedianId,
  setLocationId,
  setVenueId,
  setEname,
}: {
  comedianId?: string;
  ename?: string;
  venueId?: number;
  locationId?: number;
  setComedianId: Dispatch<SetStateAction<string | undefined>>;
  setLocationId: Dispatch<SetStateAction<number | undefined>>;
  setVenueId: Dispatch<SetStateAction<number | undefined>>;
  setEname: Dispatch<SetStateAction<string | undefined>>;
}) {
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

  const handleEnameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEname(e.target.value);
  };
  const handleLocationIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocationId(+e.target.value);
  };
  const handleComedianIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setComedianId(e.target.value);
  };
  const handleVenueIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVenueId(+e.target.value);
  };

  const handleResetFilter = () => {
    setEname(undefined);
    setVenueId(undefined);
    setLocationId(undefined);
    setComedianId(undefined);
  };

  const debouncedEnameHandleChange = debounce(handleEnameChange, 500);
  const debouncedLocationHandleChange = debounce(handleLocationIdChange, 500);
  const debouncedComedianHandleChange = debounce(handleComedianIdChange, 500);
  const debouncedVenueHandleChange = debounce(handleVenueIdChange, 500);

  // USE EFFECT :-
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
          <Input
            onChange={debouncedEnameHandleChange}
            inputType="text"
            placeHolder="Search by event Name..."
          />
        </div>
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="">Comedian</label>
          <select
            className="p-2 text-sm"
            name=""
            id=""
            onChange={debouncedComedianHandleChange}
          >
            <option value="">Select Comedian</option>

            {comedianDropDown.map((comedianDetails) => {
              return (
                <option key={comedianDetails.id} value={comedianDetails.id}>
                  {comedianDetails.firstName} {comedianDetails.lastName}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-col items-start">
          <label htmlFor="">Location </label>
          <select
            onChange={debouncedLocationHandleChange}
            className="p-2 text-sm"
            name=""
            id=""
            value={locationId}
          >
            <option value="">Select Location</option>

            {locationDropDown.map((locationDetails) => {
              return (
                <option key={locationDetails.id} value={locationDetails.id}>
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
            onChange={debouncedVenueHandleChange}
          >
            <option value="">Select Venue</option>

            {venueDropDown.map((venueDetails) => {
              return (
                <option key={venueDetails.id} value={venueDetails.id}>
                  {venueDetails.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <LightButton btnText="Reset Filter" callback={handleResetFilter} />
      </div>
    </div>
  );
}

export default SearchFilterEvent;
