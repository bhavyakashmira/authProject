"use client"
import { useRouter } from 'next/navigation';
import { Book, Bookmark, BookMarked, Eye, Heart, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import ChapterCont from '@/subcomponents/ChapterCont';
import { useSession } from 'next-auth/react';

type Book = {
    id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
    user?: {
        email: string;
        name: string;
        image: string;
    };
    chapters: Chapter[];
};

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

    const session = useSession();
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
                throw new Error('Failed to delete comment');
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
                
                <div className='grid grid-cols-2 p-5 items-center mr-10 ml-10  ' >
                <div>
                    <Image className=' shadow-xl' src={data.img} width={300} height={500} alt="" />
                </div>
                    <div>
                        <p className='text-xl font-bold' >{data.title}</p>
                        <h1> by <span className='text-xl font-bold' >{data.user?.name}</span> </h1>
                        <p>{data.desc}</p>
                        <div className='flex items-center gap-2' > 
                            <button className='bg-black p-2 m-2 text-white rounded-xl' >start reading</button>
                            <Bookmark />
                            <Heart />
                            <Eye />
                        </div>
                        
                    </div>

                    <div>
                        {data?.user?.email === session.data?.user?.email  &&
                            (
                            <>
                                <button className='bg-black text-white p-2'
                                    onClick={() => router.push(`/write/${slug}`)}
                                >add chapter</button>
                                <Trash2Icon size={30}  onClick={()=>handleDelete(data.id)} />
                            
                            </> 
                            )}
                    </div>
                </div>
                <div className='p-2' >
                    <h1 className='text-3xl font-bold' >chapters {data.chapters.length} </h1>
                    {data.chapters.map((dat, ind) =>
                        <ChapterCont data={dat} slug={slug} userEmail ={data?.user?.email || ''}  email={session.data?.user?.email || ''}  />
                    )}
                </div>

               
                
               
            </> : <p>NO SUCH BOOK.</p>}
                
         
            
            
        </div>
    );
};

export default Page;
