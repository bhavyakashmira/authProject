import { NextResponse, NextRequest } from "next/server";
import prisma from "@/utils/connect";


interface ChapterProps {
    params: {
        slug: string
    }
}

export const GET = async (req: NextRequest , {params}:ChapterProps) => {
    
    try {
    
        const { slug } = params;
   
        const chapter = await prisma.chapter.findUnique({
            where: { slug },
        
        })

        return new NextResponse(JSON.stringify(chapter))


        
    } catch (error) {

        return new NextResponse(JSON.stringify({message : "something wrong"}))
        
    }
}


// post a chapter 
export const POST = async (req: NextRequest) => {
    try {
        // Parse the request body
        const body = await req.json();
        // Ensure the book exists by checking the `bookslug`
        const existingBook = await prisma.book.findUnique({
            where: { slug: body.bookslug },
        });

        // If no book is found, return an error
        if (!existingBook) {
            console.log("not exist");

            return new NextResponse(JSON.stringify({ error: 'Book not found' }), { status: 404 });
        }

        // Create the new chapter associated with the existing book 
        const chapter = await prisma.chapter.create({
            data: {
                story: body.story,
                title: body.title,
                img: body.img,
                bookslug: body.bookslug, // Associate the chapter with the book
                slug: body.slug, // Unique slug for the chapter
            },
        });

        // Return success response with the created chapter
        return new NextResponse(JSON.stringify({ chapter }), { status: 201 });

    } catch (error: any) {
        console.error('Error creating chapter:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
};



