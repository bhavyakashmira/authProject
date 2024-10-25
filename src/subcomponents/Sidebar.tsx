"use client"
import { AlarmCheck, Album, House, Link, LogOut, User } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

function Sidebar() {
  
  const router = useRouter();
    
  return (
      <div className=' w-15  '>
          
          <div className='sticky top-0 p-3 left-0 h-screen  flex flex-col justify-around  border-r border-gray-700 w-20 md:w-full  ' >
               
          <div className=''>
              <LogOut  onClick={()=>router.push("/login")}  className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
          </div>
        
          <div className=''>
              <ul className='flex flex-col gap-3 mt-4'>
                  <li className='flex justify-center md:justify-start' >
                      <Album onClick={()=>router.push('/books')} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                  </li>
                  <li className='flex justify-center md:justify-start'>
                      <House onClick={()=>router.push('/')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                          
                      
                  </li>
                  <li className='flex justify-center md:justify-start'>
                    
                      <AlarmCheck size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                  </li>

                  <li className='flex justify-center md:justify-start'>
                     
                      <User onClick={()=>router.push('/user')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                         
                      </li>
                      <li className='flex justify-center md:justify-start'>
                          <LogOut onClick={()=>signOut()} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                    </li>
              </ul>
             
              </div>
            
            </div>
      </div>
  )
}

export default Sidebar
