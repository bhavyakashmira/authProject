"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Comments from '@/components/Comments';
import formatTimestamp from '@/helper-function/dateformater';

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

  console.log(Chapter);
  

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
      {Chapter ?
        <>
          <h1 className='text-3xl  font-bold flex justify-center p-1'>{Chapter?.title}</h1>
          <div className='grid grid-cols-3' >
            <div>
          
            </div>
            <div>
        
          <h2>{formatTimestamp(Chapter.createdAt)}</h2>
          <p>{Chapter.description}</p>
          <div className='p-10'  dangerouslySetInnerHTML={{ __html: Chapter.story }} />
          {Chapter.img && <Image width={100} height={100} src={Chapter.img} alt="" />
            }
            
            </div>
            <div>

            </div>
          </div>
          <Comments chapterSlug={Chapter.slug}  />
        </> :
        <div>NO chapter found </div>
    }
          
   
      
      
    </div>
  )
}

export default page;
