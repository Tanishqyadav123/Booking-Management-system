import Image from 'next/image'
import React from 'react'
import HeroImage from '@/public/Hero-image.avif'
import LightButton from './LightButton'

function HeroSection() {
  return (
    <div className='w-[100%] min-h-[70%] bg-[#111826] flex items-center justify-around gap-5'>
      <div className='left-section flex-1/2 text-5xl flex items-center justify-center flex-col gap-4 '>
          
        <h1 >Laugh Out Loud with</h1>
        <h1>the Best <span className='text-gray-700'>Comedy</span></h1>
        <h1 className='text-gray-700'>Shows</h1>
        <p className='text-[40%] mt-2 text-gray-300'>Discover amazing comedians, book tickets instantly, and </p>
        <p className='text-[40%] mt-2 text-gray-300'>enjoy unforgettable nights of laughter.</p>
        <LightButton btnText='Browse Shows'/>
      </div>
      <div className='right-section flex-1/2 flex items-center justify-center'>
         <Image className='h-[42%] w-[55%]' src={HeroImage} alt='Hero-image' />
      </div>
    </div>
  )
}

export default HeroSection
