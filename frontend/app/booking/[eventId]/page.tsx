"use client";

import BookingSummary from "@/app/components/BookingSummary";
import SeatArragement from "@/app/components/SeatArragement";
import { useEventContext } from "@/app/Context/event.context";
import { eventDetailsType } from "@/app/interfaces/event.interface";
import { getEventDetailsByIdService } from "@/app/Services/event.service";
import { getDate, getEventStartAndEndTime } from "@/app/utils/getEventDate";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";

function page({ params }: { params: { eventId: string } }) {
  let { eventId } = params;

  const { fetchEventDetailsById, eventDetails } = useEventContext();
  console.log("Event Id is ", eventId);
  // Need to fetch the details using this event Id :-

  useEffect(() => {
    fetchEventDetailsById(eventId);
  }, []);

  return (
    <div className="min-h-[70%] bg-[#111826] w-[100%] mx-auto p-5">
      <div className="w-[100%] flex items-start justify-around gap-4">
        {/* Seat Arragement */}
        <div className="bg-black w-[100%] h-[100%] rounded flex-1/2 p-4">
          <div className="flex items-start flex-col gap-2">
            <h1 className="text-xl">{eventDetails?.name}</h1>
            <p className="text-sm text-gray-500">
              {eventDetails?.venueDetails?.address} -{" "}
              {getDate(eventDetails?.startTime!)} -{" "}
              {getEventStartAndEndTime(eventDetails?.startTime).startTime}
            </p>
          </div>

          <SeatArragement />
        </div>

        <div className="flex-1 bg-black w-[100%] h-[100%] rounded flex flex-col items-start gap-4">
          <BookingSummary />
        </div>
      </div>
    </div>
  );
}

export default page;
