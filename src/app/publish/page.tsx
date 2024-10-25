"use client"
import React, { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";
import { useSession } from 'next-auth/react';
import Navbar from '@/subcomponents/Navbar';

function page() {


    const session = useSession();

    const [desc, setDesc] = useState("");
    const [file, setfile] = useState(null);
    const [media, setMedia] = useState("");
    const [title, setTitle] = useState("");
    const [catslug, setcat] = useState("");


    useEffect(() => {
        if (!file) return;  // Add a safeguard

        const storage = getStorage(app);
        console.log("File found, uploading...");

        const upload = () => {
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
        };

        upload();
    }, [file]); // Trigger whenever a file is selected




    const slugify = (str: String) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    
    
    const handleBookSubmit = async () => {
       
        await fetch("/api/books", {
            method: "POST",
            body: JSON.stringify({
                title, slug: slugify(title || ''),
                image: media, desc, catslug , userEmail : session.data?.user?.email
            })
        })

        setTitle("");
        setDesc("");
        setcat("");

    }
  return (
      <div>     
          
          <Navbar/>
      
          <div className="p-8 bg-gray-50 rounded-lg shadow-lg max-w-md mx-auto">

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                  <input type="file" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) => setfile(e.target.files[0])} />


              </div>

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Book Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setTitle(e.target.value)} />
              </div>

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Book Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setDesc(e.target.value)} />
              </div>

              <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={(e) => setcat(e.target.value)} />
              </div>



              <button className='bg-black text-white p-2 rounded-xl'
                  onClick={handleBookSubmit}
              >create book</button>
          </div>
          

    </div>
  )
}

export default page
