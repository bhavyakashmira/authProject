import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();
        return new NextResponse(JSON.stringify(categories))
    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({"message": "something wrong"}))
        
    }
}

