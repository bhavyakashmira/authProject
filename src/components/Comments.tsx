"use client"
import { log } from 'console'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { Delete, DeleteIcon, Trash } from 'lucide-react'

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
    chapterSlug:string
}

interface Comment {
    id: string;
    desc: string;
    createdAt: string;
    user: {
        name: string;
        image: string;
    };
}



function Comments({ chapterSlug }:commentsProps) {
    const { status } = useSession();
    
    const { data, mutate, isLoading } = useSWR<Comment[]>(`http://localhost:3000/api/comments?chapterSlug=${chapterSlug}`, fetcher)
    const [desc, setDesc] = useState("");


    const handleSubmit = async () => {

        await fetch("/api/comments", {
            method: "POST",
            body: JSON.stringify({ desc, chapterSlug}),
        });
        mutate();
    };

    const deleteComment = async (id: String) => {

        console.log(id);
        
        try {
            const res = await fetch("/api/comments", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error('Failed to delete comment');
            }

           
            mutate();
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    }

   
       
   
  
  return (
      <div>
          <div className="">
              {status === "authenticated" ? (
                  <div className="bg-gray-400 p-10 items-center flex gap-2">
                      <textarea
                          placeholder="write a comment..."
                          onChange={(e) => setDesc(e.target.value)}
                      />
                      <button className="bg-red-700 rounded-xl p-2" onClick={handleSubmit}>
                          Send
                      </button>
                  </div>
              ) : (
                  <Link href="/login" className="">
                      Login to write a comment
                  </Link>
              )}

              <h1 className="text-xl font-bold p-1">Comments</h1>
              <div>
                  {isLoading
                      ? "loading"
                      : data?.map((item) => (
                          <div key={item.id}>
                              <div className="flex p-2 m-2">
                                  {item?.user?.image && (
                                      <Image
                                          width={50}
                                          height={50}
                                          alt="user"
                                          className="rounded-full"
                                          src={item.user.image}
                                      />
                                  )}
                                  <div>
                                      <div className="flex">
                                          <h1 className="font-bold">{item.user.name}</h1>
                                          <h1>{item.createdAt}</h1>
                                      </div>
                                      <p>{item.desc}</p>
                                  </div>
                                 
                                 
                                  <Trash size={20} onClick={() => deleteComment(item.id)} />
                              </div>
                          </div>
                      ))}
              </div>
          </div>
      </div>
      
    
  )
}

export default Comments
