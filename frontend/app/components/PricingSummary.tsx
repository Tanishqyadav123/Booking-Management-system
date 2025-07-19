import React from "react";
import { MdCurrencyRupee } from "react-icons/md";
function PricingSummary() {
  return (
    <div className="mt-24 bg-[#111826] w-[100%] p-4">
      <h2 className="text-xl font-bold">Pricing Summary</h2>

      <div className="flex flex-col mt-5 text-xs text-gray-500 gap-3">
        <div className="flex items-center justify-between">
          <p>Front Seats</p>
          <p className="flex items-center">
            <MdCurrencyRupee />0
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>VIP Seats</p>
          <p className="flex items-center">
            <MdCurrencyRupee />0
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Mid Seats</p>
          <p className="flex items-center">
            <MdCurrencyRupee />0
          </p>
        </div>
      </div>

      <hr className="my-2" />
      <div className="flex items-center justify-between">
        <p>Total Revenue</p>
        <p className="flex items-center">
          <MdCurrencyRupee />0
        </p>
      </div>
    </div>
  );
}

export default PricingSummary;
