"use client"
import { log } from 'console'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'

const fetcher = async (url:string) => {
    const res = await fetch(url)
    const data = res.json();

    if (!res.ok) {
        const error = new Error('error occured');
        throw error
    }
    return data || []
}

interface commentsProps{
    bookSlug:string
}

interface Comment {
    _id: string;
    desc: string;
    createdAt: string;
    user: {
        name: string;
        image: string;
    };
}

function Comments({bookSlug}:commentsProps) {
    const {status} =  useSession();
    const { data, mutate, isLoading } = useSWR<Comment[]>(`http://localhost:3000/api/comments?bookSlug=${bookSlug}`, fetcher)
  
    const [desc, setDesc] = useState("");

    const handleSubmit = async () => {
        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, bookSlug }),
        });
        mutate();
    };

    console.log(data);
    //fix this comment display
    
  return (
      <div>
          <div className="">
            
              {status === "authenticated" ? (
                  <div className='bg-black text-black ' >
                      <textarea
                          placeholder="write a comment..."
                          
                          onChange={(e) => setDesc(e.target.value)}
                      />
                      <button className='bg-red-700'  onClick={handleSubmit}>
                          Send
                      </button>
                  </div>
              ) : (
                      
                  <Link href="/login" className=''>Login to write a comment</Link>
              )}

              <h1 className="text-xl font-bold p-1">Comments</h1>
              <div >
                  {isLoading
                      ? "loading"
                      : data?.map((item) => (
                          <div  key={item._id}>
                              <div className=' flex p-2 m-2' >
                                  {item?.user?.image && (
                                     <Image width={50} height={50} alt='user' className='rounded-full ' src={item.user.image}  />
                                  )}
                                  <div>
                                      <div className='flex'>
                                          <h1 className='font-bold' >{item.user.name}</h1>
                                          <h1 >{item.createdAt}</h1>
                                      </div>
                                      <p>{item.desc}</p>
                                  </div>

                              </div>
                            
                          </div>
                      ))}
              </div>
          </div>


          
      </div>
      
    
  )
}

export default Comments
