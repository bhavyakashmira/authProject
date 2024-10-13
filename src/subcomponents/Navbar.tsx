import { Bell, Search } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

function Navbar() {

    const { data: session } = useSession();
    

  return (
      <div className='p-2 '>
          <div className='flex justify-between ' >
          <div className='flex  items-center bg-gray-300 rounded-xl ' > 
              <Search size={25} className='' />
              <h1 className='text-black' >Search book name , author edition...</h1>
          </div>
              <div className='flex items-center justify-between ' >
                  <Bell size={25} />
                  <div className='flex' >
                      <img src="" alt="user" />
                      <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => signOut()} className="bg-red-500 p-2 rounded-xl " >username </button>
                      
                  </div>
                  
              </div>
        </div>
         
          
          
      
    </div>
  )
}

export default Navbar
