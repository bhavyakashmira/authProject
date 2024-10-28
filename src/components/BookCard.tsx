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
    <Link href={`/books/${dat.slug}`} className='p-2 md:p-4 w-full sm:w-1/2 lg:w-1/3'>
      <div className='rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'>
     
        <Image
          className="object-cover w-full h-40 sm:h-66 md:h-64 xl:h-80 rounded"
          src={dat.img}
          width={200}
          height={100}
          alt={dat.title || 'Book Image'}
        />

      
        <p className="mt-4 mb-2 text-lg sm:text-xl md:text-2xl font-bold leading-none">
          {dat.title}
        </p>

      </div>
    </Link>

  )
}

export default BookCard
