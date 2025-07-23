import React from "react";
import LightButton from "./LightButton";
import Image from "next/image";
import { MdPerson } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { MdAccessTimeFilled } from "react-icons/md";
import showPoster2 from "@/public/images.png";
import { useRouter } from "next/navigation";
function EventCard() {
  const router = useRouter();
  function sendToBookNowPage() {
    router.push("/booking/23");
  }
  return (
    <div className="w-[25%] h-[60%] rounded-md mt-4">
      <div className="image w-[100%] h-1/2">
        <Image
          className="h-[100%] rounded-md w-[100%]"
          src={showPoster2}
          alt="Show-poster"
        ></Image>
      </div>

      {/* Show Type */}

      <div className="p-4 flex items-start bg-[#111826] flex-col gap-5">
        <p className="p-1 px-2 min-w-[20%] text-xs bg-gray-600 rounded-full">
          stand-up
        </p>
        <p className="text-xs text-gray-500 ">Jan 15, 2025</p>
        <div>
          <h2 className="text-md">Stand-Up Night with Mike Johnson</h2>
          <div className="flex flex-col items-start gap-2 mt-2">
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <MdPerson /> Mike Johnson
            </p>
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <IoLocationSharp />
              Madison Square Garden •
            </p>
            <p className="text-xs flex items-center gap-2 text-gray-500">
              <MdAccessTimeFilled />
              8:00 PM - 10:00 PM
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
