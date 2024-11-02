"use client";
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    id: string;
    name: string;
    email: string;
    image: string;
    books: Books[];
    username: string;
    profileImg: string;
    coverImg: string;
    bio: string;
};

type Books = {
    _id: string;
    slug: string;
    title: string;
    img: string;
    desc: string;
};

interface AppContextType {
    userData: User | null;
    loading: boolean;
    error: Error | null;
    username: string;
    email: string;
    userId: String;
}

export const AppContext = createContext<AppContextType>({
    userData: null,
    loading: true,
    error: null,
    username: "",
    email: "",
    userId :"",
});

export function AppWrapper({ children }: { children: ReactNode }) {
    const [userData, setUserData] = useState<User | null>(null);
    const [userId, setUserId] = useState<String>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const { data: session } = useSession();
    const userEmail = session?.user?.email;

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userEmail) return;
            setLoading(true);
            try {
                const response = await fetch(`/api/user?email=${userEmail}`);
                const data = await response.json();
                setUserData(data);
                setUserId(data.id);
                setUsername(data.username);
                setEmail(data.email);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userEmail]);


    return (
        <AppContext.Provider value={{ userData, loading, error, username , userId , email }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
