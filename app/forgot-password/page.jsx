"use client"

import React, { SyntheticEvent, useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [complete, setComplete] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
 
  const { isLoaded, signIn, setActive } = useSignIn();
 
  if (!isLoaded) {
    return null;
  }
 
  async function create(e) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      })
      .then(_ => {
        setSuccessfulCreation(true);
      })
      .catch(err => console.error('error', err.errors[0].longMessage));
  }
 
  async function reset(e) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      })
      .then(result => {
        if (result.status === 'needs_second_factor') {
          setSecondFactor(true);
        } else if (result.status === 'complete') {
          setActive({ session: result.createdSessionId });
          setComplete(true);
        } else {
          console.log(result);
        }
      })
      .catch(err => console.error('error', err.errors[0].longMessage));
  }
 
  return (
    <div className='flex flex-col gap-3 h-full justify-center items-center w-5/12 min-w-80'>
      <div className='border-2 border-b-2 w-full md:w-3/4 p-4 md:p-6 h-full flex flex-col justify-center gap-3'>
        <div className='flex justify-center items-center'>
          <Image 
            src="/lock_img.png"
            height={100}
            width={100}
            alt='lock'/>
        </div>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
        }}
        onSubmit={!successfulCreation ? create : reset}
      >
        {!successfulCreation && !complete && (
          <div className='flex flex-col justify-center items-center gap-3'>
            <div>
              <p className='font-bold text-sm text-center'>Trouble logging in?</p>
            </div>
            <div>
              <p className='text-sm text-center text-[#8a9698]'>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
            </div>
            <input
              type='email'
              placeholder='e.g john@doe.com'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
            />
 
          <button className='bg-[#4cb5f9] flex items-center justify-center rounded-md my-1 w-10/12 text-white text-xs font-bold h-8'>Send Login Link</button>

          </div>
        )}
 
        {successfulCreation && !complete && (
          <div className='flex flex-col justify-center items-center gap-3'>
            <div>
              <p className='text-sm text-center text-[#8a9698]'>A confirmation code has been sent your mail. Enter your new password and confirmation code to retain your account</p>
            </div>
            <input
              type='password'
              placeholder='New password'
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
            />
 
            <input
              type='text'
              placeholder='Confirmation Code'
              value={code}
              onChange={e => setCode(e.target.value)}
              className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
            />
 
            <button className='bg-[#4cb5f9] flex items-center justify-center rounded-md my-1 w-10/12 text-white text-xs font-bold h-8'>Reset</button>

          </div>
        )}
 
        {complete && 'You successfully changed you password'}
        {secondFactor && '2FA is required, this UI does not handle that'}
      </form>
      </div>
    </div>
  );
};
 
export default ForgotPassword;