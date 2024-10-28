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
            include: {
                books: true
            }
        })

        return new NextResponse(JSON.stringify({user} ));
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

export async function PATCH(req: Request, { params }: { params: { slug: string } }) {
    try {
        const body = await req.json();
        const { slug } = params;


        const user = await prisma.user.findUnique({
            where: { email: slug },
            select: { email: true },
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Prepare the update data only with fields provided in the request body
        const updateData: Partial<{ firstName: string; lastName: string; username: string; dateOfBirth: string; coverImg : string; profileImg :string }> = {};
        if (body.firstName) updateData.firstName = body.firstName;
        if (body.lastName) updateData.lastName = body.lastName;
        if (body.username) updateData.username = body.username;
        if (body.dateOfBirth) updateData.dateOfBirth = body.dateOfBirth;
        if (body.coverImg) updateData.coverImg = body.coverImg;
        if (body.profileImg) updateData.profileImg = body.profileImg

        // Perform the update
        const updatedUser = await prisma.user.update({
            where: { email: slug },
            data: updateData,
            select: { email: true, firstName: true, lastName: true, username: true, dateOfBirth: true , coverImg :true , profileImg : true},
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error("Update failed:", error);
        return NextResponse.json({ error: "An error occurred while updating the user." }, { status: 500 });
    }
}



