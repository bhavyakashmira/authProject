"use client";

import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import styles from "./writePage.module.css";
import React , { useEffect, useState , ChangeEvent} from "react";
import "react-quill/dist/quill.snow.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

import ReactQuill from "react-quill";
import { File, Plus, VideoIcon } from "lucide-react";
import { BiPhotoAlbum } from "react-icons/bi";

interface WriteProps{
    params: {
        slug :string
    }
}

const WritePage = ({params}:WriteProps) => {
    const { status } = useSession();
    const router = useRouter();
    const { slug } = params;

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [media, setMedia] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [catSlug, setCat] = useState<string>("");
    const [value, setValue] = useState("");
    const notify = () => toast("Chapter is added");



    useEffect(() => {
        
        const storage = getStorage(app);
        const upload = () => {
            if (file) {
                const name = new Date().getTime() + file.name;
                const storageRef = ref(storage, name);
                const uploadTask = uploadBytesResumable(storageRef, file);
                setOpen(false)
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
                    (error) => { },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setMedia(downloadURL);
                        });
                    }
          
                );
                
            }
        };
        
        file && upload()
    }, [file]);

    if (status === "loading") {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (status === "unauthenticated") {
        router.push("/");
    }

    const slugify = (str:String) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/[\s_-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    

    

    const handleSubmit = async () => {
        const chapslug = Date.now().toString();

      const res = await fetch(`/api/books/${slug}`, {
            method: "POST",
            body: JSON.stringify({
                title,
                story: value,
                img: media,
                slug: chapslug,
                bookslug: slug,
                catSlug: catSlug || "style", 
            }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/posts/${data.slug}`);
        }
        setTitle("");
        setValue("");
        notify();
   
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement> ) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };


    return (
        <div>
            <ToastContainer/>
        <div className={styles.container}>

            <input
                type="text"
                placeholder="Title"
                className={styles.input}
                onChange={(e) => setTitle(e.target.value)}
            />

            <div className={styles.editor}>
                <button className={styles.button} onClick={() => setOpen(!open)}>
                    <Plus width={16} height={16} />
                </button>
                {open && (
                    <div className={styles.add}>
                        <input
                            type="file"
                            id="image"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        
                        <button className={styles.addButton}>
                            <label htmlFor="image">
                                <BiPhotoAlbum width={16} height={16} />
                              
                            </label>
                        </button>
                        <button className={styles.addButton}>
                            <File width={16} height={16} />
                         
                        </button>
                        <button className={styles.addButton}>
                            <VideoIcon width={16} height={16} />  
                        </button>
                    </div>
                    )}
                    
                <ReactQuill
                   className={styles.textArea}
                    theme="snow"
                    value={value}
                    onChange={setValue}
                    placeholder="Tell your story..."
                />
            </div>

            <button className={styles.publish} onClick={handleSubmit}>
                Publish rn
                </button>
                
            </div>
        </div>
    );
};

export default WritePage;