"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Comments from '@/components/Comments';
import formatTimestamp from '@/helper-function/dateformater';
import { useAppContext } from '@/context';
import NotloggedIn from '@/components/NotloggedIn';

interface ChapterProp {
  params: {
    chapter: string
  };
}

type Chapter = {
  bookSlug: string,
  id: string; 
  img: string,
  slug : string,
  story:string , 
  title: string,
  views: string,
  description: string,
  createdAt : string
}


function page({ params }:ChapterProp) {
  
  const { chapter } = params;
  
  const router = useRouter();
  const [Chapter, setChapter] = useState<Chapter>();
  const [error, setError] = useState<string | null>(null);
  const { email } = useAppContext();

  

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/chapters/${chapter}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setChapter(result);
      } catch (error) {
        setError((error as Error).message);
      }
    };

    getData();
  }, []); 


   



      

  return (
    <div>
      {
        email ?
      

          <>
            {Chapter ?
              <>
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0  bg-opacity-50 z-10"></div>
                  <div className="relative z-20 py-16 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-center text-black">{Chapter?.title}</h1>
                    <div className="mt-8">
                      {Chapter.img && (
                        <img
                          src={Chapter.img}
                          alt=""
                          className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                      )}
                      <div className="mt-4">
                        <h2 className="font-bold text-black">{formatTimestamp(Chapter.createdAt)}</h2>
                        <p className="">{Chapter.description}</p>
                        <div className="prose prose-invert text-black mt-8" dangerouslySetInnerHTML={{ __html: Chapter.story }} />
                      </div>
                    </div>
                  </div>
                </div>
                <Comments chapterSlug={Chapter.slug} />
              </> :
            
              <div className="flex items-center justify-center h-screen">
              
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
                  <h2 className="text-2xl font-bold text-white mb-4">No Chapter Found</h2>
                  <p className="text-gray-400 mb-6">It seems there is no chapter available at the moment.</p>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Go Back
                  </button>
                </div>
              </div>
            }
          </>
          :
          <NotloggedIn/>

    } 
        

      
          
   
      
      
    </div>
  )
}

export default page;
