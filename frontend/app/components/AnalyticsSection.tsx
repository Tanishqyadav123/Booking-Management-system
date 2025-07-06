import React from 'react'
import AnalyticsValues from './AnalyticsValues'

function AnalyticsSection() {
    let arr = [1,2,3,4]

  return (
    <div className='bg-[#111826] w-[100%] min-h-[20%]  text-white flex items-center justify-center'>
         <div className='w-[60%]  mt-12 flex items-center justify-center gap-6 flex-wrap'>
        {
             arr.map((value) =>{
                 return <AnalyticsValues key={value}/>
             })
        }
       
      </div>
    </div>
  )
}

export default AnalyticsSection
