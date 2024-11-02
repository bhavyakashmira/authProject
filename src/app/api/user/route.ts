import { authOptions, getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface UserProps {
    params: {
        slug: string
    }
}

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ message: "Email query parameter is missing" }, { status: 400 });
        }
  
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                books: true, 
                
            }
        })

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return new NextResponse(JSON.stringify( user ));
    } catch (error) {
        console.log(error);

        return NextResponse.json({ message: "something wrong" })
    }
}