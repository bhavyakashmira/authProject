import BookList from '@/components/BookList';
import React from 'react'

interface blogpageProp {
  searchParams: {
    page?: string,
    cat : string
  };
}

function page({searchParams}:blogpageProp) {

  const page = parseInt(searchParams.page || '1', 10);
  const { cat } = searchParams;

  return (
    <div className='' >
      <div>blog</div>
      <BookList page={page}  cat={cat} />

      
    </div>
  )
}

export default page
