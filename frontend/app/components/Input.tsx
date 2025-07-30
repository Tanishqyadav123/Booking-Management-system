import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputType {
  inputType: string;
  placeHolder: string;
  register?: UseFormRegisterReturn;
  error?: string;
  isDisable?: boolean;
}

function Input({
  inputType,
  placeHolder,
  register,
  error,
  isDisable,
}: InputType) {
  return (
    <>
      <div className="w-full">
        <input
          className="w-full text-black min-w-[80%] p-3 bg-white border border-gray-300 rounded-lg shadow-sm placeholder:text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          {...register}
          disabled = {isDisable}
          type={inputType}
          placeholder={placeHolder}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600 font-medium">*{error}</p>
        )}
      </div>
    </>
  );
}

export default Input;
