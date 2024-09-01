import { hash } from 'bcrypt';
import { clientPromise } from '@/lib/mongodb';
import { NextResponse, NextRequest } from 'next/server';

const SALT_ROUNDS = 10;

export async function POST(req: NextRequest) {
    const {username, password} = await req.json();

    if (!username || !password) {
        return NextResponse.json({ message: 'Username and password are required' });
    }

    try {
        const db = await clientPromise();
        const userCollection = db.collection('newusers');

        const existingUser = await userCollection.findOne({ username });

        if (existingUser) {
            return NextResponse.json({ code: 1, message: 'User already exists' });
        }

        const hashedPassword = await hash(password, SALT_ROUNDS);

        const newUser = {
            username,
            hash: hashedPassword,
        };

        await userCollection.insertOne(newUser);

        return NextResponse.json({ message: 'User registered successfully' })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' })
    }
}