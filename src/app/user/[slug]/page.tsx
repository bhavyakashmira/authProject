"use client"
import { ArrowBigLeft, Edit2, Link, Link2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { count } from 'console';
import { useSession } from 'next-auth/react';
import { Footer } from '@/components/Footer';
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import Posts from '@/components/Posts';

type user = {
  name: string;
  email: string;
  image: string;
  books: string[];
  username: string;
  bio: string;

};

interface pageProps  {
  params: {
    slug : String
  }
}

function page({ params }: pageProps) {
  const { slug } = params;
  const router = useRouter();
  const [user, setuser] = useState<user>();
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUseremail] = useState();
  const [coverImg, setCoverImg] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [feedType, setFeedType] = useState("posts");
  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);
  
  const session = useSession();

  useEffect(() => {
    const getData = async () => {
      
      try {
        const res = await fetch(`/api/user/${slug}`);
        
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




  




  
  const handleImgChange = (e:any, state:any) => {
    // const file = e.target.files[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     state === "coverImg" && setCoverImg(reader.result);
    //     state === "profileImg" && setProfileImg(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // }
  };


  


  return (
    <div className='flex-[4_4_0]  border-r border-gray-700 min-h-screen '>
      
    
     
      <div className='flex flex-col'>

        {user ?
     
          <>
            <div className='flex gap-10 px-4 py-2 items-center'>
              <Link to='/'>
                <ArrowBigLeft className='w-4 h-4' />
              </Link>
              <div className='flex flex-col'>
                <p className='font-bold text-lg'>{user?.name}</p>
                <span className='text-sm text-slate-500'> {user?.books?.length}  works</span>
              </div>
            </div>
            {/* COVER IMG */}
            <div className='relative group/cover'>
              <img
                src={"/cover.png"}
                className='h-52 w-full object-cover'
                alt='cover image'
              />
              {(session?.data?.user?.email === user.email) && coverImgRef.current &&  (
                <div
                  className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                  onClick={() => coverImgRef.current.click()}
                > 
                  <Edit2 className='w-5 h-5 text-white' />
                </div>
              )}

              <input
                type='file'
                hidden
                ref={coverImgRef}
                onChange={(e) => handleImgChange(e, "coverImg")}
              />
              <input
                type='file'
                hidden
                ref={profileImgRef}
                onChange={(e) => handleImgChange(e, "profileImg")}
              />
            
              <div className='avatar absolute -bottom-16 left-4'>
                <div className='w-32 rounded-full relative group/avatar'>
                  <img src={"/avatar-placeholder.png"} />
                  <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                     {(session?.data?.user?.email === user.email) && (
                      <Edit2
                        className='w-4 h-4 text-white'
                        onClick={() => profileImgRef.current.click()}
                      />
                    )} 
                  </div>
                </div>
              </div>
            </div>
         

            <div className='flex flex-col gap-4 mt-14 px-4'>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user?.name}</span>
                <span className='text-sm text-slate-500'>{user?.username}</span>
                <span className='text-sm my-1'>{user?.bio}</span>
              </div>
           
              {/*   ADD FOLLOWING FEATURES
              
              <div className='flex gap-2'>
                <div className='flex gap-1 items-center'>
                  <span className='font-bold text-xs'>{user?.following?.length  || 0}</span>
                  <span className='text-slate-500 text-xs'>Following</span>
                </div>
                <div className='flex gap-1 items-center'>
                  <span className='font-bold text-xs'> {user?.followers?.length  || '0'}</span>
                  <span className='text-slate-500 text-xs'>Followers</span>
                </div>
              </div> */}
            </div>
     

            <div className='p-10' > 
              
              <Posts books={user?.books} />
          </div>
          
     
            <Footer />
           
          </> :
          <>NO user</>
        }
     

        
      </div>
    </div>
  )
}

export default page
