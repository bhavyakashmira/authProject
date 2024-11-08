import type { Metadata } from "next";
import "./globals.css";
import AuthProviders from "@/providers/AuthProviders";
import Sidebar from "@/subcomponents/Sidebar";
import { AppWrapper } from "@/context";


export const metadata: Metadata = {
  title: "BookWorm",
  description: "Website to write read and write books",
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
        <AuthProviders>
          <AppWrapper>
        <div className="grid  md:grid-cols-12" >
          <div><Sidebar/></div>
          <div className=" md:col-span-11" >
                {children}
            </div>
            </div>
            
          </AppWrapper>
        </AuthProviders>
      </body>
    </html>
  );
}
