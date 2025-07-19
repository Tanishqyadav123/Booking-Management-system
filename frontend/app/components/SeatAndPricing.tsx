import React from "react";
import Input from "./Input";
import { MdCurrencyRupee } from "react-icons/md";
function SeatAndPricing() {
  return (
    <div className="w-[100%] p-2 mt-6 bg-[#111826] ">
      <h2 className="text-xl">Seat & Pricing</h2>

      <div className="flex flex-col gap-4">
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>Front Seats</h3>
            <p>Max : 20 seats</p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input inputType="text" placeHolder="Enter Seat Count" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input inputType="text" placeHolder="Enter Price" />
            </div>
          </div>
        </div>
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>Front Seats</h3>
            <p>Max : 20 seats</p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input inputType="text" placeHolder="Enter Seat Count" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input inputType="text" placeHolder="Enter Price" />
            </div>
          </div>
        </div>
        <div className="p-2 mt-4 shadow-xl">
          <div className="seattype-count flex items-center justify-between">
            <h3>Front Seats</h3>
            <p>Max : 20 seats</p>
          </div>

          <div className="seat-count-price text-sm mt-5  flex items-center gap-5 justify-between">
            <div className="flex flex-col flex-1 gap-2">
              <label htmlFor="">Number Of Seats</label>
              <Input inputType="text" placeHolder="Enter Seat Count" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <label htmlFor="" className="flex items-center gap-2">
                Price Per Ticket <MdCurrencyRupee />
              </label>
              <Input inputType="text" placeHolder="Enter Price" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeatAndPricing;
