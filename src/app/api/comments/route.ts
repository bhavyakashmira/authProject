import { getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { connect } from "http2";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

//get all comments


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const chapterSlug = searchParams.get("chapterSlug")
    try {
       
        const comments = await prisma.comment.findMany({
            where: {
                ...(chapterSlug && { chapterSlug })
            },
            include:{user:true}
        })

   
        return new NextResponse(JSON.stringify(comments));
    } catch (e) {
        return new NextResponse(JSON.stringify({ "message": "something wrong" }))
    }
}




//create a comment
export const POST = async (req: Request) => {
    const session = await getAuthSessions();
 
    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated" }),
            { status: 401 }
        );
    }

    try {
        const body = await req.json();
        const comment = await prisma.comment.create({
            data: {
                desc: body.desc,
                chapterSlug: body.chapterSlug,
                userEmail: session.user?.email as string,
             
            },
        });

        return new NextResponse(JSON.stringify(comment), { status: 200 });
    } catch (error: any) {
        return new NextResponse(
            JSON.stringify({ message: error.message }),
            { status: 500 }
        );
    }
};


//delete a comment

export const DELETE = async (req: Request) => {
    try {
        
        const body = await req.json();

        const comments = await prisma.comment.delete({
            where: {
                id: body.id
            }
    
        })

        return new NextResponse(JSON.stringify({comments}));


    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error}));
        
    }


}