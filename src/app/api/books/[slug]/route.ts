import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

//get single books

interface BookPageProps {
    params: {
        slug: string;
    };

}


export const GET = async (req: Request , {params}:BookPageProps) => {

   const {slug} =params
  
    try {
        const post = await prisma.book.findUnique({
            where: { slug },
            include:{user:true}
        })
       
        return new NextResponse(JSON.stringify({ post }))

    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({ "message": "something wrong" }))
    }
}