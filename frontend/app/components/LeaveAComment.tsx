"use client";
// @ts-ignore
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { TbStarFilled } from "react-icons/tb";
import Input from "./Input";
import z from "zod";
import { addAReviewSchema } from "../validations/review.validation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DarkButton from "./DarkButton";
import LightButton from "./LightButton";
import { addNewReviewService } from "../Services/review.service";
import toast from "react-hot-toast";
import { reviewApiResponseType } from "../responseTypes/review.response";
import { fetchAllCompletedEventListService } from "../Services/viewer.service";
import { allCompletedEventListType } from "../responseTypes/viewer.response";

export type addAReviewSchemaType = z.infer<typeof addAReviewSchema>;
function LeaveAComment() {
  let arr = [1, 2, 3, 4, 5];

  const [starSelected, setStarSelect] = useState(0);
  const [allCompletedEvents, setAllCompletedEvents] = useState<
    allCompletedEventListType[]
  >([]);

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<addAReviewSchemaType>({
    resolver: zodResolver(addAReviewSchema),
    mode: "onChange",
  });

  const addNewReview = async (data: addAReviewSchemaType) => {
    try {
      const { reviewerName, ...rest } = data;
      const response: reviewApiResponseType = await addNewReviewService({
        ...rest,
        eventId: +rest.showId,
        rating: +rest.stars,
      });

      toast.success(response?.message);
    } catch (error: AxiosError) {
      toast.error(error?.response?.data?.message || "Error while rating...");
    } finally {
      reset();
      setStarSelect(0);
    }
  };

  const fetchAllCompletedEventList = async () => {
    try {
      const completedEvents = await fetchAllCompletedEventListService();
      setAllCompletedEvents(completedEvents.data);
    } catch (error) {
      toast.error("error while fetching event list for rating");
    }
  };
  // Use Effects :-
  useEffect(() => {
    fetchAllCompletedEventList();
  }, []);


  return (
    <div className="min-w-[50%] min-h-[70%] bg-[#111826] p-4">
      <h1 className="text-xl">Leave a Review</h1>

      <form
        onSubmit={handleSubmit(addNewReview)}
        className="flex items-start w-[100%] gap-8 flex-col mt-5 "
      >
        <div className="show-name flex flex-col gap-4 w-[100%]">
          <label htmlFor="show-name" className="text-xs">
            Show Name
          </label>

          <Controller
            control={control}
            name="showId"
            render={({ field }) => (
              <select
                defaultValue={"Select Show"}
                className="bg-[#111826]"
                {...field}
              >
                <option value={""}>Select Show</option>
                {allCompletedEvents?.map((showData) => (
                  <option value={showData.id} key={showData.id}>
                    {showData.name}
                  </option>
                ))}
              </select>
            )}
          />

          {errors.showId && (
            <p className="text-red-500 text-sm">{errors.showId.message}</p>
          )}
        </div>

        {/* Star Rating Section :- */}
        <div className="star-rating flex flex-col gap-4">
          <label htmlFor="stars" className="text-xs">
            Your Rating
          </label>
          <div className="flex items-center gap-2">
            {arr.map((val) => (
              <label key={val} className="cursor-pointer text-yellow-500">
                <input
                  type="radio"
                  value={val}
                  onClick={() => setStarSelect(val)}
                  {...register("stars", { required: true })}
                  className="hidden"
                />
                {val <= starSelected ? (
                  <TbStarFilled className="text-2xl" />
                ) : (
                  <FaRegStar className="text-2xl" />
                )}
              </label>
            ))}
          </div>
          {errors.stars && (
            <p className="text-red-500 text-sm">{errors.stars.message}</p>
          )}
        </div>

        <div className="your-name">
          <Input
            inputType="text"
            placeHolder="Enter your name"
            register={register("reviewerName")}
          />

          {errors.reviewerName && (
            <p className="text-sm text-red-500">
              {errors.reviewerName.message}
            </p>
          )}
        </div>

        <div className="your-review">
          <Input
            inputType="text"
            placeHolder="Enter your Thoughts"
            register={register("review")}
          />
          {errors.review && (
            <p className="text-sm text-red-500">{errors.review.message}</p>
          )}
        </div>

        <LightButton btnText="Submit Review" type="submit" />
      </form>
    </div>
  );
}

export default LeaveAComment;
