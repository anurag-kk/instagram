"use client"

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
 
export default function SignUpForm() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const router = useRouter();
  // start the sign up process.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        emailAddress,
        username,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== "complete") {
        /*  investigate the response, to see if there was an error
         or if the user needs to complete more steps.*/
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/");
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

 
  return (
    <div className='flex flex-col gap-3 h-full justify-center items-center w-6/12 min-w-80'>
    {!pendingVerification && (
    
    <div className='border-2 border-b-2 w-full md:w-3/4 p-4 md:p-6 h-full flex flex-col justify-center gap-3'>
      <div className='flex justify-center items-center'>
          <Image 
              src="/insta_name.png"
              height={200}
              width={200}
              alt='instagram'/>
      </div>
      <div className='flex justify-center items-center'>
        <p className="text-[#8a9698] font-bold text-center">Sign up to see photos and videos from your friends.</p>
      </div>
      <div className='flex justify-center h-9'>
          <button className='bg-blue-500 flex items-center justify-center rounded-md my-1 w-10/12 text-white text-xs font-bold'>Log In with Facebook</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center'>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmailAddress(e.target.value)}
            className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
          />
        </div>
        <div className='flex justify-center'>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
          />
        </div>
        <div className='flex justify-center'>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
          />
        </div>
        
      
      <div className='p-3 flex justify-center items-center'>
          <p className='text-xs w-full text-center text-[#8a9698]'>People who use our service may have uploaded your contact information to Instagram. <Link href="#" className="text-[#385185]">Learn More</Link></p>
      </div>
      <div className='p-3 flex justify-center items-center'>
          <p className='text-xs w-full text-center text-[#8a9698]'>By signing up, you agree to our <Link href="#" className="text-[#385185]">Terms</Link> , <Link href="#" className="text-[#385185]">Privacy Policy</Link> and <Link href="#" className="text-[#385185]">Cookies Policy</Link> .</p>
      </div>
      <div className='flex justify-center h-9'>
          <button className='bg-[#4cb5f9] flex items-center justify-center rounded-md my-1 w-10/12 text-white text-xs font-bold'>Sign Up</button>
      </div>
      </form>
      </div>
    )}
    {pendingVerification && (
      <div className="flex flex-col gap-3">
        <div className='border-2 border-b-2 w-full md:w-3/4 p-6 md:p-10 h-3/4 flex flex-col justify-center gap-3'>
        <div className='flex justify-center items-center pt-3'>
          <Image 
              src="/insta_name.png"
              height={200}
              width={200}
              alt='instagram'/>
        </div>
          <div className="flex justify-center">
            <p className='text-sm font-bold'>Enter Confirmation Code</p>
          </div>
          <div className="flex justify-center">
            <p className='text-sm text-center'>Enter the confirmation code we sent to {emailAddress}. <span onClick={handleSubmit} className="text-[#4cb5f9] cursor-pointer">Resend Code.</span></p>
          </div>
          <form onSubmit={onPressVerify} className="flex flex-col justify-center items-center">
            <input
              value={code}
              placeholder="Confirmation Code"
              onChange={(e) => setCode(e.target.value)}
              className='border-2 rounded-sm my-1 bg-[#fafafa] w-10/12 h-9 text-xs p-2'
            />
            <div className='flex justify-center h-9 w-10/12'>
                <button className='bg-[#4cb5f9] flex items-center justify-center rounded-md my-1 w-full text-white text-xs font-bold'>Verify</button>
            </div>
          </form>
        </div>
        <div className='border-2 p-3 w-full md:w-3/4 flex justify-center items-center'>
          <p className='text-sm'>Have an account? <Link href="/sign-in" className="text-[#4cb5f9]">Login</Link></p>
        </div>
        </div>
      )}
    </div>
  );
}