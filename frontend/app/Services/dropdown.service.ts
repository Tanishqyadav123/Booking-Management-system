import axios from "axios";
import { getComedianDropDownResponseType } from "../interfaces/comedian.interface";
import {
  locationDropDownResponseType,
  venueDropDownResponseType,
} from "../responseTypes/dropDown.response";

const token = localStorage.getItem("authToken") || "";
export const comedianDropDownService = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/dropdown/comedian`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data as getComedianDropDownResponseType;
};

export const locationDropDownService = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/dropdown/location`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as locationDropDownResponseType;
};

export const venueDropDownService = async (cityId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/dropdown/venue?cityId=${cityId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as venueDropDownResponseType;
};
