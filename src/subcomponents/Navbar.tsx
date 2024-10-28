import { Bell, Pen, PenBoxIcon, Search } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface NavbarProps {
    name: string,
    image?: string,
    email :string
}



function Navbar() {
    const session = useSession();
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(session?.data?.user);
    }, [session])

    const router = useRouter();
    
    
    const [search, setSearch] = useState("");

    return (
        <div className='p-2'>
            <div className='flex  flex-row justify-between items-center gap-4'>

                {/* Search Bar */}
                <div className='flex items-center bg-gray-300 rounded-xl p-2 w-full md:w-1/2 lg:w-1/3'>
                    <Search size={25} className='text-gray-500' />
                    <input
                        placeholder="Search book name"
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-transparent w-full outline-none pl-2'
                    />
                </div>

                {/* User and Action Buttons */}
                <div className='flex items-center gap-4'>
                    {user ? (
                        <div className='flex items-center gap-4'>
                            <PenBoxIcon onClick={() => router.push('/publish')} size={30} className="cursor-pointer" />
                            <Image height={50} width={50} className='rounded-full' src={user?.image} alt="user" />
                            <Bell size={30} className="cursor-pointer" />
                        </div>
                    ) : (
                        <button
                            onClick={(e) => router.push('/login')}
                            className="bg-red-500 p-2 rounded-lg text-white"
                        >
                            {user?.name ? user.name[0] : "Login"}
                        </button>
                    )}
                </div>
            </div>
        </div>

    //   <div className='p-2 '>
    //       <div className='flex justify-between ' >
    //       <div className='flex  items-center bg-gray-300 rounded-xl p-2 ' > 
    //           <Search size={25} className='' />
    //           <input   placeholder="Search book name " onChange={(e)=>setSearch(e.target.value)}  />
    //           </div>
              
    //           <div className='flex items-center justify-between gap-4 ' >
            
    //               <div className='flex' >
    //                   {user ?
    //                       < div className='items-center flex gap-5' >
    //                           <PenBoxIcon onClick={()=>router.push('/publish')} size={30} />
                      
    //                           <Image height={50} width={50} className='rounded-full' src={user?.image} alt="user" />
                              
    //                           <Bell size={30} />
                          
    //                       </div>:

    //                       <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => router.push('/login')} className="bg-red-500 p-2  rounded-lg " >{user?.name ? user.name[0] : "login"} </button>
    //                   }
    //               </div>
                  
                  
    //           </div>
    //     </div>
         
          
          
      
    // </div>
  )
}

export default Navbar
