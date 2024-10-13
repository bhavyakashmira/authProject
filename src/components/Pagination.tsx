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
      <div className='  flex gap-10 justify-between p-1 ' >
      <button disabled={!hasprev} onClick={() => router.push(`?page=${page - 1}`)} >prev</button>
      
        <button disabled={!hasnext} onClick={()=>router.push(`?page=${page+1}`)} >next</button>
    </div>
  )
}

export default Pagination
