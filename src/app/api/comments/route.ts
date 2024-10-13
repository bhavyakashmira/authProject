import { getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { connect } from "http2";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";

//get all comments


export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const bookSlug = searchParams.get("bookSlug")
    try {
        const comments = await prisma.comment.findMany({
            where: {
                ...(bookSlug && { bookSlug }),
            },
            include: { user: true }
        });
    

        return new NextResponse(JSON.stringify( comments ))

    } catch (e) {
        return new NextResponse(JSON.stringify({ "message": "something wrong" }))
    }
}




//create a comment
export const POST = async (req: Request) => {
    
    const session   = await getAuthSessions()
    if (!session) {
        return new NextResponse(JSON.stringify({ message: "Not Authenticated" }), { status: 401 });
    }
    try {
        const body = await req.json()
        const comment = await prisma.comment.create({
            data: {
                desc: body.desc,
                bookSlug:body.bookSlug,
                userEmail: session?.user?.email as string,
                user: {
                    connect:{email:session?.user?.email as string}
                }
            }
        })

        return new NextResponse(JSON.stringify( comment ))

    } catch (e) {
        return new NextResponse(JSON.stringify({ "message": e.message }))
    }
}