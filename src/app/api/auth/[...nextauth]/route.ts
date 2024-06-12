import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import User from "../../../../../models/users";
import { clientPromise } from "@/lib/mongodb";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "username", type: "text" },
                password: { label: "password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    if (!credentials) {
                        console.error("No credentials")
                        return null
                    }

                    const db = await clientPromise()
                    const userCollection = db.collection('newusers')
                    const user = await userCollection.findOne({ username: credentials?.username })
    
                    if (user) {
                        const isValid = await bcrypt.compare(credentials?.password, user.hash)
                        if (isValid) {
                            return { id: user._id, username: user.username }
                        } else {
                            console.log("Wrong username or password.")
                            return null
                        }
                    } else {
                        console.log("No user found")
                        return null
                    }
                } catch (error) {
                    console.error(error)
                    return null
                }
            }
        })
    ],
    secret: process.env.SESSION_SECRET,
    session: {
        jwt: true,
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    jwt: {
        secret: process.env.SESSION_SECRET,
        encryption: true,
    },
    callbacks: {
        async jwt({token, user}: {token: any, user: any}) {
            if (user) {
                token.id = user.id
                token.username = user.username
            }
            
            return token
        },
        async session({session, token}: {session: any, token: any}) {
            if (!session.user) session.user = {}
            if (token) {
                session.user.id = token.id
                session.user.username = token.username
            }
            return session
        }
    },
    pages: {
        signIn:  '/login'
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }