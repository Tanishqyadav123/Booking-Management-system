import React from 'react'
import LightButton from './LightButton'
import Image from 'next/image'
import showPoster from '@/public/Hero-image.avif'
import showPoster2 from '@/public/images.png'
function ShowCard() {
  return (
    <div className='w-[25%] h-[30%]  rounded-md mt-4'>
          <div className='image w-[100%] h-1/2'>
                 <Image className='h-[100%] rounded-md w-[100%]' src={showPoster2} alt='Show-poster'></Image>
          </div>
          <div className='p-4 flex items-start bg-[#111826] flex-col gap-5'>
            <div>
                 <h2 className='text-md'>Stand-Up Night with Mike Johnson</h2>
             <p className='text-xs text-gray-500'>Madison Square Garden • Jan 15, 2025</p>
            </div>

             <div className='flex w-[100%] items-center justify-between'>
                <p className='text-lg font-bold'>$45</p>
                <LightButton btnText='Book Now'/>
             </div>
          </div>
    </div>
  )
}

export default ShowCard
