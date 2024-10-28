"use client";
import { ArrowBigLeft, Edit2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, SessionContextValue } from 'next-auth/react';
import { Footer } from '@/components/Footer';
import BookCard from '@/components/BookCard';
import Image from 'next/image';
import Posts from '@/components/Posts';


type User = {
  name: string;
  email: string;
  image: string;
  books: Books[];
  username: string;
  bio: string;
};

type Books = {
  _id: string;
  slug: string;
  title: string;
  img: string;
  desc: string;
};

interface PageProps {
  params: {
    slug: string;
  };
}


function Page({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [feedType, setFeedType] = useState<string>("posts");
  const coverImgRef = useRef<HTMLInputElement | null>(null);
  const profileImgRef = useRef<HTMLInputElement | null>(null);

  const session: SessionContextValue = useSession();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user/${slug}`);
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await res.json();
        setUser(result.user);
        setUserEmail(result.user.email);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    getData();
  }, [slug]);

  const handleImgChange = (e: ChangeEvent<HTMLInputElement>, state: "coverImg" | "profileImg") => {
    // const file = e.target.files?.[0];
    // if (file) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     if (state === "coverImg") {
    //       setCoverImg(reader.result as string);
    //     } else if (state === "profileImg") {
    //       setProfileImg(reader.result as string);
    //     }
    //   };
    //   reader.readAsDataURL(file);
    // }
  };

  return (
    <div className='flex-[4_4_0] border-r border-gray-700 min-h-screen'>
      <div className='flex flex-col'>
        {user ? (
          <>
            <div className='flex gap-10 px-4 py-2 items-center'>
              <button onClick={() => router.push('/')}>
                <ArrowBigLeft className='w-4 h-4' />
              </button>
              <div className='flex flex-col'>
                <p className='font-bold text-lg'>{user.name}</p>
                <span className='text-sm text-slate-500'>{user.books.length} works</span>
              </div>
            </div>

            {/* COVER IMG */}
            <div className='relative group/cover'>
              <img src={coverImg || "/cover.png"} className='h-52 w-full object-cover' alt='cover image' />
              {session?.data?.user?.email === user.email && (
                <div
                  className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                  onClick={() => coverImgRef.current?.click()}
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
                  <img src={profileImg || "/avatar-placeholder.png"} alt="Profile avatar" />
                  {session?.data?.user?.email === user.email && (
                    <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                      <Edit2
                        className='w-4 h-4 text-white'
                        onClick={() => profileImgRef.current?.click()}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-4 mt-14 px-4'>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.name}</span>
                <span className='text-sm text-slate-500'>{user.username}</span>
                <span className='text-sm my-1'>{user.bio}</span>
              </div>
            </div>
           
            ( {user.books} && (
            <div className='p-10'>
              <Posts books={ user.books }  />
            </div>)
            )
            
            <Footer />
          </>
        ) : (
          <>No user found</>
        )}
      </div>
    </div>
  );
}

export default Page;
