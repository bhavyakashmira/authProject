"use client"
import { AlarmCheck, Album, House, Link, LogOut, User } from 'lucide-react';
import React from 'react'
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

function Sidebar() {
  
  const router = useRouter();
    
    return (
        <div className='md:w-15'>
            <div className=' bg-white items-center p-3 md:sticky md:top-0 md:left-0 md:h-screen flex md:flex-col justify-around border-t md:border-r border-gray-700 w-full md:w-auto fixed bottom-0 left-0'>

                {/* Logout button - Only visible on desktop */}
                <div className='hidden md:block'>
                    <LogOut onClick={() => router.push("/login")} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                </div>

                {/* Sidebar icons */}
                <div className='flex md:flex-col justify-center gap-3'>
                    <ul className='flex md:flex-col gap-3'>
                        <li className='flex justify-center md:justify-start'>
                            <Album onClick={() => router.push('/books')} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                        </li>
                        <li className='flex justify-center md:justify-start'>
                            <House onClick={() => router.push('/')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                        </li>
                        <li className='flex justify-center md:justify-start'>
                            <AlarmCheck size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                        </li>
                        <li className='flex justify-center md:justify-start'>
                            <User onClick={() => router.push('/user')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                        </li>
                        <li className='flex justify-center md:justify-start'>
                            <LogOut onClick={() => signOut()} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    //   <div className=' md:w-15 '>
          
    //       <div className='items-center md:sticky md:top-0 p-3 md:left-0 md:h-screen  flex  md:flex-col justify-around border-t md:border-r border-gray-700 w-20 md:w-full  ' >
               
    //       <div className='hidden md:block'>
    //           <LogOut  onClick={()=>router.push("/login")}  className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
    //       </div>
        
    //       <div className=' flex justify-center '>
    //           <ul className='flex md:flex-col gap-3 mt-4'>
    //               <li className='flex justify-center md:justify-start' >
    //                   <Album onClick={()=>router.push('/books')} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
    //               </li>
    //               <li className='flex justify-center md:justify-start'>
    //                   <House onClick={()=>router.push('/')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                          
                      
    //               </li>
    //               <li className='flex justify-center md:justify-start'>
                    
    //                   <AlarmCheck size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
    //               </li>

    //               <li className='flex justify-center md:justify-start'>
                     
    //                   <User onClick={()=>router.push('/user')} size={25} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
                         
    //                   </li>
    //                   <li className='flex justify-center md:justify-start'>
    //                       <LogOut onClick={()=>signOut()} className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500' />
    //                 </li>
    //           </ul>
             
    //           </div>
            
    //         </div>
    //   </div>
  )
}

export default Sidebar
