import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

//get single book 

interface BookPageProps {
    params: {
        slug: string;
    };

}

//get specific book 
export const GET = async (req: Request , {params}:BookPageProps) => {

   const {slug} =params

    try {
        const post = await prisma.book.findUnique({
            where: { slug },
            include:{user:true , chapters:true}
        })
       
        return new NextResponse(JSON.stringify({ post }))

    } catch (e) {
        console.log(e);
        return new NextResponse(JSON.stringify({ "message": "something wrong" }))
    }
}


// post a chapter 
export const POST = async (req: NextRequest) =>{
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
                img: body.img , 
                bookslug: body.bookslug, // Associate the chapter with the book
                slug: body.slug, // Unique slug for the chapter
            },
        });

        // Return success response with the created chapter
        return new NextResponse(JSON.stringify({ chapter }), { status: 201 });

    } catch (error:any) {
        console.error('Error creating chapter:', error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
};
