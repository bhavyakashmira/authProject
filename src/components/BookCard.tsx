import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

type Books = {
  _id: string;
  slug: string;
  title: string;
  img: string;
};

function BookCard({ dat }: { dat: Books } ) {
  return (

    <>
    <Link href={`/books/${dat.slug}`} className=' w-full sm:w-1/2 lg:w-1/3 group'>
      <div className='rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 border border-transparent hover:border-primary'>
        <div className='relative'>
          <Image
            className="object-cover w-full h-40 sm:h-56 md:h-64 xl:h-80 rounded-t-lg"
            src={dat.img}
            width={200}
            height={100}
            alt={dat.title || 'Book Image'}
          />
          <div className='absolute inset-0 bg-black bg-opacity-25 group-hover:bg-opacity-40 transition-all duration-300' />
        </div>

        <div className='p-4 bg-white rounded-b-lg'>
          <p className="mt-2 mb-2 text-lg sm:text-xl md:text-2xl font-semibold leading-tight text-gray-800 group-hover:text-primary transition-colors duration-200">
            {dat.title}
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-snug group-hover:text-gray-800 transition-colors duration-200">
            {  'A captivating read.'}
          </p>
        </div>
      </div>
    </Link>

      

      </>


  )
}

export default BookCard
