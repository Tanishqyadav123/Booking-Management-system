import React from "react";
import LeaveAComment from "../components/LeaveAComment";
import ReviewSection from "../components/ReviewSection";

function page() {
  return (
    <div className="w-full min-h-[70%] flex justify-center">
      <div className="w-[80%] mt-12">
        <div className="heading text-center flex flex-col gap-3">
          <h1 className="text-2xl">Reviews & Ratings</h1>
          <p className="text-md text-gray-600">
            See what our audience thinks about the shows
          </p>
        </div>

        {/* Leave a Comment */}

        <div className="w-[100%] h-[100%] mt-12 flex items-center justify-around gap-5">
          <LeaveAComment />
          <ReviewSection />
        </div>
      </div>
    </div>
  );
}

export default page;
