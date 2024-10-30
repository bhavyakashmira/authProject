import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

function HeroSec() {
  const router = useRouter();
  return (
      <div>

      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
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
              <button className='bg-black p-2 text-white rounded-xl' onClick={()=>router.push("/books")}  >
                Read Now
            </button>
           
            </div>
          </div>
          <div className="flex items-center justify-center lg:w-1/2">
            <div className="w-2/5">
              <img className="object-cover" src="https://kitwind.io/assets/kometa/one-girl-phone.png" alt="" />
            </div>
            <div className="w-5/12 -ml-16 lg:-ml-32">
              <img className="object-cover" src="https://kitwind.io/assets/kometa/two-girls-phone.png" alt="" />
            </div>
          </div>
        </div>
 
      </div>

    </div>
  )
}

export default HeroSec
