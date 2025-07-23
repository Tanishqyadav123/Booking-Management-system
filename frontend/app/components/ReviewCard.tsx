import Image from "next/image";
import React from "react";
import reviewerImage from "@/public/images.png";
import { TbStarFilled } from "react-icons/tb";
import { reviewCardPropsType } from "../interfaces/review.interface";

function ReviewCard({
  eventName,
  firstName,
  lastName,
  review,
  rating,
}: reviewCardPropsType) {
  return (
    <div className="w-[100%] max-h-[50%] overflow-hidden p-2">
      <div className="flex items-center justify-between">
        <div className="reviewer-details flex items-center gap-3">
          <Image
            src={reviewerImage}
            alt="reviewerImage"
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex justify-center flex-col">
            <h2>
              {firstName} {lastName}
            </h2>

            <h3 id="show-name" className="text-xs">
              {eventName}
            </h3>
          </div>
        </div>

        <div className="rating flex items-center gap-2">
          {Array(rating)
            .fill(null)
            .map((value) => {
              return <TbStarFilled key={value} />;
            })}
          <span className="text-sm">{rating}/5</span>
        </div>
      </div>
      <p className="text-center text-xs my-4 mx-auto max-w-[85%]">
        {review || "Nice Show"}
      </p>
    </div>
  );
}

export default ReviewCard;
