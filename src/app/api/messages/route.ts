import { NextRequest, NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

export async function GET() {

    const db = await clientPromise()

    let allMessages = await db.collection('chatmessages').find({}).sort({ date: -1 }).toArray()

    return NextResponse.json(allMessages)
}

export async function POST(req: NextRequest) {

    const db = await clientPromise()
    const collection = db.collection('chatmessages')

    try {
        const messageData = await req.json()
        const messagePushed = await collection.insertOne(messageData)
        return NextResponse.json({ response: `Message inserted with _id: ${messagePushed.insertedId}` })
    } catch (error: any) {
        console.error("Error adding message to DB backend: ", error.message)
        return NextResponse.json({ response: "FAILED TO SEND MESSAGE" })
    }
}