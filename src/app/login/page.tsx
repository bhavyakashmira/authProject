"use client"
import { log } from 'console';
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaGoogle, FaUser } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdOutlineMail, MdPassword } from 'react-icons/md';
import Link from 'next/link';
function page() {

    const router = useRouter();

    const { data, status } = useSession();
    console.log(data, status);
    if (status === "loading") {
        return <div  >loading...</div>
    }
    if (status === 'authenticated') {
        router.push("/")
        
    }
    
  return (
    <div className='' >

      <div className='max-w-screen-xl mx-auto flex  px-10'>
        <div className='flex-1 hidden lg:flex items-center  justify-center'>
          <button className='bg-red-900 gap-3 text-white rounded-xl p-3 flex items-center  ' onClick={() => signIn("google")}>
            <FaGoogle/>
            login with google</button>
          
        </div>
        <div className='flex-1 flex flex-col justify-center items-center'>
          <form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' >
            <FaGoogle className='w-24 lg:hidden fill-black' />
            <h1 className='text-4xl font-extrabold text-black'>Join today.</h1>
            <label className='input input-bordered rounded flex items-center gap-2'>
              <MdOutlineMail />
              <input
                type='email'
                className='grow'
                placeholder='Email'
                name='email'
            
              />
            </label>
            <div className='flex gap-4 flex-wrap'>
              <label className='input input-bordered  rounded flex items-center gap-2 flex-1'>
                <FaUser />
                <input
                  type='text'
                  className='grow '
                  placeholder='Username'
                  name='username'
               
                />
              </label>
              <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
                <MdDriveFileRenameOutline />
                <input
                  type='text'
                  className='grow'
                  placeholder='Full Name'
                  name='fullName'
            
                />
              </label>
            </div>
            <label className='input input-bordered rounded flex items-center gap-2'>
              <MdPassword />
              <input
                type='password'
                className='grow'
                placeholder='Password'
                name='password'
            
              />
            </label>
            <button className='btn rounded-full bg-blue-600 text-white'> Loading</button>
            
          </form>
          <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
            <p className='text-white text-lg'>Already have an account?</p>
           
              <button className='btn rounded-full text-blue-600  border-blue-600 btn-outline w-full'>Sign in</button>
           
          </div>
        </div>
      </div>


          
         
    </div>
  )
}

export default page
