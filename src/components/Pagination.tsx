"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

interface PaginationProps{
    page: number,
    hasnext: boolean,
    hasprev : boolean
}

function Pagination({page  , hasnext , hasprev}:PaginationProps) {

  const router = useRouter();  

  return (
    <div className='flex gap-10 justify-center p-4'>
      <button
        disabled={!hasprev}
        onClick={() => router.push(`?page=${page - 1}`)}
        className={`px-4 py-2 text-white font-semibold rounded-lg transition 
        ${hasprev ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        aria-disabled={!hasprev}
      >
        Prev
      </button>

      <span className='self-center text-gray-600'>
        Page {page}
      </span>

      <button
        disabled={!hasnext}
        onClick={() => router.push(`?page=${page + 1}`)}
        className={`px-4 py-2 text-white font-semibold rounded-lg transition 
        ${hasnext ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
        aria-disabled={!hasnext}
      >
        Next
      </button>
    </div>

  )
}

export default Pagination
