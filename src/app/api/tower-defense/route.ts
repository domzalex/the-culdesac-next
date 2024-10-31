import { NextRequest, NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"

export async function GET() {

    const db = await clientPromise()

    let towers = await db.collection('towers').find({}).toArray()

    return NextResponse.json(towers)
}

export async function POST(req: NextRequest) {

    const db = await clientPromise()
    const collection = db.collection('towers')

    try {
        const towerData = await req.json()
        const towersPushed = await collection.replaceOne(
            {},
            { towers: towerData },
            { upsert: true }
        )
        return NextResponse.json({ response: `Pushed towers` })
    } catch (error: any) {
        console.error("Error pushing towers to DB backend: ", error.message)
        return NextResponse.json({ response: "FAILED TO Push Towers" })
    }
}