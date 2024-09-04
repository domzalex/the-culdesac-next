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
        <head>
            <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)"></meta>
            <meta name="theme-color" content="#0d0d0d" media="(prefers-color-scheme: dark)"></meta>
            {/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta> */}
        </head>
        <body className="flex w-screen h-screen sm:h-dvh sm:overflow-hidden">
            <SessionProvider>
                <Nav />
                {children}
            </SessionProvider>
        </body>
    </html>
  );
}
