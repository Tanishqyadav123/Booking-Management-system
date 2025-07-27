"use client";

import AddNewEvent from "@/app/components/AddNewEvent";
import BookingOptions from "@/app/components/BookingOptions";
import DarkButton from "@/app/components/DarkButton";
import LightButton from "@/app/components/LightButton";
import PricingSummary from "@/app/components/PricingSummary";
import SeatAndPricing from "@/app/components/SeatAndPricing";
import VenueSelection from "@/app/components/VenueSelection";
import { createNewEventService } from "@/app/Services/event.service";
import { addEventSchema } from "@/app/validations/event.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";

export type addEventSchemaType = z.infer<typeof addEventSchema>;
function page() {
  const methods = useForm<addEventSchemaType>({
    resolver: zodResolver(addEventSchema),
    mode: "onChange",
    defaultValues: {
      eventSeats: [{ seatId: "1" }, { seatId: "2" }, { seatId: "3" }],
    },
  });
  const [bannerImage, setBannerImage] = useState<File>();

  const { reset, handleSubmit } = methods;

  const handleAddNewEvent = async (data: addEventSchemaType) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description || "");
    formData.append("startTime", new Date(data.startTime).toISOString());
    formData.append("endTime", new Date(data.endTime).toISOString());
    formData.append("entireVenue", data.entireVenue);
    formData.append("venueId", data.venueId);
    formData.append("eventBanner", bannerImage || "");

    if (data.eventSeats.length) {
      data.eventSeats.forEach((eventDetails, index) => {
        formData.append(`eventSeats[${index}][seatId]`, eventDetails.seatId);
        formData.append(
          `eventSeats[${index}][seatCount]`,
          eventDetails.seatCount
        );
        formData.append(`eventSeats[${index}][price]`, eventDetails.price);
      });
    }

    console.log("Printing the Form data ", formData);

    try {
      // Hit the API for creating the event :-
      const resData: any = await createNewEventService(formData);

      toast.success(resData.message);
    } catch (error) {
      console.log("Error is ", error);
      toast.error("Event can not be created");
    } finally {
      reset();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerImage(e.target.files[0]);
    }
  };

  console.log("Event Banner Is ", bannerImage);
  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    console.log("Errors are ", methods.formState.errors);
  }, [methods.formState.errors]);
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleAddNewEvent)}
        className="min-h-[70%] w-[90%] flex items-start gap-5 mx-auto p-5"
      >
        <div className="w-[100%] mt-6">
          <div className="heading">
            <h1 className="text-2xl font-bold">Create New Event</h1>
            <h5 className="text-sm">
              Set up your comedy with flexible seating and pricing options...
            </h5>
          </div>

          {/* Components using form context */}
          <AddNewEvent />
          <VenueSelection />
          <BookingOptions />
          <SeatAndPricing />
        </div>

        <div className="w-[30%] mt-6 flex flex-col gap-3">
          <input
            type="file"
            name="eventBanner"
            accept="image/*"
            onChange={handleFileChange}
          />
          <PricingSummary />
          {/* <LightButton type="submit" btnText="Create Event" /> */}
          <button type="submit">Event Create</button>
        </div>
      </form>
    </FormProvider>
  );
}

export default page;
