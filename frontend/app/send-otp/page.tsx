"use client";
import React, { useState } from 'react'
import Input from '../components/Input'
import z from 'zod'
import { sendOtpSchema } from '../validations/signUp.validation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import DarkButton from '../components/DarkButton'
import { sendOtpService } from '../Services/auth.service';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation'
export type sendOtpSchemaType = z.infer<typeof sendOtpSchema>
function page() {

    const router = useRouter()
    const [loading , setLoading] = useState <boolean>(false)
    const {register , handleSubmit , formState : {errors}} = useForm<sendOtpSchemaType>({
         resolver : zodResolver(sendOtpSchema),
         mode : "onChange"
    })

    const sendOtp = async(data : sendOtpSchemaType) =>{
          // Hit the API for send OTP on Phone :-
          setLoading(true)
          try {
             await sendOtpService(data)
             toast.success("Send OTP on phone number")
             // Save phone number in local storage :-
             localStorage.setItem("phoneNumber" , data.phoneNumber)
             router.push("/verify-otp")
          }
          catch (error : any)  {
             console.log(error)
             toast.error(error.response.data.message)
          }
          finally{
            setLoading(false)
          }
    } 
    
  return (

    <div className='w-full h-screen  bg-gray-300 flex text-black items-center justify-center'>
        
        <div className='w-[30%] min-h-[60%] bg-white p-5'>
             <h1 className='text-xl text-center '>Verify Your Phone Number</h1>

             <form onSubmit={handleSubmit(sendOtp)} className=' mt-12 flex items-center flex-col gap-4'>
              
                 <Input inputType='text' placeHolder="Phone Number" register = {register("phoneNumber")} error={errors.phoneNumber?.message}  />

                 
                 <DarkButton isDisabled = {loading ? true : false}  btnText={loading ? "sending..."  : "send"} type='submit'/>

             </form>
        </div>
      
    </div>
  )
}

export default page
