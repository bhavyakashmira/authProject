"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Comments from '@/components/Comments';

interface ChapterProp {
  params: {
    chapter: String
  };
}

type Chapter = {
  bookSlug: String,
  id:String , 
  img: String,
  slug : String,
  story:String , 
  title: String

}


function page({ params }:ChapterProp) {
  
  const { chapter } = params;
  
  const router = useRouter();
  const [Chapter, setChapter] = useState<Chapter>();
  const [error, setError] = useState<string | null>(null);


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
          <h2>{Chapter.views}</h2>
          <h2>{Chapter.createdAt}</h2>
          <p>{Chapter.description}</p>
          <p>{Chapter.story}</p>
          <Image width={100} height={100} src={Chapter.img} alt="" />
  
          <Comments chapterSlug={Chapter.slug}  />
          

        </> :
        <div>NO chapter found </div>
    }
          
   
      
      
    </div>
  )
}

export default page
