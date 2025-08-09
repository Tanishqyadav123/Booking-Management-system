"use client";
import React, { useState } from "react";
import Input from "../components/Input";
import z from "zod";
import { verifyOtpSchema } from "../validations/signUp.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DarkButton from "../components/DarkButton";
import { verifyOtpService } from "../Services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export type verifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;
function page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<verifyOtpSchemaType>({
    resolver: zodResolver(verifyOtpSchema),
    mode: "onChange",
  });

  const verifyOtp = async (data: verifyOtpSchemaType) => {
    // Hit the API for send OTP on Phone :-
    setLoading(true);
    try {
      if (!localStorage.getItem("phoneNumber")) {
        throw new Error("Phone number is missing");
      }
      await verifyOtpService({
        otp: data.otp,
        phoneNumber: localStorage.getItem("phoneNumber")!,
        codeType: "VERIFY",
      });
      toast.success("OTP Verified");
      router.push("/register");
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen  bg-gray-300 flex text-black items-center justify-center">
      <div className="w-[30%] min-h-[60%] bg-white p-5">
        <h1 className="text-xl text-center ">Verify Your Phone Number</h1>

        <form
          onSubmit={handleSubmit(verifyOtp)}
          className=" mt-12 flex items-center flex-col gap-4"
        >
          <Input
            inputType="text"
            placeHolder="Enter OTP"
            register={register("otp")}
            error={errors.otp?.message}
          />

          <DarkButton
            isDisabled={loading ? true : false}
            btnText={loading ? "verifying..." : "verify"}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default page;
