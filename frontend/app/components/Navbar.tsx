"use client";

import React, { useEffect } from 'react'
import logo from '@/public/images.png'
import Image from 'next/image'
import DarkButton from './DarkButton'
import LightButton from './LightButton'
import {useRouter} from 'next/navigation'
import { useAuth } from '../Context/auth.context';
import Link from 'next/link';


function Navbar() {
    const {isAuthenticated , logoutUser} = useAuth()
   
    const router = useRouter()
    const sendToLogin = () =>{
         router.push("/login")
    }
    const sendToRegister = () =>{
         router.push("/register")
    }
    useEffect(() =>{
        console.log("Print Token" , isAuthenticated)
    } , [isAuthenticated])

    if (isAuthenticated == undefined || isAuthenticated == null) {
       return <>Loading...</>
    }

  return (
    <div className='w-full h-12 bg-white flex items-center px-8 shadow-lg justify-between'>
       <div className='left'>
          <Link href={"/"}>  <Image src={logo} alt='' className='h-10 w-16'></Image> </Link>
       </div>
       {
         isAuthenticated ? <div className='right flex items-center justify-center gap-6 '>
           <Link href={"/comedians"} className='text-black'>Comedians</Link>
           <Link href={"/shows"} className='text-black'>Shows</Link>
           <Link href={"/reviews"} className='text-black'>Reviews</Link>
          <DarkButton btnText='Logout' callback={logoutUser}/>

         </div> :  <div className='right flex items-center justify-center gap-4 '>
              <LightButton btnText='Sign In' callback={sendToLogin} />
              <DarkButton btnText='Sign Up' callback={sendToRegister}/>
       </div>
       }
    </div>
  )
}

export default Navbar
