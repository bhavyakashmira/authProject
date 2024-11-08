import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    

    try {

        const data = await prisma.book.findMany();

        return new NextResponse(JSON.stringify( data ) , {status: 200});
        
    } catch(error){
        return new NextResponse(JSON.stringify({message :"some error"}));
    }
    
}