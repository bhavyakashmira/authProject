import React, { useEffect, useState } from 'react';

type Category = {
    _id: string;
    slug: string;
    title: string;
};

const CategoryList = () => {
    const [data, setData] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/category', {
                    cache: "no-store"
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch data");
                }

                const result: Category[] = await res.json();
                setData(result);
            } catch (error) {
                setError((error as Error).message);
            }
        };

        getData();
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            {data.map((dat) => (
                <div key={dat._id} className='gap-10 bg-white text-black flex justify-center' >
                    <h1>{dat.slug}</h1>
                    <h1>{dat.title}</h1>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;

