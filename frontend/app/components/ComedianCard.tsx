import React from "react";
import LightButton from "./LightButton";
import Image from "next/image";
import showPoster from "@/public/Hero-image.avif";
import showPoster2 from "@/public/images.png";
import { comedianPropsType } from "../interfaces/comedian.interface";
function ComedianCard({ firstName, lastName, avatar }: comedianPropsType) {
  return (
    <div className="w-[23%] h-[30%] bg-[#111826] p-5 rounded-md mt-4 flex items-center justify-center flex-col gap-3">
      <Image className="w-[25%] rounded-full" src={ avatar || showPoster} alt="" />
      <h2 className="text-md">
        {firstName} {lastName}
      </h2>
      <p className="text-xs text-gray-600">Stand-up Comedian</p>
      <LightButton btnText="View Shows" />
    </div>
  );
}

export default ComedianCard;
