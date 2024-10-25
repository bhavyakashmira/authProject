'use client'
import BookList from '@/components/BookList';
import Navbar from '@/subcomponents/Navbar';
import { CategroyBooks } from '@/components/CategoryBooks';
import React from 'react'
import { Footer } from '@/components/Footer';

interface blogpageProp {
    searchParams: {
        page?: string,
        cat: string
    };
}

function page({ searchParams }: blogpageProp) {

    const page = parseInt(searchParams.page || '1', 10);
    const { cat } = searchParams;

    return (
        <div className='' >
            <Navbar  />
            <CategroyBooks />
            <BookList bookcount={10} page={page} cat={cat} />
            <CategroyBooks />
            <CategroyBooks />
            <Footer/>
        </div>
    )
}

export default page
