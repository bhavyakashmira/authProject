import prisma from "@/utils/connect";
import { useSession } from "next-auth/react";
import {  NextResponse } from "next/server";

//get multiple books 
export const GET = async (req: Request) => {
    
    const url = new URL(req.url);
    const pageParam = url.searchParams.get('page');
    const page = pageParam ? parseInt(pageParam, 10) : 1;
    const cat = url.searchParams.get("cat");
    const Post_per_page = 6;
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

//post a book
export const POST = async (req: Request)=>{
    try {

        const body = await req.json();
        if (!body.title ) return NextResponse.json({ "message": "something wrong" })
        
        const book = await prisma.book.create({
            data: {
                slug: body.slug ,
                title: body.title,
                userEmail: body.userEmail,
                desc : body.desc,
                catslug: body.catSlug,
                img : body.image
            }
        });

        return new NextResponse(JSON.stringify({ book }), { status: 201 });
    } catch (error:any) {
        console.log(error.message);
        return NextResponse.json({ "message": " error" });
          
    }
}

//delete a book
export const DELETE = async (req: Request) => {
    try {

        const body = await req.json();

        const comments = await prisma.book.delete({
            where: {
                id: body.id
            }
        })

        return new NextResponse(JSON.stringify({ comments }));


    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }));

    }


}

