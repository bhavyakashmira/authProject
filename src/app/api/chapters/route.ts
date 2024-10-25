import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/connect";
export const DELETE = async (req: NextRequest) => {
    try {

        const body = await req.json();

        const res = await prisma.chapter.delete({
            where: {
                id: body.id
            }
        })
        return new NextResponse(JSON.stringify({ res }));

    } catch (error) {
        console.error("error", error);
        return new NextResponse(JSON.stringify({ error }))

    }
}