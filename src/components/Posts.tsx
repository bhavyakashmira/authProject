// import React from 'react'
// import Image from 'next/image';
// import Link from 'next/link';


// type Books = {
//     _id: string;
//     slug: string;
//     title: string;
//     img: string;
//     desc: string;
// };

// function Posts( books :Books[]) {
 
//   return (
//       <div>
//           <h1 className='text-3xl font-bold ' > BOOKS</h1>
//           <div className='grid grid-cols-4' >
            
//           {books.map((data, ind)=>(
//               <Link href={`/books/${data.slug}`}   className="flex p-4 bg-pink-300 transition hover:shadow-xl">
//                       <div className="hidden sm:block sm:basis-56">
//                           <Image
//                               alt=""
//                               src={data.img} width={100} height={100}
//                               className="aspect-square h-full w-full object-cover"
//                           />
//                       </div>

//                       <div className="flex flex-1 flex-col justify-between">
//                           <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
//                               <a href="#">
//                                   <h3 className="font-bold uppercase text-gray-900">
//                                      {data.title}
//                                   </h3>
//                               </a>

//                               <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
//                                 {data.desc}
//                               </p>
//                           </div>

//                           <div className="sm:flex sm:items-end sm:justify-end">
//                               <a
//                                   href="#"
//                                   className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
//                               >
//                                   Read Book
//                               </a>
//                           </div>
//                       </div>
//                   </Link>
        
//           ))
              
//           }
//           </div>
//       </div>
//   )
// }

// export default Posts

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Books = {
    _id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
};

function Posts({ books }: { books: Books[] }) {
    return (
        <div className="p-6 md:p-8  ">
            <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">BOOKS</h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {books.map((data) => (
                    <Link
                        href={`/books/${data.slug}`}
                        key={data._id}
                        className="flex flex-col bg-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
                    >
                       
                        <div className="relative overflow-hidden rounded-t-lg">
                            <Image
                                alt={data.title}
                                src={data.img}
                                width={250}
                                height={250}
                                className="w-full h-56 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </div>

                        {/* Book Info */}
                        <div className="flex flex-col justify-between flex-1 p-4">
                            <h3 className="text-lg font-semibold text-gray-800 uppercase mb-2 line-clamp-2">
                                {data.title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                {data.desc}
                            </p>

                            {/* Read Book Button */}
                            <div className="mt-auto">
                                <a
                                    href="#"
                                    className="block bg-yellow-300 text-center py-2 px-3 text-sm font-bold text-gray-900 rounded transition duration-200 hover:bg-yellow-400"
                                >
                                    Read Book
                                </a>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    );
}

export default Posts;
