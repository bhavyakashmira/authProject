import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

function HeroSec() {
  const router = useRouter();
  return (
      <div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between w-full mb-10 md:flex-row">
          <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
            <div className="max-w-xl mb-6">
        
              <h2 className="font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none max-w-lg mb-6">
                Turn from 
                <br className="hidden md:block" />
                a reader{' '}
                <span className="inline-block text-deep-purple-accent-400">to author</span>
              </h2>
              <p className="text-gray-700 text-base md:text-lg">Our platform is a haven for writers, creators, and dreamers. Whether you're an aspiring novelist or an established author, this is where your stories come to life. Share your work with a community of passionate readers, connect with like-minded writers, and grow your audience. With easy-to-use tools, you can publish chapters, receive feedback, and build your own library of creative works. Join us and turn your ideas into stories that inspire, captivate, and resonate with the world.</p>
            </div>
            <div className="flex items-center space-x-3">
             
              <button onClick={() => router.push("/books")}  className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"> <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4"> <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span> </span> <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span> <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">Start Reading</span> </button>
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="w-4/5">
              <img className="object-cover " src={"/bookread1.jpg"} alt="" />
            </div>
           
          </div>
        </div>
 
      </div>

    </div>
  )
}

export default HeroSec
