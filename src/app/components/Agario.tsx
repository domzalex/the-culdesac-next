// /* eslint-disable react/no-unescaped-entities */
// 'use client'

// import React, { useEffect, useState, useRef } from 'react'

// export default function BallGame() {

//     const ws = useRef<WebSocket | null>(null)
//     const ball = useRef(null)
//     const [clicked, setClicked] = useState(false)
//     const [mousePos, setMousePos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
//     const [bgPos, setBgPos] = useState({ x: 0, y: 0 })
//     const [bgSpd, setBgSpd] = useState({ x: 0, y: 0 })
//     const [dots, setDots] = useState([])
//     const [renderedDots, setRenderedDots] = useState([])

//     const speedFactor = 0.5

//     const randomColor = () => {
//         const characters = '0123456789ABCDEF'
//         let color = '#'
//         for (let i = 0; i < 6; i++) {
//             color += characters[Math.floor(Math.random() * 16)]
//         }
//         return color
//     }
//     const getRandomCoordinates = () => {
//         const position = {
//             x: Math.floor(Math.random() * 10000),
//             y: Math.floor(Math.random() * 10000)
//         }
//         return position
//     }

//     useEffect(() => {
//         const emptyDots = []
//         for (let i = 0; i < 10000; i++) {
//             const dot = {
//                 color: randomColor(),
//                 position: getRandomCoordinates()
//             }
//             emptyDots.push(dot)
//         }
//         setDots(emptyDots)
//     }, [])

//     useEffect(() => {
//         const handleMouseMove = (e: any) => {
//             setMousePos({ x: e.clientX, y: e.clientY })
//         };

//         window.addEventListener('mousemove', handleMouseMove)

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove)
//         }
//     }, [])

//     useEffect(() => {
//         const updateSpeed = () => {
//             const { x: mouseX, y: mouseY } = mousePos
//             const centerX = window.innerWidth / 2
//             const centerY = window.innerHeight / 2
        
//             const deltaX = mouseX - centerX - 128
//             const deltaY = mouseY - centerY
        
//             const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

//             if (distance > 30) {
//                 const normalizedVector = {
//                     x: -deltaX / distance,
//                     y: -deltaY / distance
//                 }
        
//                 setBgSpd({
//                     x: normalizedVector.x * speedFactor,
//                     y: normalizedVector.y * speedFactor
//                 })
//             } else {
//                 setBgSpd({ x: 0, y: 0 })
//             }
//         }
    
//         const interval = setInterval(updateSpeed, 1)
    
//         return () => {
//             clearInterval(interval)
//         }
//     }, [mousePos, bgSpd])

//     const updateRenderedDots = () => {
//         const dotsVisible = dots.filter(dot => isTrue(dot))
//         setRenderedDots(dotsVisible)
//     }

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setBgPos(prev => ({
//                 x: prev.x + bgSpd.x,
//                 y: prev.y + bgSpd.y
//             }))
//         }, 1)

//         return () => {
//             clearInterval(interval)
//         }
//     }, [bgSpd])

//     const removeDots = () => {
//         const newDots = dots.filter(dot => {
//             return !(
//                 dot.position.x >= (-bgPos.x + (((window.innerWidth - 250) / 2) - 50)) && 
//                 dot.position.x <= (-bgPos.x + (window.innerWidth / 2) + 50)
//             )
//         })
//         console.log(newDots.length)
//         setDots(newDots)
//     }

//     useEffect(() => {
//         updateRenderedDots()
//     }, [bgPos])

//     // useEffect(() => {
//     //     removeDots()
//     // }, [bgPos])

//     useEffect(() => {
//         ws.current = new WebSocket('ws://10.0.0.124:8080')

//         ws.current.onopen = () => {
//             console.log('connected to WS server')
//         }

//         ws.current.onmessage = (e) => {
//             // const position = JSON.parse(e.data)
//             // setElementPosition(position.data.x, position.data.y)
//         }

//         return () => {
//             if (ws.current) {
//                 ws.current.close()
//             }
//         }
//     }, [])

//     const isTrue = (dot: any) => {
//         if (dot.position.x < ((-bgPos.x) + (window.innerWidth - 270)) && dot.position.x > (-bgPos.x) && dot.position.y < ((-bgPos.y) + (window.innerHeight)) && dot.position.y > -bgPos.y) {
//             return true
//         }
//     }


//     return (
//         <div className='flex-1 h-full flex items-center justify-center overflow-hidden relative'>
//             {/* <div className='bg-gray-100 flex-1 h-full relative flex flex-col items-center justify-center' onMouseMove={(e) => {checkMoving(e.clientX - 280, e.clientY - 24)}}> */}
//             <div className='absolute agarioBg w-[10000px] h-[10000px]' style={{ top: bgPos.y, left: bgPos.x }}>
//                 {renderedDots.map((dot, index) => (
//                     <div key={index} style={{backgroundColor: dot.color, position: "absolute", top: dot.position.y, left: dot.position.x, width: '16px', height: '16px', borderRadius: '16px'}}></div>
//                 ))}
//             </div>
//             <div className='w-[48px] h-[48px] rounded-full bg-red-500 z-40 pointer-events-none'></div>
//         </div>
//     )
// }
