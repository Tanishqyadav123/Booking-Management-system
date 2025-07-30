import axios from "axios";

const token: string = localStorage.getItem("authToken") || "";
export const getVenueWithSeatDetailsService = async (venueId: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/venue/seat-detail/${venueId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data as VenueDetailApiResponse;
};
