'use client'

import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "./components/Nav";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className="flex w-screen h-screen sm:h-dvh sm:overflow-hidden">
            <SessionProvider>
                <Nav />
                {children}
            </SessionProvider>
        </body>
    </html>
  );
}
