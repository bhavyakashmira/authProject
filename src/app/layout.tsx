import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthProviders from "@/providers/AuthProviders";
import Sidebar from "@/subcomponents/Sidebar";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <div className="grid  md:grid-cols-12" >
          <div><Sidebar/></div>
          <div className=" md:col-span-11" >
        <AuthProviders>
          {children}
            </AuthProviders>
            </div>
       </div>
      </body>
    </html>
  );
}
