"use client";

import React, { useEffect, useState } from "react";
import VenueDetails from "./VenueDetails";
import toast from "react-hot-toast";
import {
  locationDropDownService,
  venueDropDownService,
} from "../Services/dropdown.service";
import {
  locationDropDownType,
  VenueType,
} from "../responseTypes/dropDown.response";
import { useFormContext } from "react-hook-form";
import { addEventSchemaType } from "../event/add/page";

function VenueSelection() {
  const [cities, setCities] = useState<locationDropDownType[]>([]);
  const [venues, setVenues] = useState<VenueType[]>([]);
  const [cityId, setCityId] = useState<string>();
  const {
    register,
    formState: { errors },
  } = useFormContext<addEventSchemaType>();

  const fetchCityDropDownList = async () => {
    try {
      const resData = await locationDropDownService();

      toast.success(resData.message);

      if (resData.data.length == 0) {
        toast.success("Not Cities Found");
        return;
      }

      setCities(resData?.data);
    } catch (error) {
      toast.error("Error while fetching city data in drop down");
      throw error;
    }
  };

  const fetchVenueDropDownList = async (cityId: string) => {
    try {
      const resData = await venueDropDownService(cityId);

      toast.success(resData.message);

      if (resData.data.length <= 0) {
        toast.success("Not Venue found in this city");
        return;
      }

      setVenues(resData?.data);
    } catch (error) {
      toast.error("Error while fetching venues data in drop down");
      throw error;
    }
  };

  useEffect(() => {
    fetchCityDropDownList();
  }, []);

  useEffect(() => {
    if (cityId) {
      // Fetch the Venue Details :-
      fetchVenueDropDownList(cityId);
    }
  }, [cityId]);

  return (
    <div className="w-[100%]  mt-8 p-4 bg-[#111826] ">
      <h2 className="text-xl">Venue Selection</h2>

      <div className="mt-3 flex  items-center gap-5 justify-between">
        <div className="flex-1 flex flex-col gap-3">
          <label htmlFor="city">City</label>
          <select
            onChange={(e) => setCityId(e.target.value)}
            className="p-2 text-sm bg-black"
            name=""
            id=""
          >
            <option value="">Select City</option>
            {cities.map((city) => {
              return (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <label htmlFor="venue">Venue</label>
          <select
            {...register("venueId")}
            disabled={!!!cityId}
            className="p-2 text-sm"
            name="venueId"
            id=""
          >
            <option value="" className="bg-black">
              Select Venue
            </option>
            {venues.map((venue) => {
              return (
                <option key={venue.id} value={venue.id} className="bg-black">
                  {venue.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      {/* Venue Details That you have selected */}
      <VenueDetails />
    </div>
  );
}

export default VenueSelection;
