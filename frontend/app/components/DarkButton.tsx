import React from 'react'

function DarkButton({btnText , type , isDisabled = false , callback} : {btnText : string , isDisabled ?: boolean ,type ?:  "submit" | "button" , callback ?: () => void  } ) {
  return (
   type ? 
    <button onClick={callback} disabled = {isDisabled} type={type} className='bg-black px-4 py-2 cursor-pointer text-center hover:bg-gray-900 text-white rounded-sm text-sm'>
        {btnText}
    </button> :
     <button onClick={callback} className='bg-black px-4 py-2 cursor-pointer text-center hover:bg-gray-900 text-white rounded-sm text-sm'>
        {btnText}
    </button>
  )
}

export default DarkButton
