"use client"
import Navbar from '@/subcomponents/Navbar';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import BookCard from '@/components/BookCard';


type user = {
     name: string;
    email: string;
    image: string;
    books: string[]
};

function page() {
    const router = useRouter();
    const [user, setuser] = useState<user>();
    const [error, setError] = useState<string | null>(null);
    const [userEmail, setUseremail] = useState();
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`/api/user`);
                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }
                const total = await res.json();
                const result = total
                setuser(result.user);
                setUseremail(result.user.email);
            } catch (error) {
                setError((error as Error).message);
            }
        };
        getData();
    }, [])

    




    
  return (
      <div className='text-black bg-red-400' >
          
          {user ?
              <>
                  <Navbar />
                
                 

                  <Image src={user?.image} alt="hello" height={50} width={50} />
                  <h1>{user?.name}</h1>
                  <h2>{user?.email}</h2>
                  <div className='grid grid-cols-3' >
                      {user.books.map((dat) => (
                      
                          <BookCard dat={dat} />
                      
                  ))}
                  </div>
                  <Footer/>
              
                  
              </>
              :

              <>
                  
                  not logged in
              </>

          }

          
    </div>
  )
}

export default page
