'use client'

import React, { useEffect, useState, useRef, use } from 'react'
import io, { Socket } from 'socket.io-client'

export default function Page() {

    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isEraser, setIsEraser] = useState(false)
    const [color, setColor] = useState('#000000')
    const [tempColor, setTempColor] = useState('#000000')
    const [width, setWidth] = useState(5)

    const socket = useRef<Socket | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (canvas) {
            const context = canvas.getContext('2d')
            if (context) {
                context.fillStyle = 'white'
                context.fillRect(0, 0, canvas.width, canvas.height)
                context.lineWidth = 5
                context.lineCap = 'round'
                context.strokeStyle = color
            }
        }

        socket.current = io()

        socket.current.on('connect', () => {
            console.log('Client Connected to WebSocket')
        })

        socket.current.on('canvasData', (data: string) => {
            const canvas = canvasRef.current
            if (canvas) {
                const context = canvas.getContext('2d')
                if (context) {
                    const img = new Image()
                    img.onload = () => {
                        context.drawImage(img, 0, 0)
                    }
                    img.src = data
                }
            }
        })
    
        return () => {
            socket.current?.disconnect()
        }
    }, [])
    
    const startDrawing = (event: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')
        if (canvas && context) {
            const { offsetX, offsetY } =
                'touches' in event
                ? getTouchPos(event)
                : event.nativeEvent
        
            context.beginPath()
            context.moveTo(offsetX, offsetY)
            setIsDrawing(true)
        }
    }
    
    const draw = (event: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return
    
        const canvas = canvasRef.current
        const context = canvas?.getContext('2d')

        if (canvas && context) {
            const { offsetX, offsetY } =
                'touches' in event
                ? getTouchPos(event)
                : event.nativeEvent
        
            context.strokeStyle = color
            context.lineWidth = width
            context.lineTo(offsetX, offsetY)
            context.stroke()
            sendCanvasData()
        }
    }
    
    const stopDrawing = () => {
        setIsDrawing(false)
    }
    
    const getTouchPos = (event: React.TouchEvent) => {
        const canvas = canvasRef.current
        if (canvas) {
            const rect = canvas.getBoundingClientRect()
            const touch = event.touches[0]
            const offsetX = touch.clientX - rect.left
            const offsetY = touch.clientY - rect.top
            return { offsetX, offsetY }
        }
        return { offsetX: 0, offsetY: 0 }
    }

    const sendCanvasData = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const dataURL = canvas.toDataURL('image/png')
            socket.current?.emit('canvasData', dataURL)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newColor = event.target.value
        setColor(newColor)
    }

    const changeWidth = (e: any) => {
        console.log(e.target.value)
        setWidth(e.target.value)
    }

    const setEraser = () => {
        const c = color
        setTempColor(c)
        setColor('#ffffff')
    }

    const saveCanvasAsImage = () => {
        const canvas = canvasRef.current
        if (canvas) {
            const link = document.createElement('a')
            link.href = canvas.toDataURL('image/png')
            link.download = 'canvas-image.png'
            link.click()
        }
    }

    return (
        <div className='flex-1 chatBg h-full relative flex flex-col items-center justify-center overflow-hidden'>
            <div className='absolute top-3 sm:top-16 left-3 flex items-center gap-3'>
                <button className={isEraser ? 'text-4xl opacity-25' : 'text-4xl opacity-100'} onClick={() => {setColor(tempColor); setIsEraser(false)}}>🖊️</button>
                <button className={isEraser ? 'text-4xl opacity-100' : 'text-4xl opacity-25'} onClick={() => {setEraser(); setIsEraser(true)}}>🧼</button>
                <input
                    className='ml-1'
                    type="color"
                    value={color}
                    onChange={handleChange}

                    style={{ width: '35px', height: '35px', border: 'none', padding: '0' }}
                />
                <input type="range" min={2} max={50} step={2} onChange={(e) => changeWidth(e)} />
                <button onClick={saveCanvasAsImage} className='text-4xl ml-1'>💾</button>
            </div>
            <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            width={350}
            height={350}
            style={{ backgroundColor: 'white', cursor: 'crosshair', border: 'none', margin: '6em 0 0 0', borderRadius: '10px' }}
            ></canvas>
        </div>
    )
}