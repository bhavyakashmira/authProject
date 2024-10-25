import { authOptions, getAuthSessions } from "@/utils/auth";
import prisma from "@/utils/connect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

interface UserProps {
    params: {
        slug: string
    }
}

export async function GET(req:Request , {params}:UserProps) {
    try {
        const { slug } = params;
        const user = await prisma.user.findUnique({
            where: {
                username: slug
            },
            include:{
              books:true
            }
        })

        return new NextResponse(JSON.stringify({ user }));
    } catch (error) {
       console.log(error);
       
        return NextResponse.json({ message: "something wrong" })
    }
}


export async function POST(req: Request, { params }: UserProps) {
    try {
        const body = await req.json();
        const { slug } = params;
        const User = await prisma.user.findFirst({
            where: {
                email: slug
            }
        });

        if (!User) return new NextResponse(JSON.stringify({ message: "No such user" }))
       const updatedUser =  await prisma.user.update({
            where: {
              email: body.email  
            },
            data: {
                firstName: body.firstname,
                lastName: body.lastname,
                username: body.username,
                dateOfBirth: body.date
            }
       })
        
          return NextResponse.json(updatedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error }));
        
    }
    
}


