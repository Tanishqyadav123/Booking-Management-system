"use client";
import React, { useEffect } from "react";
import Input from "./Input";
import { MdCurrencyRupee } from "react-icons/md";
import { useFormContext } from "react-hook-form";
import { addEventSchemaType } from "../event/add/page";
import { useEventContext } from "../Context/event.context";
function SeatAndPricing() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<addEventSchemaType>();

  const { venueDetails } = useEventContext();

  const entireVenue = watch("entireVenue");

  useEffect(() => {
    if (entireVenue === "true" && venueDetails) {
      const seatDetails = venueDetails.VenueSeatDetails;

      seatDetails.forEach((seat, index) => {
        setValue(`eventSeats.${index}.seatCount`, seat.seatCount.toString());
        setValue(`eventSeats.${index}.price`, seat.price);
      });
    }
  }, [entireVenue, venueDetails, setValue]);

  if (!venueDetails) {
    return <>No Venue Details...</>;
  }
  return (
    <div className="w-[100%] p-2 mt-6 bg-[#111826] ">
      <h2 className="text-xl">Seat & Pricing</h2>

      <div className="flex flex-col gap-4">
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>VIP Seats</h3>
            <p>
              Max :{" "}
              {
                venueDetails.VenueSeatDetails.find((x) => x.seatId == 1)
                  ?.seatCount
              }{" "}
              seats
            </p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input
                isDisable={entireVenue === "true" ? true : false}
                inputType="text"
                register={register(`eventSeats.${0}.seatCount`)}
                placeHolder="Enter Seat Count"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input
                inputType="text"
                register={register(`eventSeats.${0}.price`)}
                placeHolder="Enter Price"
              />
            </div>
          </div>
        </div>
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>Mid Seats</h3>
            <p>
              Max :{" "}
              {
                venueDetails.VenueSeatDetails.find((x) => x.seatId == 2)
                  ?.seatCount
              }{" "}
              seats
            </p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input
                isDisable={entireVenue === "true" ? true : false}
                inputType="text"
                register={register(`eventSeats.${1}.seatCount`)}
                placeHolder="Enter Seat Count"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input
                inputType="text"
                placeHolder="Enter Price"
                register={register(`eventSeats.${1}.price`)}
              />
            </div>
          </div>
        </div>
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>Front Seats</h3>
            <p>
              Max :{" "}
              {
                venueDetails.VenueSeatDetails.find((x) => x.seatId == 3)
                  ?.seatCount
              }{" "}
              seats
            </p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input
                isDisable={entireVenue === "true" ? true : false}
                inputType="text"
                placeHolder="Enter Seat Count"
                register={register(`eventSeats.${2}.seatCount`)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input
                inputType="text"
                placeHolder="Enter Price"
                register={register(`eventSeats.${2}.price`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatAndPricing;
