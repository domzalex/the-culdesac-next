import { MongoClient } from 'mongodb'

const uri = process.env.DB_CONNECT

if (!uri) {
    throw new Error('Please define the MongoDB connection URI in the environment variables')
}

const uriString: string = uri

let client: any

async function clientPromise() {
    if (!client) {
        client = new MongoClient(uriString)
        await client.connect()
    }
    return client.db('blogs')
}

export { clientPromise }