"use client";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  comedianDropDownService,
  locationDropDownService,
  venueDropDownService,
} from "../Services/dropdown.service";
import { getComedianDropDownType } from "../interfaces/comedian.interface";
import {
  locationDropDownType,
  VenueType,
} from "../responseTypes/dropDown.response";

// Creating the interface for DropDownContext :-
interface DropDownContextInterface {
  comedianDropDown: getComedianDropDownType[];
  locationDropDown: locationDropDownType[];
  venueDropDown: VenueType[];

  setComedianDropDown: Dispatch<SetStateAction<getComedianDropDownType[]>>;
  setLocationDropDown: Dispatch<SetStateAction<locationDropDownType[]>>;
  setVenueDropDown: Dispatch<SetStateAction<VenueType[]>>;

  fetchComedianDropDown: () => Promise<void>;
  fetchLocationDropDown: () => Promise<void>;
  fetchVenueDropDown: (cityId: string) => Promise<void>;
}

const DropDownContext = createContext<DropDownContextInterface | null>(null);

// Create the Provider for this context :-

export const DropDownContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Create States for Comedian , Location , Venue :-
  const [comedianDropDown, setComedianDropDown] = useState<
    getComedianDropDownType[]
  >([]);
  const [locationDropDown, setLocationDropDown] = useState<
    locationDropDownType[]
  >([]);
  const [venueDropDown, setVenueDropDown] = useState<VenueType[]>([]);

  // Creating the function for fetching Drop Down Data :-
  const fetchComedianDropDown = async () => {
    try {
      const resData = await comedianDropDownService();

      if (resData.success) {
        toast.success(resData.message);
      }

      setComedianDropDown(resData.data);
    } catch (error) {
      toast.error("error in fetching the comedian dropdown");
      throw error;
    }
  };

  const fetchLocationDropDown = async () => {
    try {
      const resData = await locationDropDownService();

      if (resData.success) {
        toast.success(resData.message);
      }

      setLocationDropDown(resData.data);
    } catch (error) {
      toast.error("error in fetching the location drop down");
    }
  };

  const fetchVenueDropDown = async (cityId: string) => {
    try {
      const resData = await venueDropDownService(cityId);

      if (resData.success) {
        toast.success(resData.message);
      }

      setVenueDropDown(resData.data);
    } catch (error) {
      toast.error("error in fetching the location drop down");
    }
  };

  return (
    <DropDownContext.Provider
      value={{
        comedianDropDown,
        locationDropDown,
        venueDropDown,

        setComedianDropDown,
        setLocationDropDown,
        setVenueDropDown,

        fetchComedianDropDown,
        fetchLocationDropDown,
        fetchVenueDropDown,
      }}
    >
      {children}
    </DropDownContext.Provider>
  );
};

// Creating a separate hook for accessing it :-
export const useDropDownContext = () => {
  const context = useContext(DropDownContext);

  if (!context) {
    throw new Error("Drop Down context is not available");
  }

  return context;
};
