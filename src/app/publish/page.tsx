"use client";
import React, { useState, useEffect, ChangeEvent } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { app } from "@/utils/firebase";
import { useSession, SessionContextValue } from 'next-auth/react';
import Navbar from '@/subcomponents/Navbar';

function Page() {
    const router = useRouter();
    const session: SessionContextValue = useSession();

    const [desc, setDesc] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [media, setMedia] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [catSlug, setCat] = useState<string>("");

    useEffect(() => {
        if (!file) return;

        const storage = getStorage(app);
        console.log("File found, uploading...");

        const upload = () => {
            if (file) {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + progress + "% done");
                        switch (snapshot.state) {
                            case "paused":
                                console.log("Upload is paused");
                                break;
                            case "running":
                                console.log("Upload is running");
                                break;
                        }
                    },
                    (error) => {
                        console.log("Error during upload:", error);
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setMedia(downloadURL);
                        });
                    }
                );
            }
        };

        upload();
    }, [file]);

    const notify = () => toast("Chapter is added");

    

    const slugify = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");

    const handleBookSubmit = async () => {

        const slug = slugify(title);
        await fetch("/api/books", {
            method: "POST",
            body: JSON.stringify({
                title,
                slug: slug,
                image: media,
                desc,
                catSlug,
                userEmail: session.data?.user?.email,
            }),
            headers: { "Content-Type": "application/json" }
        });
        
        notify();
        router.push(`/books/${slug}`);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    return (
        <div>
            <Navbar />
            <ToastContainer/>
           
            <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                    <input
                        type="file"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onChange={handleFileChange}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Book Name</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={catSlug}
                        onChange={(e) => setCat(e.target.value)}
                    />
                </div>

                <button
                    className="bg-black text-white p-2 rounded-xl"
                    onClick={handleBookSubmit}
                >
                    Create Book
                </button>
            </div>
        </div>
    );
}

export default Page;

