import React from 'react'

function LightButton({btnText , callback} : {btnText : string , callback ?: () => void}) {
  return (
     <button onClick = {callback} className=' bg-white  px-4 py-2 cursor-pointer hover:underline text-black rounded-sm text-sm'>
        {btnText}
    </button>
  )
}

export default LightButton
