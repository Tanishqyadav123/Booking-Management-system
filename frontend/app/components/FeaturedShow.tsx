import React from 'react'
import ShowCard from './ShowCard'

function FeaturedShow() {

    let arr = [1,2,3]
  return (
    <div className='w-[100%] min-h-[70%]  text-white flex justify-center '>

       <div className='w-[80%] '>
           <div className='heading flex flex-col items-center mt-5 gap-4 '>

              <h2 className='text-2xl text-center mt-5'>Featured Shows</h2>
            <p className='text-sm text-gray-500 text-center'>Don't miss these amazing comedy performances</p>

           </div>

           {/* For Shows Card */}

           <div className='all-shows mt-12 flex items-start justify-center gap-6 flex-wrap'>
                {
                    arr.map((value , index)=>{
                        return <ShowCard key={value} />
                    })
                }
           </div>

       </div>

    </div>
  )
}

export default FeaturedShow
