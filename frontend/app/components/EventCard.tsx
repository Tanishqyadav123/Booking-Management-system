import React from "react";
import LightButton from "./LightButton";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import showPoster2 from "@/public/images.png";
import { useRouter } from "next/navigation";
import { getAllUpComingEventType } from "../interfaces/event.interface";
import { getDate, getEventStartAndEndTime } from "../utils/getEventDate";
function EventCard({
  eventDetails,
}: {
  eventDetails: getAllUpComingEventType;
}) {
  const router = useRouter();
  function sendToBookNowPage() {
    
    router.push(`/booking/${eventDetails.id}`);
  }
  return (
    <div className="w-[25%] h-[60%] rounded-md mt-4">
      <div className="image w-[100%] h-1/2">
        <Image
          className="h-[100%] rounded-md w-[100%]"
          src={eventDetails?.eventBanner || showPoster2}
          width={"100"}
          height={"100"}
          alt="Show-poster"
        />
      </div>

      {/* Show Type */}

      <div className="p-4 flex items-start bg-[#111826] flex-col gap-5">
        <p className="p-1 px-2 min-w-[20%] text-xs bg-gray-600 rounded-full">
          stand-up
        </p>
        <p className="text-xs text-gray-500 ">
          {getDate(eventDetails.startTime)}
        </p>
        <div>
          <h2 className="text-md">{eventDetails.name}</h2>
          <div className="flex flex-col items-start gap-2 mt-2">
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <MdPerson /> {eventDetails?.comedianDetails?.firstName}{" "}
              {eventDetails?.comedianDetails?.lastName}
            </p>
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <IoLocationSharp />
              {eventDetails?.venueDetails?.name} •{" "}
              {eventDetails?.venueDetails?.address}
            </p>
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <MdAccessTimeFilled />
              {
                getEventStartAndEndTime(
                  eventDetails.startTime,
                  eventDetails.endTime
                ).startTime
              }{" "}
              -{" "}
              {
                getEventStartAndEndTime(
                  eventDetails.startTime,
                  eventDetails.endTime
                ).endTime
              }
            </p>
          </div>
        </div>
        <div className="flex w-[100%] items-center justify-between">
          <p className="text-lg font-bold">$45</p>
          <LightButton btnText="Book Now" callback={sendToBookNowPage} />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
