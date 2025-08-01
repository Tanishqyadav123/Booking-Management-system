// Service for Register Users :-
import axios from "axios";
import { sendOtpInterface, signInInterface, signUpInterface, verifyOtpInterface } from "../interfaces/auth.interface";

export const sendOtpService = async (data : sendOtpInterface) =>{
     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/send-otp` , data);

     return res.data
}

export const verifyOtpService = async (data : verifyOtpInterface) =>{
     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/verify-otp` , data);
     
     return res.data
}

export const signInUserService = async (data : signInInterface) =>{
     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/sign-in` , data)

     return res;
}
export const adminSignInService = async(data : signInInterface) =>{
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/sign-in` , data)

     return res;
}

// Service of registration for admin :-
export const adminRegisterService = async (data : signUpInterface) => {
       const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/admin/sign-up` , data)
       return res.data;
}

export const userRegisterService = async (data : signUpInterface) =>{
     const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/auth/sign-up` , data)
     return res.data;
}
 

