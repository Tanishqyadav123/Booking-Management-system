import React, { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { MdCurrencyRupee } from "react-icons/md";
import { addEventSchemaType } from "../event/add/page";
import { useEventContext } from "../Context/event.context";
import toast from "react-hot-toast";

function PricingSummary() {
  const { control } = useFormContext<addEventSchemaType>();
  const { venueDetails } = useEventContext();

  const eventSeats = useWatch({ name: "eventSeats", control });
  const entireVenue = useWatch({ name: "entireVenue", control });

  const [vipTotal, setVipTotal] = useState(0);
  const [midTotal, setMidTotal] = useState(0);
  const [frontTotal, setFrontTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let vip = 0,
      mid = 0,
      front = 0;

    eventSeats?.forEach((seat) => {
      const seatId = seat?.seatId?.toString();
      const count = Number(seat?.seatCount || 0);
      const price = Number(seat?.price || 0);
      const total = count * price;

      if (seatId === "1") vip += total;
      else if (seatId === "2") mid += total;
      else if (seatId === "3") front += total;
    });

    let totalRevenue = vipTotal + midTotal + frontTotal;
    if (entireVenue === "true") {
      totalRevenue = (totalRevenue * 10) / 100;
      toast.success("10% Discount unlocked", {
        className: "bg-yellow-500",
      });
    }

    setVipTotal(vip);
    setMidTotal(mid);
    setFrontTotal(front);
    setTotal(totalRevenue);
  }, [eventSeats, entireVenue]);

  return (
    <div className="mt-24 bg-[#111826] w-full p-4">
      <h2 className="text-xl font-bold">Pricing Summary</h2>

      <div className="flex flex-col mt-5 text-xs text-gray-500 gap-3">
        {venueDetails?.VenueSeatDetails.map((seatDetails) => {
          const label =
            seatDetails.seatId === 1
              ? "VIP"
              : seatDetails.seatId === 2
              ? "MID"
              : "FRONT";

          const value =
            seatDetails.seatId === 1
              ? vipTotal
              : seatDetails.seatId === 2
              ? midTotal
              : frontTotal;

          return (
            <div
              key={seatDetails.id}
              className="flex items-center justify-between"
            >
              <p>{label} Seats</p>
              <p className="flex items-center">
                <MdCurrencyRupee /> {value}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <p>Total Revenue</p>
        <p className="flex items-center">
          <MdCurrencyRupee /> {total}
        </p>
      </div>
    </div>
  );
}

export default PricingSummary;
