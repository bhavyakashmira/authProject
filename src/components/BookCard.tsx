import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

type Books = {
  _id: string;
  slug: string;
  title: string;
};

function BookCard({dat}) {
  return (
    <Link href={`/books/${dat.slug}`} className='p-4 '  >
     
      <div>
        <Image
          className="object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80"
          src={dat.img} width={200} height={100}
          alt=""
        />
        <p className="mb-2 text-xl font-bold leading-none sm:text-2xl">
          {dat.title}
        </p>
        
      </div>
    </Link>
  )
}

export default BookCard
