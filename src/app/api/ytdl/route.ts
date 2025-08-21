import { NextRequest, NextResponse } from "next/server"
import { spawn } from "child_process"
import io from 'socket.io-client'

const youtubedl = require('youtube-dl-exec')

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    

    const socket = io()
    const url = await req.json()
    const ytDlpPath = "/opt/homebrew/bin/yt-dlp"

    return new Promise((resolve, reject) => {
        // Spawn yt-dlp to output the video to stdout
        const ytdlp = spawn(ytDlpPath, ["-f", "best", "-o", "-", "--newline", url])

        // If yt-dlp fails immediately
        ytdlp.on("error", (err) => {
            reject(
                new NextResponse(JSON.stringify({ error: err.message }), { status: 500 })
            )
        })

        // Set up a PassThrough stream to pipe directly to the response
        const { PassThrough } = require("stream")
        const stream = new PassThrough()

        ytdlp.stdout.pipe(stream) // pipe yt-dlp stdout into PassThrough

        ytdlp.stderr.on("data", (chunk) => {
            const str = chunk.toString()
            const match = str.match(/(\d{1,3}\.\d)%/)
            if (match) {
                const percent = parseFloat(match[1])
                // const io = getIO()
                console.log("TEST", percent)
                socket.emit("progress", percent)
            }
        })
        
        ytdlp.on("close", (code) => {
            if (code !== 0) {
                console.error("yt-dlp exited with code", code)
            }
        })

        resolve(
            new NextResponse(stream, {
                headers: {
                "Content-Type": "video/mp4",
                "Content-Disposition": 'attachment; filename="video.mp4"',
                },
            })
        )
    })
}