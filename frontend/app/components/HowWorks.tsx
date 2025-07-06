import React from 'react'
import WorkCard from './WorkCard'

function HowWorks() {
    let arr = [1,2,3]
  return (
    <div className='w-[100%] min-h-[50%] bg-[#111826] text-white flex justify-center '>

       <div className='w-[80%] '>
           <div className='heading flex flex-col items-center mt-5 gap-4 '>

              <h2 className='text-2xl text-center mt-5'>How It Works</h2>
            <p className='text-sm text-gray-500 text-center'>Get tickets to your favorite shows in 3 simple steps</p>

           </div>

           {/* For Works Card */}

          
           <div className='all-shows mt-12 flex items-start justify-center gap-6 flex-wrap'>
                {
                    arr.map((value , index)=>{
                         return <WorkCard key={value} />
                    })
                }
           </div>

       </div>

    </div>
  )
}

export default HowWorks
