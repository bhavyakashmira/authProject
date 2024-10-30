import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

function NotloggedIn() {

    const router = useRouter();

  return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 p-4">
          <div className="bg-gray-800 p-10 rounded-lg shadow-lg max-w-md w-full text-center"  >
              <Image alt='lib.png' src={"/lib.jpeg"} height={100} width={100} className="mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Not Logged In</h2>
              <p className="text-gray-400 mb-6">You need to log in to read the chapter.</p>
              <button className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-bold py-3 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={()=>router.push("/login")} >
                  LOG IN
              </button>
          </div>
      </div>

  )
}

export default NotloggedIn
