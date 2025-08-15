import axios from "axios";
import { globalResponseType } from "../interfaces/event.interface";
import {
  AdminProfileDetailsType,
  DashboardAnalyticsDataType,
} from "../responseTypes/admin.response";

const token =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : "";

export const getAdminDetailsService = async () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : "";
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/get-me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as globalResponseType<AdminProfileDetailsType>;
};

export const getAnalyticsDataService = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as globalResponseType<DashboardAnalyticsDataType>;
};
