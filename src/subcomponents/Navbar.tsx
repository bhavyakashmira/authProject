import { Bell, PenBoxIcon, Search } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type User = {
    name?: string | null,
    image?: string | null,
    email?: string | null
};

function Navbar() {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (session?.user) {
            setUser({
                name: session.user.name ,
                email: session.user.email,
                image: session.user.image,
            });
        }
    }, [session]);

    const router = useRouter();
    const [search, setSearch] = useState("");

    console.log(search);

    useEffect
    

    return (
        <div className='p-2'>
            <div className='flex flex-row justify-between items-center gap-4'>

                <div className='flex items-center bg-gray-300 rounded-xl p-2 w-full md:w-1/2 lg:w-1/3'>
                    <Search size={25} className='text-gray-500' />

                    <input
                        placeholder="Search book name"
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-transparent w-full outline-none pl-2'
                    />
                </div>
                <div className='flex items-center gap-4'>
                    {user ? (
                        <div className='flex items-center gap-4'>
                            <PenBoxIcon onClick={() => router.push('/publish')} size={28} className="cursor-pointer" />
                            {user.image && (
                                <Image height={30} width={30} className='rounded-full' src={user.image} alt="user" />
                            )}
                            <Bell onClick={() => router.push('/notifications')} size={28} className="cursor-pointer" />
                        </div>
                    ) : (
                        <button
                            onClick={() => router.push('/login')}
                            className="bg-red-500 p-2 rounded-lg text-white"
                        >
                            {user ? user['name'][0] : "Login"}
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Navbar;
