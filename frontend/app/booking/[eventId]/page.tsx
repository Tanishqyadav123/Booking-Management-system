"use client";

import BookingSummary from "@/app/components/BookingSummary";
import SeatArragement from "@/app/components/SeatArragement";
import React from "react";

async function page({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;

  // Need to fetch the details using this event Id :-

  return (
    <div className="min-h-[70%] bg-[#111826] w-[100%] mx-auto p-5">
      <div className="w-[100%] flex items-start justify-around gap-4">
        {/* Seat Arragement */}
        <div className="bg-black w-[100%] h-[100%] rounded flex-1/2 p-4">
          <div className="flex items-start flex-col gap-2">
            <h1 className="text-xl">Summer Music Festival 2025</h1>
            <p className="text-sm text-gray-500">
              Madison Square Garden - July 15,2025 - 8:00PM
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
