import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./connect";
import CredentialsProvider from "next-auth/providers/credentials"
import { getServerSession } from "next-auth";
import Email from "next-auth/providers/email";


export const authOptions = {

    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials:any, req:any) {
                const username = credentials.username;
                const password = credentials.password;


                //fix this authorize later on

                // const user = await prisma.user.findFirst({
                //     where: {
                //         email: username,
                //         password: password
                //     }
                // })

                // if (!user) {
                //     return null;
                // }

                // return {
                //     id: user.id,
                //     email: user.email
                // }
            }
        }),

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
        newUser :"/newUser"
    }
}

export const getAuthSessions = async () => {
    const session = await getServerSession(authOptions);
    return session;
};