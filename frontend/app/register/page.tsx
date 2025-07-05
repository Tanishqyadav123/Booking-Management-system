"use client";
import React, { useEffect, useState } from 'react'
import Input from '../components/Input';
import z from 'zod';
import { SignUpSchema } from '../validations/signUp.validation';
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import DarkButton from '../components/DarkButton';
import { adminRegisterService, userRegisterService } from '../Services/auth.service';
import { userRoleType } from '../entity/userRole.enum';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
export type SignUpSchemaType = z.infer <typeof SignUpSchema>
function page() {

   const router = useRouter()
   const {register , handleSubmit , formState : {errors} , reset} = useForm<SignUpSchemaType>({
     resolver : zodResolver(SignUpSchema),
     mode : "onChange"
   })


   
  
  const [role , setRole] = useState(1)

  useEffect(() =>{
     reset( {
       firstName : '',
       lastName : '',
       email : '',
       password : '',
       phoneNumber : ''
     })
  } , [role])


  const submitFormData = async(data : SignUpSchemaType) =>{
    
     try {
       if (role === 1) {
         //   Hit the API for Admin :-
         console.log("Printing the signup form data for admin " , data)
 
          await adminRegisterService({...data , userType : userRoleType.ADMIN})
          
       }
       else {
         //  Hit the API for viewer and Comedian Role 
               await userRegisterService({...data , userType : role === 2 ? userRoleType.COMEDIAN : userRoleType.VIEWER})
       }

       toast.success(`${role === 1 ? "Admin" : role === 2 ? "Comedian" : "Viewer"} Created SuccessFully`)
       
       router.push("/login")
     } catch (error : any) {
          toast.error(error?.response?.data?.message)
     }

  }
  return ( 
    <div className='bg-gray-200 w-full h-screen text-black flex items-center justify-center'>

      <div className="register-here w-[30%] p-5 min-h-[70%] bg-white rounded-lg">
            <h1 className='text-center text-xl'>Create Account</h1>
            <p className='text-md text-center text-gray-700'>Choose your account type to get started</p>

          <div className='w-[100%] mt-5 flex items-center justify-center'>

            <div className=' bg-black flex w-[90%] text-white  my-5 justify-around p-1 gap-4'
            >
              <p className={`${role === 1 && "bg-white text-black"} px-3 text-md transition-all cursor-pointer `} onClick={() => setRole(1)}>Admin</p>
              <p className={`${role === 2 && "bg-white text-black"} px-3 text-md transition-all cursor-pointer  `} onClick={() => setRole(2)} >Comedian</p>
              <p className={`${role === 3 && "bg-white text-black"} px-3 text-md transition-all cursor-pointer `} onClick={() =>setRole(3)}>Viewer</p>
            </div>

           </div>
            <form onSubmit={handleSubmit(submitFormData)} className='flex flex-col justify-start gap-5 mt-5' >
            
             <Input inputType='text' placeHolder='Enter your First Name' register={register("firstName")} error={errors.firstName?.message} />
             <Input inputType='text' placeHolder='Enter your Last Name' register={register("lastName")} error={errors.lastName?.message}/>
             <Input inputType='email' placeHolder='Enter your Email' register={register("email")} error={errors.email?.message}/>
             <Input inputType='text' placeHolder='Enter your Phone Number' register={register("phoneNumber")} error={errors.phoneNumber?.message}/>
             <Input inputType='password' placeHolder='Enter your Password' register={register("password")} error={errors.password?.message}/>

             <DarkButton btnText='Submit' type='submit' />



            </form>
      </div>
      
    </div>
  )
}

export default page
