"use client";
import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import z from "zod";
import { SignInSchema } from "../validations/signUp.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DarkButton from "../components/DarkButton";
import toast from "react-hot-toast";
import {
  adminSignInService,
  signInUserService,
} from "../Services/auth.service";
import { useRouter } from "next/navigation";
import { useAuth } from "../Context/auth.context";

export type SignInSchemaType = z.infer<typeof SignInSchema>;
function page() {
  const { setIsAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    reset({
      email: "",
      password: "",
      isAdmin: false,
    });
  }, []);

  const submitFormData = async (data: SignInSchemaType) => {
    setIsLoading(true);
    try {
      const { isAdmin, ...rest } = data;
      let res: any;
      if (isAdmin) {
        res = await adminSignInService(rest);
      } else {
        res = await signInUserService(rest);
      }

      if (res.data?.data?.token) {
        localStorage.setItem("authToken", res.data?.data?.token);
        setIsAuthenticated(true);
      } else {
        throw new Error("Token not found");
      }
      toast.success("Login Successfully");
      router.push("/");
    } catch (error: any) {
      setIsAuthenticated(false);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-200 w-full h-screen text-black flex items-center justify-center">
      <div className="register-here w-[30%] p-5 min-h-[70%] bg-white rounded-lg">
        <h1 className="text-center text-xl">Login To Account</h1>

        <form
          onSubmit={handleSubmit(submitFormData)}
          className=" mt-12 flex flex-col justify-start gap-5"
        >
          <Input
            inputType="text"
            placeHolder="Enter your Email"
            register={register("email")}
            error={errors.email?.message}
          />
          <Input
            inputType="password"
            placeHolder="Enter your Password"
            register={register("password")}
            error={errors.password?.message}
          />

          <div className="mx-2 flex items-center justify-start gap-4">
            <input type="checkbox" id="is-admin" {...register("isAdmin")} />
            <label htmlFor="is-admin">Admin</label>
          </div>

          <DarkButton
            btnText={isLoading ? "logining..." : "login"}
            type="submit"
          />

          {/* Adding the OAuth Optionals for User */}

          <p className="text-gray-500 text-center">OR</p>
          <DarkButton btnText="Contiue with Google" />
          <DarkButton btnText="Contiue with Github" />
        </form>
      </div>
    </div>
  );
}

export default page;
