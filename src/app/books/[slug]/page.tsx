"use client"
import Comments from '@/components/Comments';
import Navbar from '@/subcomponents/Navbar';
import { Bookmark, BookMarked, Eye, Heart } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

type Book = {
    _id: string;
    slug: string;
    title: string;
    user?: {
        name: string;
        image: string;
    };
};

interface BookPageProps {
    params: {
        slug: string;
    };
}

const Page: React.FC<BookPageProps> = ({ params }) => {
    const { slug } = params;
    const [data, setData] = useState<Book | null>(null);
    const [error, setError] = useState<string | null>(null);
   
    
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/books/${slug}`, {
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
    }, [slug]); // use slug as the dependency, not the page function


    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className='' >
            <Navbar/>
        
            {data ? <> 
                
                <div className='grid grid-cols-2 p-5 items-center mr-10 ml-10  ' >
                <div>
                    <Image className=' shadow-xl' src="https://d1b14unh5d6w7g.cloudfront.net/0007448031.01.S001.JUMBOXXX.jpg?Expires=1728810813&Signature=NHIvs4vYlU09E14tqShMBrNTjl435LAqmmmGJKTR~rnOxmeyUP2gpG6wdMcc48whcCfqFNEWAROwKWyK6s7jp6uvZDG~2l61uhI6X0culw~ZuH0VPuewu1X2WtfMnnWz7N1Z2RPAkO5STLEk30SwR-qmxHfJiRqLt0hxaBfzNcE_&Key-Pair-Id=APKAIUO27P366FGALUMQ" width={300} height={500} alt="" />
                </div>
                    <div>
                        <p className='text-xl font-bold' >{data.title}</p>
                        <h1> by <span className='text-xl font-bold' >{data.user?.name}</span> </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error eligendi culpa porro quod sunt. Quaerat vitae quisquam dolor consequuntur quis, animi, nulla, optio sed nemo molestiae laborum voluptate! Cupiditate, aspernatur.</p>
                        <div className='flex items-center gap-2' > 
                            <button className='bg-black p-2 m-2 text-white rounded-xl' >start reading</button>
                            <Bookmark />
                            <Heart />
                            <Eye />
                        </div>
                        
                    </div>
                </div>
                
               
            </> : <p>Loading...</p>}

            <Comments bookSlug={slug} />
            
            
        </div>
    );
};

export default Page;
