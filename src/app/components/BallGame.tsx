/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState, useRef } from 'react'

import GameNav from './GameNav'

export default function BallGame() {

    const ws = useRef<WebSocket | null>(null)
    const ball = useRef(null)
    const [clicked, setClicked] = useState(false)
    const [position, setPosition] = useState({ x: 50, y: 50})

    const setElementPosition = (dx: number, dy: number) => {
        setPosition(prev => ({
            x: dx,
            y: dy
        }))
    }

    const checkMoving = (px: number, py: number) => {
        if (clicked && ws.current) {
            ws.current.send(JSON.stringify({type: 'position', position: {x: px, y: py}}))
            setElementPosition(px, py)
        }
    }

    useEffect(() => {
        ws.current = new WebSocket('ws://10.0.0.124:8080')

        ws.current.onopen = () => {
            console.log('connected to WS server')
        }

        ws.current.onmessage = (e) => {
            const position = JSON.parse(e.data)
            setElementPosition(position.data.x, position.data.y)
        }

        return () => {
            if (ws.current) {
                ws.current.close()
            }
        }
    }, [])

    return (
        <div>
            <GameNav />
            <div className='bg-gray-100 flex-1 h-full relative flex flex-col items-center justify-center' onMouseMove={(e) => {checkMoving(e.clientX - 280, e.clientY - 24)}}>
                <h1>Ball Game</h1>
                <div className='border w-96 h-96 rounded-lg bg-white'>
                    <div ref={ball} className='bg-red-300 w-12 h-12 rounded-full cursor-pointer absolute' style={{top: `${position.y}px`, left: `${position.x}px`}} onMouseDown={() => setClicked(true)} onMouseUp={() => setClicked(false)}></div>
                </div>
            </div>
        </div>
    )
}
