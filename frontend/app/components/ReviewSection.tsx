"use client";
// @ts-ignore
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import toast from "react-hot-toast";
import { fetchAllReviewsService } from "../Services/review.service";
import { singleReviewType } from "../responseTypes/review.response";

function ReviewSection() {
  const [allReviews, setAllReviews] = useState<singleReviewType[]>([]);

  const fetchReviews = async () => {
    try {
      const response = await fetchAllReviewsService();

      setAllReviews(response.data);
    } catch (error: AxiosError) {
      toast.error(
        error?.response?.data?.message || "Error while fetching the reviews"
      );
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="min-w-[50%] max-h-[70%] overflow-hidden  p-4 flex flex-col gap-4">
      {/* Cards for rendering the reviews */}
      {allReviews.map((reviewDetails) => {
        return (
          <ReviewCard
            eventName={reviewDetails.eventDetails?.name}
            firstName={reviewDetails.userDetails?.firstName}
            lastName={reviewDetails.userDetails?.lastName}
            rating={reviewDetails.rating}
            review={reviewDetails.review}
          />
        );
      })}
    </div>
  );
}

export default ReviewSection;
