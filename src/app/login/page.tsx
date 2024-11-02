"use client"
import { log } from 'console';
import { signIn, useSession } from 'next-auth/react'
import React from 'react'
import { useRouter } from 'next/navigation';
import { FaGithub, FaGoogle, FaUser } from "react-icons/fa";
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
    <div className="h-screen bg-black relative">
      <img
        src={"/loginpage.jpeg"}
        className="absolute inset-0 object-cover w-full h-full opacity-70"
        alt="Background"
      />
      <div className="relative bg-white bg-opacity-75">
        <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
          <div className="flex flex-col items-center justify-between xl:flex-row">
            <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
              <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl sm:leading-none">
                Join Our Gang <br className="hidden md:block" />
                Read or Write Your Stories
              </h2>
              <p className="max-w-xl mb-4 text-base text-black md:text-lg bg-white p-3 rounded-xl ">
                Dive into a world of creativity and imagination! Join us to connect with fellow storytellers, share your adventures, and bring your narratives to life. Whether you're here to read inspiring stories or contribute your own, there's a place for you in our vibrant community. Let's embark on this journey together!
              </p>

              <a
                href="/"
                aria-label=""
                className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
              >
                Learn more
                <svg
                  className="inline-block w-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                </svg>
              </a>
            </div>
            <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
              <div className="bg-white rounded-lg shadow-2xl p-7 sm:p-10">
                <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                  Sign Up for Updates
                </h3>
                <div className='mt-4 mb-2 sm:mb-4'>
                  <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-red-500 text-white transition duration-200 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                  >
                    <FaGoogle className="mr-2" />
                    Log In With Google
                  </button>
                </div>
                <div className='mt-4 mb-2 sm:mb-4'>
                  <button
                    type="button"
                    onClick={() => signIn("github")}
                    className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide bg-gray-800 text-white transition duration-200 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    <FaGithub className="mr-2" />
                    Log In With GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default page
