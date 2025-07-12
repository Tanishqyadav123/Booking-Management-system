import React from "react";
import ReviewCard from "./ReviewCard";

function ReviewSection() {
  return (
    <div className="min-w-[50%] max-h-[70%] overflow-hidden  p-4 flex flex-col gap-4">
      {/* Cards for rendering the reviews */}
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
}

export default ReviewSection;
