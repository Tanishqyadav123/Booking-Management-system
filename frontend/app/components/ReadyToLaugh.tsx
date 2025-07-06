import React from 'react'
import LightButton from './LightButton'
import DarkButton from './DarkButton'

function ReadyToLaugh() {
  return (
   <div className='w-[100%] min-h-[50%]  text-white flex justify-center '>
        <div className='w-[80%] flex mt-5 justify-center items-center gap-8 flex-col'>
              <h1 className='text-3xl'>Ready to Laugh?</h1>

              <div className='text-center text-sm text-gray-600'>
                  <p>Join thousands of comedy fans who trust ComedyConnect for the best live</p>
                  <p>entertainment experiences.</p>
              </div>

              <div className='flex items-center gap-4'>
                 <LightButton btnText='Browse Shows Now'/>
                 <DarkButton btnText='Become A Comedian'/>
              </div>
        </div>
    </div>
  )
}

export default ReadyToLaugh
