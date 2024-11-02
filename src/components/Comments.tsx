"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { Delete, DeleteIcon, Trash } from 'lucide-react'
import formatTimestamp from '@/helper-function/dateformater'
import { useAppContext } from '@/context';
import { useRouter } from 'next/navigation'

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
        email: string;
        username: string;
    };
}



function Comments({ chapterSlug }:commentsProps) {
    const { status } = useSession();
    const { email } = useAppContext();
    const { data, mutate, isLoading } = useSWR<Comment[]>(`/api/comments?chapterSlug=${chapterSlug}`, fetcher)
    const [desc, setDesc] = useState("");
    const router = useRouter();


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
      <div className="bg-gray-300 rounded-lg shadow-md p-6 mb-10">
          <div className="mb-4">
              {status === "authenticated" ? (
                  <div className="flex flex-col md:flex-row items-start gap-2">
                      <textarea
                          placeholder="Write a comment..."
                          onChange={(e) => setDesc(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                      <button
                          className="bg-red-700 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition"
                          onClick={handleSubmit}
                      >
                          Send
                      </button>
                  </div>
              ) : (
                  <Link href="/login" className="text-red-700 font-semibold">
                      Login to write a comment
                  </Link>
              )}
          </div>

          <h1 className="text-xl font-bold mb-2">Comments</h1>
          <div>
              {isLoading ? (
                  <p className="text-gray-500">Loading comments...</p>
              ) : (
                  data?.map((item) => (
                      <div key={item.id} className="flex items-start p-4 border-b border-gray-200">
                          {item?.user?.image && (
                              <Image
                                  width={50}
                                  height={50}
                                  alt="User Avatar"
                                  className="rounded-full mr-3"
                                  src={item.user.image}
                              />
                          )}
                          <div className="flex-1">
                              <div className="flex items-center justify-between">
                                  <Link href={`/user/${item.user.username}`}  className="font-bold text-gray-800">{item.user.username}</Link>
                                  <span className="text-gray-500 text-sm ">{formatTimestamp(item.createdAt)}</span>
                              </div>
                              <p className="mt-1 text-gray-700">{item.desc}</p>
                          </div>
                          { (email===item.user.email) && 
                              (<Trash
                                  size={20}
                                  className="text-red-500 cursor-pointer hover:opacity-75 ml-4"
                                  onClick={() => deleteComment(item.id)}
                              />)
                          }
                      </div>
                  ))
              )}
          </div>
      </div>

      
    
  )
}

export default Comments
