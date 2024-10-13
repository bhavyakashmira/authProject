import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import BookCard from './BookCard';

type Books = {
  _id: string;
  slug: string;
  title: string;
};

interface BookListProps {
  page: number;
  cat?:string
}

const BookList: React.FC<BookListProps> = ({ page , cat="" }) => {
  
  const [data, setData] = useState<Books[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [count, setcount] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/books?page=${page}&cat=${cat}`, {
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
      }
    };

    getData();
  }, [page]);

  console.log(data);

  if (error) return <p>{error}</p>;

  const Post_Per_Page = 2;
  const hasprev = Post_Per_Page * (page - 1) > 0;
  const hasnext = Post_Per_Page * (page - 1) + Post_Per_Page < count;

  return (
    <div>
      
       <div className='grid grid-cols-3 gap-10' >
      {data.map((dat) => (
        <div className='' >
          <BookCard dat={dat} />
       </div>
      ))}

        </div>


      <Pagination page={page} hasnext={hasnext} hasprev={hasprev} />
    </div>
  );
};

export default BookList;

