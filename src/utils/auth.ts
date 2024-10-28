import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import CredentialsProvider from "next-auth/providers/credentials";
import { getServerSession } from "next-auth";
import Email from "next-auth/providers/email";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        // ...add more providers here
    ],
    pages: {
        newUser: "/newUser"
    }
}

export const getAuthSessions = async () => {
    const session = await getServerSession(authOptions);
    return session;
};
