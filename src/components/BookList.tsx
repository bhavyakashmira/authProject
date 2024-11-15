import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import BookCard from './BookCard';

type Books = {
  _id: string;
  slug: string;
  title: string;
  img: string;
};

interface BookListProps {
  page?: number;
  cat?: string;
  bookcount?: number;
}

const BookList: React.FC<BookListProps> = ({ page=2  , cat=""  , bookcount }) => {
  
  const [data, setData] = useState<Books[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [count, setcount] = useState(0);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/books?page=${page}&cat=${cat}`, {
          cache: "no-store"
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const total = await res.json();
        const result = total.books
        setData(result);
        setcount(total.count);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [page]);



  if (error) return <p>{error}</p>;
  const Post_Per_Page = bookcount || 3;
  const hasprev = Post_Per_Page * (page - 1) > 0;
  const hasnext = Post_Per_Page * (page - 1) + Post_Per_Page < count;
 


  

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-[#FCF75E]">
      <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
        <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
          <a href="/" aria-label="Home" className="mr-3">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50">
              <svg
                className="w-12 h-12 text-deep-purple-accent-400"
                stroke="currentColor"
                viewBox="0 0 52 52"
              >
                <polygon
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  points="29 13 14 29 25 29 23 39 38 23 27 23"
                />
              </svg>
            </div>
          </a>
          <h2 className="font-serif text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
            <span className="inline-block mb-2">Discover New Reads</span>
            <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
          </h2>
        </div>
        <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
          "Explore a curated collection of captivating books across genres. Dive into stories that inspire, inform, and entertain."
        </p>
      </div>

      {loading && (
        <section className=" ">
        <div className="container  mx-auto animate-pulse">
          <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>

            <div className="w-full ">
              <div className="w-full h-64 bg-gray-300 rounded-lg md:h-72 dark:bg-gray-600"></div>

              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
          </div>
        </div>
      </section>)}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {data?.map((book) => (
          <div key={book._id} className="">
            <BookCard dat={book} />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Pagination page={page} hasnext={hasnext} hasprev={hasprev} />
      </div>
    </div>

  );
};

export default BookList;

