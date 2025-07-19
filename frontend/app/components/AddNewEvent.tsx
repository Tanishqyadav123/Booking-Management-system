import React from "react";
import Input from "./Input";

function AddNewEvent() {
  return (
    <div className="w-[100%]  mt-8 p-4 bg-[#111826] ">
      <h2 className="text-xl">Event Details</h2>

      <div className="mt-3 flex  items-center justify-between">
        <div className="flex flex-col gap-3">
          <label htmlFor="event-title">Event title</label>
          <Input inputType="text" placeHolder="Enter your show title" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="event-start">Event start</label>
          <Input inputType="datetime-local" placeHolder="" />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="event-end">Event end</label>
          <Input inputType="datetime-local" placeHolder="" />
        </div>
      </div>

      <div className="flex  flex-col mt-4 gap-3">
        <label htmlFor="event-description">
          Description<span className="text-gray-600 text-xs mx-2">0/200</span>{" "}
        </label>
        <textarea
          name=""
          cols={50}
          rows={5}
          className="border-[1px] border-gray-600 p-2 resize-none"
          id=""
        ></textarea>
      </div>
    </div>
  );
}

export default AddNewEvent;
