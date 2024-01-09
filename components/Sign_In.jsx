"use client"

import React from 'react'
import { SignIn } from '@clerk/nextjs'
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function Sign_In() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // start the sign In process.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });
 
      if (result.status === "complete") {
        console.log(result);
        await setActive({ session: result.createdSessionId });
        router.push("/")
      }
      else {
        /*Investigate why the login hasn't completed */
        console.log(result);
      }
 
    } catch (err) {
      console.error("error", err.errors[0].longMessage)
    }
  };
 
  return (
    <div className='flex flex-col gap-3 h-full justify-center items-center w-6/12 min-w-80'>
        <div className='border-2 border-b-2 w-full md:w-3/4 p-4 md:p-6 h-3/4 flex flex-col justify-center'>
            <div className='flex justify-center items-center'>
                <Image 
                    src="/insta_name.png"
                    height={200}
                    width={200}
                    alt='instagram'/>
            </div>
            <form onSubmit={handleSubmit} className='my-8'>
            <div className='flex justify-center'>
                <input
                type="email"
                id='email'
                name='email'
                placeholder='Phone number, username, or email'
                onChange={(e) => setEmailAddress(e.target.value)}
                className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
                />
            </div>
            <div className='flex justify-center'>
                <input
                type="password"
                id="password"
                name="password"
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
                />
            </div>
            <div className='flex justify-center h-9'>
                <button className='bg-[#4cb5f9] flex items-center justify-center rounded-md my-1 w-10/12 text-white text-xs font-bold'>Log in</button>
            </div>
            </form>
            <div className='flex justify-center flex-col items-center gap-4'>
                <div className='text-sm pl-3 pr-3 text-[#8a9698]'>OR</div>
                <div className='text-sm text-[#385185]'>Login with facebook</div>
                <div className='text-xs text-[#385185]'><Link href="/forgot-password">Forgot password?</Link></div>
            </div>
        </div>
        <div className='border-2 p-3 w-full md:w-3/4 flex justify-center items-center'>
            <p className='text-sm'>Don't have an account? <Link href="/sign-up" className='text-[#4cb5f9]'>Sign up</Link></p>
        </div>
    </div>
  );
}