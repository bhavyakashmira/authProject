import prisma from "@/utils/connect";
import {  NextResponse } from "next/server";

export const GET = async (req :Request) => {

    const url = new URL(req.url);
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const cat = url.searchParams.get("cat");

    const Post_per_page = 2;
    const query = {
        take: Post_per_page,
        skip: Post_per_page * (page - 1),
        where: {
            ...(cat &&{catslug:cat}),
        }
    }

    try {
        const [books , count] = await prisma.$transaction(
            [prisma.book.findMany(query),
            prisma.book.count( {where :query.where}),
        ]
        );
        return new NextResponse(JSON.stringify({books , count}))

    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({ "message": "something wrong" }))
    }
}