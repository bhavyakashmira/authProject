"use client";
import { ArrowBigLeft, Edit2 } from 'lucide-react';
import React, { useState, useEffect,useRef , ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Footer } from '@/components/Footer';
import Posts from '@/components/Posts';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { useAppContext } from '@/context';


type User = {
  name: string;
  email: string;
  image: string;
  books: Books[];
  username: string;
  profileImg: string;
  coverImg: string;
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
  const [coverImg, setCoverImg] = useState<string | null>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cover, setCover] = useState(false);
  const [profile, setProfile] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const coverImgRef = useRef(null);
  const profileImgRef = useRef(null);



  const { email } = useAppContext();
  
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/user/${slug}`);
        if (!res.ok) throw new Error("Failed to fetch user data");
        const result = await res.json();
        setUser(result.user);
      } catch (error) {
        setError((error as Error).message);
      }
    };
    getData();
  }, [slug]);

  useEffect(() => {
    if (!file) return;

    const upload = async () => {
      try {
        setIsLoading(true);
        const storage = getStorage(app);
        const name = `${new Date().getTime()}_${file.name}`;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (uploadError) => {
            console.error("Error during upload:", uploadError);
            setError("Upload failed. Please try again.");
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              if (cover) setCoverImg(downloadURL);
              else if (profile) setProfileImg(downloadURL);
              setIsLoading(false);
            });
          }
        );
      } catch (error) {
        console.error("Error during file upload:", error);
        setError("File upload failed. Please try again.");
        setIsLoading(false);
      }
    };

    upload();
  }, [file]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/${user?.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ coverImg, profileImg }),
      });
      if (!res.ok) throw new Error("Failed to save changes");
      console.log("Changes saved successfully");
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Could not save changes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCover(true);
      setProfile(false);
      setFile(e.target.files[0]);
    }
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfile(true);
      setCover(false);
      setFile(e.target.files[0]);
    }
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

            <div className='relative group/cover'>
              <img src={coverImg || user.coverImg || "/cover.png"} className='h-52 w-full object-cover' alt='cover image' />
              {email === user.email && (

                <div className='absolute top-2 right-2 rounded-full p-2 bg-gray-800 bg-opacity-75 cursor-pointer opacity-0 group-hover/cover:opacity-100 transition duration-200'
                  onClick={() => coverImgRef.current.click()}
                >
                  <Edit2  />
          
                </div>
              )}

              <input
                type='file'
                hidden
                ref={coverImgRef}
                onChange={ handleCoverChange}
              />

              <input
                type='file'
                hidden
                ref={profileImgRef}
                onChange={handleProfileChange}
              />

              <div className='avatar absolute -bottom-16 left-4'>
                <div className='w-32 rounded-full relative group/avatar'>
                  <img src={profileImg || user.profileImg || "/avatar-placeholder.png"} alt="Profile avatar" />
                  {email === user.email && (
                    <div className='absolute top-5 right-3 p-1 bg-primary rounded-full group-hover/avatar:opacity-100 opacity-0 cursor-pointer'>
                      <Edit2
                        className='w-4 h-4 text-white'
                        onClick={() => profileImgRef.current.click()}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

    

            {error && <p className="text-red-500 mt-4">{error}</p>}

            <div className='flex flex-col gap-4 mt-14 px-4'>
              <div className='flex flex-col'>
                <span className='font-bold text-lg'>{user.name}</span>
                <span className='text-sm text-slate-500'>{user.username}</span>
                <span className='text-sm my-1'>{user.bio}</span>
              </div>
            </div>

            <div className='p-10'>
              <Posts books={user.books} />
            </div>

            <Footer />

           
          </>
        ) : (
          <p>No user found</p>
        )}
      </div>
    </div>
  );
}

export default Page;
