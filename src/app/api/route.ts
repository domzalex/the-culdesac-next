import { NextRequest, NextResponse } from "next/server"
import { clientPromise } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(req: NextRequest) {

    const tag = new URL(req.url).searchParams.get('tag')
    // const user = new URL(req.url).searchParams.get('user')
    const id = new URL(req.url).searchParams.get('_id')
    
    const db = await clientPromise()

    let allPosts

    if (tag !== 'null' && tag !== null && tag) {
        allPosts = await db.collection('newblogentries').find({ tag: tag }).sort({ date: -1 }).toArray()
    }
    else if (id) {
        allPosts = await db.collection('newblogentries').find({ _id: new ObjectId(id) }).toArray()
    }
    else {
        allPosts = await db.collection('newblogentries').find({}).sort({ date: -1 }).toArray()
    }

    return NextResponse.json({ posts: allPosts })
}

export async function POST(req: NextRequest) {

    const data = await req.json()

    const db = await clientPromise()
    const collection = db.collection('newblogentries')

    try {
        const blogPushed = await collection.insertOne(data)
        return NextResponse.json({ response: `Blog entry inserted with _id: ${blogPushed.insertedId}`, status: 200 })
    } catch (error: any) {
        console.error("Error submitting blog post backend: ", error.message)
        return NextResponse.json({ response: "FAILED TO PUSH BLOG ENTRY" })
    }
}

export async function PUT(req: NextRequest) {

    const data = await req.json()

    const db = await clientPromise()

    try {
        const blogUpdated = await db.collection('newblogentries').updateOne(
            { _id: new ObjectId(data.postId) },
            { $set: data.updatedData }
        )
        return NextResponse.json({ response: `Blog entry UPDATED with _id: ${data.postId}`, status: 200 })
    } catch (error: any) {
        console.error("Error submitting blog post backend: ", error.message)
        return NextResponse.json({ response: "FAILED TO PUSH BLOG ENTRY" })
    }
}

export async function DELETE(req: NextRequest) {
    const id = new URL(req.url).searchParams.get('_id')

    const db = await clientPromise()

    try {
        if (id) {
            const deletedBlog = await db.collection('newblogentries').deleteOne({ _id: new ObjectId(id) })
        }
        return NextResponse.json({ response: `Blog entry DELETED with _id: ${id}`, status: 200 })
    } catch (error: any) {
        console.error("Error deleting post backend: ", error.message)
        return NextResponse.json({ response: "FAILED TO DELETE BLOG ENTRY" })
    }

}