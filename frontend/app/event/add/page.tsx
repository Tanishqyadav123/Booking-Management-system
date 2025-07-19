import AddNewEvent from "@/app/components/AddNewEvent";
import BookingOptions from "@/app/components/BookingOptions";
import DarkButton from "@/app/components/DarkButton";
import LightButton from "@/app/components/LightButton";
import PricingSummary from "@/app/components/PricingSummary";
import SeatAndPricing from "@/app/components/SeatAndPricing";
import VenueSelection from "@/app/components/VenueSelection";
import React from "react";
import { useForm } from "react-hook-form";

function page() {
  return (
    <div className="min-h-[70%] w-[90%] flex items-start gap-5 mx-auto p-5">
      <div className="w-[100%] mt-6">
        <div className="heading">
          <h1 className="text-2xl font-bold">Create New Event</h1>
          <h5 className="text-sm">
            Set up your comedy with flexible seating and pricing options...
          </h5>
        </div>

        {/* Component for adding new Event */}
        <AddNewEvent />
        <VenueSelection />
        <BookingOptions />
        <SeatAndPricing />
      </div>

      <div className="w-[30%] mt-6 flex flex-col gap-3">
        <PricingSummary />

        <LightButton btnText="Create Event" />
      </div>
    </div>
  );
}

export default page;
