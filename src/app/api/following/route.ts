import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ message: "User ID is required" }, { status: 400 });
        }

        const following = await prisma.follower.findMany({
            where: {
                followerId: userId,
            },
            include: {
                following: true, // Include the followed user's data if needed
            },
        });

        return NextResponse.json(following);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching following" }, { status: 500 });
    }
};
