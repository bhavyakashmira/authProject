"use client"
import { useRouter } from 'next/navigation';
import { Book, Bookmark, BookMarked, Eye, Heart, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ChapterCont from '@/subcomponents/ChapterCont';
import { useSession } from 'next-auth/react';
import { useAppContext } from '@/context';
import formatTimestamp from '@/helper-function/dateformater';

type Book = {
    id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
    createdAt: string;
    user?: {
        email: string;
        name: string;
        image: string;
    };
    bookmarks: BookMark[];
    likedBooks: LikedBook[];
    chapters: Chapter[];
};
type BookMark = {
    userId: string;
}

type LikedBook = {
    userId: string;
}

type Chapter = {
    bookSlug: string,
    id: string;
    img: string,
    slug: string,
    story: string,
    title: string,
    views: string,
    description: string,
    createdAt: string
}

interface BookPageProps {
    params: {
        slug: string;
    };
}

const Page: React.FC<BookPageProps> = ({ params }) => {
    const { email } = useAppContext();
    const { userId } = useAppContext();
    const { slug } = params;
    const router = useRouter();
    const [data, setData] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`/api/books/${slug}`, {
                    cache: 'no-store',
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await res.json();
                setData(result.post);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        getData();
    }, [slug]); 
      
    
    

    const handleLike = async (id: String) => {
        console.log(id , userId);
        
        try {
            const res = await fetch("/api/book/like", {
                method: "POST",
                body: JSON.stringify({bookId:id , userId})
            })

            if (!res.ok) {
                throw new Error('Failed to like book');
            }

            
        } catch (error: any) {
            
            console.log(error);
            
            
        }

    }
    const handleBookmark = async (id: String) => {
        console.log(id, userId);

        try {
            const res = await fetch("/api/book/bookmark", {
                method: "POST",
                body: JSON.stringify({ bookId: id, userId })
            })

            if (!res.ok) {
                throw new Error('Failed to like book');
            }


        } catch (error: any) {

            console.log(error);


        }

    }

    const handleDelete = async (id: String) => {
        try {
            const res = await fetch("/api/books", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error('Failed to delete book');
            }


            
        } catch (error) {
            console.log(error);
            
        }
    }


    if (error) {
        return <div>Error: {error}</div>;
    }

    
    
    
    return (
        <div className='' >
            {data ? <> 
                
                <div className='grid md:grid-cols-2 p-5 items-center mr-10 ml-10  ' >
                <div>
                    <Image className=' shadow-xl' src={data.img} width={300} height={500} alt="" />
                    </div>
                    <div>
                        <div className=" flow-root ">
                            <dl className="my-3 divide-y divide-gray-100 text-sm">
                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Book Name</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{data.title}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Author</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{data.user?.name}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Book Description</dt>
                                    <dd className="text-gray-700 sm:col-span-2">
                                       {data.desc}
                                    </dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">created At</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{
                                        formatTimestamp(data.createdAt) }</dd>
                                </div>
                                <div className="grid grid-cols-2 m-2 items-center ">
                               
                                    <div className="flex">
                                      
                                        {data.bookmarks && data.bookmarks.some((book) => book.userId === userId) ? (
                                            <>
                                                <Bookmark fill='brown' onClick={() => handleBookmark(data.id)} />
                                              
                                            </>
                                        ) : (
                                                <>
                                                 
                                                    <Bookmark onClick={() => handleBookmark(data.id)} />
                                                </>
                                          
                                        )}

                                        
                                        {data.likedBooks && data.likedBooks.some((likedBook) => likedBook.userId === userId) ? (
                                            <>
                                                <Heart fill='red' onClick={() => handleLike(data.id)} />
                             
                                            </>
                                        ) : (
                                            <Heart onClick={() => handleLike(data.id)} />
                                        )}
                                    </div>


                                    
                                </div>
                            </dl>
                        </div>
                    </div>
              

                    <div>
                        {data?.user?.email === email  &&
                            (
                            <div className='flex' >
                                <button className='bg-black text-white p-2'
                                    onClick={() => router.push(`/write/${slug}`)}
                                >add chapter</button>
                                <Trash2Icon size={30}  onClick={()=>handleDelete(data.id)} />
                            
                            </div> 
                            )}
                    </div>
                </div>
                <div className='p-2' >
                    <h1 className='text-3xl font-bold' >chapters {data.chapters.length} </h1>
                    {data.chapters.map((dat, ind) =>
                        <ChapterCont data={dat} slug={slug} userEmail ={data?.user?.email || ''}  email={email || ''}  />
                    )}
                </div>

                <div className='min-h-[100px]' >
                    
                </div>

               
            </> :
                
                <div>
                    <div className="flex flex-col items-center p-8">
                        <p className="w-32 h-32 bg-gray-200 rounded-full dark:bg-gray-700 ring-4 ring-gray-300 dark:ring-gray-600"></p>
                        <h1 className="w-40 h-2 mx-auto mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>

                        <p className="w-32 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>

                        <p className="w-56 h-2 mx-auto mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                    </div>
                    <div className='grid md:grid-cols-3' >
                        <div className="w-full max-w-md mx-auto animate-pulse p-9">
                            <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>

                            <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        </div>
                        <div className="w-full max-w-md mx-auto animate-pulse p-9">
                            <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>

                            <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        </div>
                        <div className="w-full max-w-md mx-auto animate-pulse p-9">
                            <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600"></h1>

                            <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                            <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
                        </div>
                 </div>
                
              </div>
            }
        </div>
    );
};

export default Page;
