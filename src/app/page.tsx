"use client"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import CategoryList from "@/components/CategoryList";
import BookList from "@/components/BookList";
import Pagination from "@/components/Pagination";
import Navbar from "@/subcomponents/Navbar";
import HeroSec from "@/subcomponents/HeroSec";
import BookCard from "@/components/BookCard";


interface HomeProps {
  searchParams: {
    page?: string,
    cat :string
  };
}

export default function Home({ searchParams }: HomeProps) {
  
  const page = parseInt(searchParams.page || '1', 10);
  const { status } = useSession();

  return (
    <div>
      <Navbar />
      <HeroSec />
      {/* mapping books */}
      <BookList page={page} />

   </div>
  );
}
