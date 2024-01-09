import React from 'react'
import Sign_Up from '@/components/Sign_Up'
import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
const SignUpPage = () => {
  return (
    <div className='flex gap-10 h-[90vh] w-[80vw] justify-center items-center min-h-[500px]'>
      <div className='w-2/5 hidden justify-center items-center md:flex'>
        <Image 
          src="/ig_phone.png"
          width={250}
          height={250}
          alt='phone' />
      </div>
      <Sign_Up />
    </div>
  )
}

export default SignUpPage