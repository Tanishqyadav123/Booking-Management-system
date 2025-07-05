import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputType  {
    inputType : string,
    placeHolder : string,
    register : UseFormRegisterReturn,
    error ?:  string
}

function Input( {inputType , placeHolder , register , error} : InputType) {
  return (
    <>
      <input className='p-2 w-[80%] mx-5 outline-nonerounded-md placeholder:text-sm' {...register}   type={inputType} placeholder={placeHolder} />
      {error && <p className='text-red-500 font-bold text-sm'> *{error}</p>}
    </>
  )
}

export default Input
