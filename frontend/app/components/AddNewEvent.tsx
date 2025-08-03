"use client";
import React from "react";
import Input from "./Input";
import { useFormContext } from "react-hook-form";
import { addEventSchemaType } from "../event/add/page";

function AddNewEvent() {
const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<addEventSchemaType>();

  return (
    <div className="w-[100%]  mt-8 p-4 bg-[#111826] ">
      <h2 className="text-xl">Event Details</h2>

      <div className="mt-3 flex  items-center justify-between">
        <div className="flex flex-col gap-3">
          <label htmlFor="event-title">Event title</label>
          <Input
            register={register("name")}
            inputType="text"
            placeHolder="Enter your show title"
          />
          {errors.name?.message && (
            <p className="font-bold text-red-500">{errors.name?.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="event-start">Event start</label>
          <Input
            register={register("startTime")}
            inputType="datetime-local"
            placeHolder=""
          />
          {errors.startTime?.message && (
            <p className="font-bold text-red-500">
              {errors.startTime?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="event-end">Event end</label>
          <Input
            register={register("endTime")}
            inputType="datetime-local"
            placeHolder=""
          />
          {errors.endTime?.message && (
            <p className="font-bold text-red-500">{errors.endTime?.message}</p>
          )}
        </div>
      </div>

      <div className="flex  flex-col mt-4 gap-3">
        <label htmlFor="event-description">
          Description
          <span className="text-gray-600 text-xs mx-2">
            {watch("description")?.length}/200
          </span>{" "}
        </label>
        <textarea
          {...register("description")}
          name="description"
          cols={50}
          rows={5}
          maxLength={200}
          className="border-[1px] border-gray-600 p-2 resize-none"
          id=""
        ></textarea>
        {errors?.description?.message && (
          <p className="text-red-500 font-bold">
            {errors?.description?.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddNewEvent;
