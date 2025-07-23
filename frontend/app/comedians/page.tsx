"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import ComedianCard from "../components/ComedianCard";
import Input from "../components/Input";
// @ts-ignore
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { fetchAllComedianService } from "../Services/comedian.service";
import { singleComedianType } from "../responseTypes/comedian.response";
import { debounce } from "../utils/debouncing";

function page() {
  let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 1, 2, 3, 4];
  const [allComedian, setAllComedian] = useState<singleComedianType[]>([]);
  const [searchVal, setSearchVal] = useState<string>("");
  const fetchComedians = async () => {
    try {
      const res = await fetchAllComedianService(searchVal);
      setAllComedian(res.data);
    } catch (error: AxiosError) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };
  const debouncedHandleChange = debounce(handleChange, 500);

  useEffect(() => {
    fetchComedians();
  }, [searchVal]);
  return (
    <div className="min-h-[70%] w-[80%] mx-auto p-5">
      <div className=" mt-12">
        <div className="heading text-center flex flex-col gap-3">
          <h1 className="text-2xl">Our Comedians</h1>
          <p className="text-md text-gray-600">All Our Talented Comedian...</p>
        </div>

        {/* Search By Comdian Name */}
        <div className="mt-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              className="w-[20%] pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={debouncedHandleChange}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center justify-start gap-4 flex-wrap">
          {allComedian.map((comedianDetails, index) => {
            return (
              <React.Fragment key={comedianDetails.id}>
                <ComedianCard
                  firstName={comedianDetails.firstName}
                  lastName={comedianDetails.lastName}
                  avatar={comedianDetails?.avatar}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default page;
