import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {

    try {
        console.error("he1re");
        const body = await req.json();
        const { followerId, followingId, action } = body; 
        if (!followerId || !followingId || !action) {
            return NextResponse.json({ message: "Follower ID, following ID, and action are required" }, { status: 400 });
        }

        if (action === 'follow') {
         
            const existingFollow = await prisma.follower.findFirst({
                where: {
                    followerId,
                    followingId,
                },
            });

            if (existingFollow) {
                return NextResponse.json({ message: "Already following" }, { status: 409 });
            }

            const newFollow = await prisma.follower.create({
                data: {
                    followerId,
                    followingId,
                },
            });

            return NextResponse.json(newFollow);

        } else if (action === 'unfollow') {
            // Handle unfollow
            const unfollow = await prisma.follower.deleteMany({
                where: {
                    followerId,
                    followingId,
                },
            });

            if (unfollow.count === 0) {
                return NextResponse.json({ message: "Not following the user" }, { status: 404 });
            }

            return NextResponse.json({ message: "Unfollowed successfully" });
        } else {
            return NextResponse.json({ message: "Invalid action. Use 'follow' or 'unfollow'" }, { status: 400 });
        }
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ message: "Error processing request" }, { status: 500 });
    }
};


export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const followers = await prisma.follower.findMany({
            where: {
                followingId: userId,
            },
            include: {
                follower: true,
            },
        });

        return NextResponse.json(followers);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching followers" }, { status: 500 });
    }
};

