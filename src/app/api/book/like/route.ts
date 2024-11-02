import prisma from "@/utils/connect";
import { NextRequest , NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        if (!body.userId || !body.bookId) {
            return NextResponse.json({ message: "User ID and Book ID are required" }, { status: 400 });
        }

        // Check if the book is already liked by this user
        const existingLike = await prisma.likedBook.findFirst({
            where: {
                userId: body.userId,
                bookId: body.bookId
            }
        });

        if (existingLike) {
            // If already liked, delete the like (dislike action)
            await prisma.likedBook.delete({
                where: {
                    id: existingLike.id
                }
            });
            return NextResponse.json({ success: true, message: "Book disliked" }, { status: 200 });
        } else {
            // If not liked, create a new like
            const newLike = await prisma.likedBook.create({
                data: {
                    userId: body.userId,
                    bookId: body.bookId
                }
            });
            return NextResponse.json({ success: true, data: newLike, message: "Book liked" }, { status: 201 });
        }

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: "Error processing request", error: error.message }, { status: 500 });
    }
};


export const GET = async (req: NextRequest) => {
    try {
        // Retrieve bookId from query parameters
        const { searchParams } = new URL(req.url);
        const bookId = searchParams.get("bookId");

        if (!bookId) {
            return NextResponse.json({ message: "Book ID is required" }, { status: 400 });
        }

        const res = await prisma.likedBook.findFirst({
            where: { bookId }
        });

        if (!res) {
            return NextResponse.json({ message: "No like found for this book" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: res }, { status: 200 });

    } catch (error: any) {
        console.error(error.message);
        return NextResponse.json({ message: "Error retrieving like", error: error.message }, { status: 500 });
    }
}
