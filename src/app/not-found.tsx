import Image from 'next/image';
import React from 'react'

function notFound(){
  return (


        < div className = "grid h-screen place-content-center bg-white px-4" >
            <div className="text-center">
            <Image src={"/working.jpeg"} height={1000} width={1000} alt='not found page'  />
                <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>

                <p className="mt-4 text-gray-500">We can't find that page.</p>
          </div> 
         </div >
  )
}

export default notFound;
