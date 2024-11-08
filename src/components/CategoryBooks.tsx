import { useEffect, useState } from "react";
import BookCard from "./BookCard";

type Books = {
    _id: string;
    slug: string;
    title: string;
    img: string;
};



export const CategroyBooks = () => {
    const [data, setData] = useState<Books[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetch("/api/book");
                const res =await data.json();
                setData(res);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        }
        getData();

    }, []);





    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20  ">
            <div className="flex flex-col w-full mb-6 lg:justify-between lg:flex-row md:mb-8">
                <div className="flex items-center mb-5 md:mb-6 group lg:max-w-xl">
                    <a href="/" aria-label="Item" className="mr-3">
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
                    <h2 className="font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
                        <span className="inline-block mb-2">Discover Books</span>
                        <div className="h-1 ml-auto duration-300 origin-left transform bg-deep-purple-accent-400 scale-x-30 group-hover:scale-x-100" />
                    </h2>
                </div>
                <p className="w-full text-gray-700 lg:text-sm lg:max-w-md">
                    "Sed ut perspiciatis unde omnis iste natus error sit iste voluptatem
                    accusantium doloremque rem aperiam, ipsa eaque quae. Sed ut
                    perspiciatis unde omnis iste."
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
            
            <div className="grid gap-8 row-gap-5 mb-8 lg:grid-cols-3 lg:row-gap-8">
                
                {data?.map((book) => (
                    <div key={book._id} className="">
                        <BookCard dat={book} />
                    </div>
                ))}


                
            </div>
            <div className="text-center">
                <a
                    href="/"
                    aria-label=""
                    className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                >
                    See more
                    <svg
                        className="inline-block w-3 ml-2"
                        fill="currentColor"
                        viewBox="0 0 12 12"
                    >
                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                    </svg>
                </a>
            </div>
        </div>
    );
};