import Image from "next/image";
import React from "react";
import reviewerImage from "@/public/images.png";
import { TbStarFilled } from "react-icons/tb";
function ReviewCard() {
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
            <h2>Sarah Johnson</h2>

            <h3 id="show-name" className="text-xs">
              Stand-Up Spectacular - Januanry 15 , 2025
            </h3>
          </div>
        </div>

        <div className="rating flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(() => {
            return <TbStarFilled />;
          })}
          <span className="text-sm">5/5</span>
        </div>
      </div>
      <p className="text-center text-xs my-4 mx-auto max-w-[85%]">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam modi
        non voluptate dolorum assumenda temporibus ratione quas, ab nemo cum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit autem
        totam et. Recusandae delectus pariatur eum officia? Veritatis in autem
        corrupti odio.
      </p>
    </div>
  );
}

export default ReviewCard;
