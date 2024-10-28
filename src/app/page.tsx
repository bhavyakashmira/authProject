"use client"
import { signOut, useSession } from "next-auth/react";
import BookList from "@/components/BookList";
import Navbar from "@/subcomponents/Navbar";
import HeroSec from "@/subcomponents/HeroSec";
import { Footer } from "@/components/Footer";
import { CategroyBooks } from "@/components/CategoryBooks";
import { Feature } from "@/components/Features";


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
      <BookList page={page} />
      <Feature/>
      <CategroyBooks/>
      <Footer/>
   </div>
  );
}
