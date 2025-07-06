import React from 'react'
import { ImSearch } from "react-icons/im";
import { LuTicketCheck } from "react-icons/lu";
import { FaRegSmileBeam } from "react-icons/fa";
function WorkCard() {
  return (
   <div className='w-[25%] h-[30%]  rounded-md mt-4'>
        <div className='w-[100%] h-[100%] flex items-center justify-center flex-col gap-2'>
              <p className='p-4 flex items-center justify-center w-[18%] bg-gray-600 rounded-full'> <ImSearch size={"180%"}/> </p>
              <p className='text-lg'>Browse Shows</p>
              <p className='text-sm text-center text-gray-600'>Discover comedy shows by location, date, and comedian</p>
        </div>
    </div>
  )
}

export default WorkCard
