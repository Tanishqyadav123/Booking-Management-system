"use client";

import React from 'react'
import logo from '@/public/images.png'
import Image from 'next/image'
import DarkButton from './DarkButton'
import LightButton from './LightButton'
import {useRouter} from 'next/navigation'


function Navbar() {

    const router = useRouter()
    const sendToLogin = () =>{
         router.push("/login")
    }
    const sendToRegister = () =>{
         router.push("/register")
    }
    

  return (
    <div className='w-full h-12 bg-white flex items-center px-8 shadow-lg justify-between'>
       <div className='left'>
           <Image src={logo} alt='' className='h-10 w-16'></Image>
       </div>
       <div className='right flex items-center justify-center gap-4 '>
              <LightButton btnText='Sign In' callback={sendToLogin} />
              <DarkButton btnText='Sign Up' callback={sendToRegister}/>
       </div>
    </div>
  )
}

export default Navbar
