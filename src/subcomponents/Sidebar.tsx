"use client"
import { AlarmCheck, Album, House, Link, LogOut, User } from 'lucide-react';
import React , {useState , useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useAppContext } from '@/context';


type User = {
    name: string;
    email: string;
    image: string;
    books: Books[];
    username: string;
    profileImg: string;
    coverImg: string;
    bio: string;
};

type Books = {
    _id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
};


function Sidebar() {
  
    const router = useRouter();
    const { username } = useAppContext();
    const isActive = (path: string) => "/" === path;
    

    return (
      
        <div className='bg-white items-center p-3 md:fixed md:top-0 md:left-0 md:h-screen flex md:flex-col justify-around border-t border-gray-700 w-full md:w-auto fixed bottom-0 left-0 z-50'>
            <div className='flex md:flex-col justify-center gap-3'>
                <ul className='flex md:flex-col gap-3'>
                    <li className='flex justify-center md:justify-start'>
                        <House
                            onClick={() => router.push('/')}
                            size={25}
                            className={`px-2 w-12 h-12 rounded-full fill-white ${isActive('/') ? 'bg-red-500' : 'hover:bg-red-500'}`}
                        />
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <Album
                            onClick={() => router.push('/books')}
                            className={`px-2 w-12 h-12 rounded-full fill-white ${isActive('/books') ? 'bg-red-500' : 'hover:bg-red-500'}`}
                        />
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <AlarmCheck
                            size={25}
                            className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500'
                        />
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <User
                            onClick={() => router.push(`/user/${username}`)}
                            size={25}
                            className={`px-2 w-12 h-12 rounded-full fill-white ${isActive(`/user/${username}`) ? 'bg-red-500' : 'hover:bg-red-500'}`}
                        />
                    </li>
                    <li className='flex justify-center md:justify-start'>
                        <LogOut
                            onClick={() => signOut()}
                            className='px-2 w-12 h-12 rounded-full fill-white hover:bg-red-500'
                        />
                    </li>
                </ul>
            </div>
        </div>
        



    
  )
}

export default Sidebar
