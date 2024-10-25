import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
function Posts({books}) {
 console.log(books);
 
  return (
      <div>
          <h1 className='text-3xl font-bold ' > BOOKS</h1>
          <div className='grid grid-cols-4' >
            
          {books.map ((data, ind)=>(
              <Link href={`/books/${data.slug}`} className='p-4 '  className="flex bg-pink-300 transition hover:shadow-xl">
                      <div className="hidden sm:block sm:basis-56">
                          <Image
                              alt=""
                              src={data.img} width={100} height={100}
                              className="aspect-square h-full w-full object-cover"
                          />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                          <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                              <a href="#">
                                  <h3 className="font-bold uppercase text-gray-900">
                                     {data.title}
                                  </h3>
                              </a>

                              <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
                                {data.desc}
                              </p>
                          </div>

                          <div className="sm:flex sm:items-end sm:justify-end">
                              <a
                                  href="#"
                                  className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                              >
                                  Read Book
                              </a>
                          </div>
                      </div>
                  </Link>
        
          ))
              
          }
          </div>
      </div>
  )
}

export default Posts
