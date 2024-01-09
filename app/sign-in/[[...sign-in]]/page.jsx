import React from 'react'
import Sign_In from '@/components/Sign_In'
import Image from 'next/image'
import { SignIn } from '@clerk/nextjs'
const SignInPage = () => {
  return (
    <div className='flex gap-10 h-[90vh] w-[80vw] justify-center items-center min-h-[500px]'>
      <div className='w-2/5 hidden justify-center items-center md:flex'>
        <Image 
          src="/ig_phone.png"
          width={250}
          height={250}
          alt='phone' />
      </div>
      <Sign_In />
    </div>
  )
}

export default SignInPage