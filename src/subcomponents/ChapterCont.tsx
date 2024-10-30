import formatTimestamp from '@/helper-function/dateformater';
import { Trash2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

interface ChapterContProps{
    slug: String,
    email: String,
    data: data,
    userEmail : String
}

type data = {
    id: string ,
    title: string, 
    description: string, 
    createdAt: string, 
    slug :string
}

function ChapterCont({ data, slug , email , userEmail }:ChapterContProps) {


const handleDelete = async (id: String) => {
         console.log(id);
        try {

            const res = await fetch("/api/chapters", {
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
    const router = useRouter();
    return (

  
            <div className=" border-t border-b divide-y  ">
                <div className="grid py-3 sm:grid-cols-4 items-center">
                    <div className="mb-4 sm:mb-0">
                      
                    <h1>{formatTimestamp(data.createdAt)}</h1>
                    </div>
                    <div className="sm:col-span-3 lg:col-span-2">
                        <div className="mb-3">
                            <div
                               
                                aria-label="Article"
                                className="inline-block text-black transition-colors duration-200 hover:text-deep-purple-accent-700"
                            >
                                <p className="text-3xl font-extrabold leading-none sm:text-4xl xl:text-4xl">
                                  {data.title}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-700">
                           {data.description}
                        </p>
                    </div>
                <div className='flex items-center' >
                    
                    <button className='bg-black text-white p-2' onClick={() => router.push(`/books/${slug}/${data.slug}`)} >Read Now </button>

                    {(email === userEmail) &&
                        (<>
                        <Trash2Icon size={30} onClick={() => handleDelete(data.id)} />
                    
                        
                    </>
                        )
                    }
                    </div>
                </div>
             
            </div>
   
    );
};

export default ChapterCont
