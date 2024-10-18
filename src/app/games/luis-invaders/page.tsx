'use client'

import { useEffect, useState, useRef } from 'react'

const Page = () => {

    interface Projectile {
        x: number,
        y: number,
        width: number,
        height: number
    }

    interface Player {
        hp: number,
        pos: {
            x: number,
            y: number
        }
    }

    const [invaders, setInvaders] = useState([
        { x: 0, y: 0 },
        { x: 20, y: 0 },
        { x: 40, y: 0 },
        { x: 60, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 0 },
        { x: 120, y: 0 },
        { x: 140, y: 0 },
        { x: 160, y: 0 },
        { x: 180, y: 0 },
        { x: 0, y: 20 },
        { x: 20, y: 20 },
    ])
    const [invaderCells, setInvaderCells] = useState({x: 4, y: 3})
    const [projectiles, setProjectiles] = useState<Projectile[]>([])
    const [keyPressed, setKeyPressed] = useState<string | null>(null)
    const keyPressedRef = useRef<string | null>(keyPressed)
    const [player, setPlayer] = useState<Player>({ hp: 100, pos: { x: 0, y: 0 } })
    const [fireSpeed, setFireSpeed] = useState(750)
    const [mouseX, setMouseX] = useState(0)
    const mouseXRef = useRef<number | null>(mouseX)
    const [isDragging, setIsDragging] = useState(false)

    const main = useRef<HTMLDivElement | null>(null)

    useEffect(() => {

        const mainRef = main.current

        // const handleKeyPress = (e: KeyboardEvent) => {
        //     if (e.key === 'a' || e.key === 'd') {
        //         setKeyPressed(e.key)
        //         keyPressedRef.current = e.key
        //     }
        //     else if (e.key === ' ') {
        //         fireProjectile('player')
        //     }
        // }

        const grabMousePos = (e: MouseEvent) => {
            setMouseX(e.x - 50)
            mouseXRef.current = e.x - 50
        }
        const handleTouchStart = (e: TouchEvent) => {
            setIsDragging(true)
            setMouseX(e.touches[0].clientX - 50)
            mouseXRef.current = e.touches[0].clientX - 50
        }

        const handleTouchMove = (e: TouchEvent) => {
            setMouseX(e.touches[0].clientX - 50)
            mouseXRef.current = e.touches[0].clientX - 50
        }

        const handleTouchEnd = () => {
            setIsDragging(false)
        }

        if (mainRef) {
            mainRef.addEventListener('mousemove', grabMousePos)
            mainRef.addEventListener('touchstart', handleTouchStart)
            mainRef.addEventListener('touchmove', handleTouchMove)
            mainRef.addEventListener('touchend', handleTouchEnd)
        }

        return () => {
            // window.removeEventListener('keydown', handleKeyPress)
            if (mainRef) {
                mainRef.removeEventListener('mousemove', grabMousePos)
                mainRef.removeEventListener('touchstart', handleTouchStart)
                mainRef.removeEventListener('touchmove', handleTouchMove)
                mainRef.removeEventListener('touchend', handleTouchEnd)
            }
        }
    }, [])

    const movePlayer = () => {
        setPlayer((prev) => ({
            ...prev,
            pos: {
                ...prev.pos,
                x: mouseXRef.current ?? 0
            }
        }))
        // const currentKey = keyPressedRef.current
        // switch (currentKey) {
        //     case 'a' :
        //         setPlayer((prev) => ({
        //             ...prev,
        //             pos: {
        //                 ...prev.pos,
        //                 x: prev.pos.x - 3
        //             }
        //         }))
        //         break

        //     case 'd' :
        //         setPlayer((prev) => ({
        //             ...prev,
        //             pos: {
        //                 ...prev.pos,
        //                 x: prev.pos.x + 3
        //             }
        //         }))
        //         break
        // }
    }
    
    const fireProjectile = (id: any) => {
        const player = document.getElementById(id)
        if (player) {
            const rect = player.getBoundingClientRect()
            const newProjectile = {
                x: rect.left + 25,
                y: rect.top,
                width: 10,
                height: 10
            }
            setProjectiles((prevProjectiles) => [...prevProjectiles, newProjectile])
        }
    }

    const moveProjectiles = () => {
        setProjectiles((prevProjectiles) => {

            const updatedProjectiles = prevProjectiles
                .map((projectile) => ({
                    ...projectile,
                    y: projectile.y - 8
                }))
                .filter((projectile) => projectile.y >= 0)
    
            if (updatedProjectiles.length > 0) {
                checkAllCollisions(updatedProjectiles)
            }
    
            return updatedProjectiles
        })
    }

    function checkCollision(projectile: any, invader: any) {
        return (
            projectile.x < invader.x + invader.width &&
            projectile.x + projectile.width > invader.x &&
            projectile.y < invader.y + invader.height &&
            projectile.y + projectile.height > invader.y
        )
    }

    const checkAllCollisions = (projectiles: any) => {
        setProjectiles((prevProjectiles: any[]) => {
            return prevProjectiles.filter((projectile: any) => {
                const invaderElements = document.querySelectorAll('.invader')
                const invaderArray = Array.from(invaderElements)
                let hasCollided = false
    
                invaderArray.forEach((invader) => {
                    const invaderCollider = invader.getBoundingClientRect()
                    if (checkCollision(projectile, invaderCollider) && !invader.classList.contains('invader-dead')) {
                        const invaderHTML = invader as HTMLDivElement
                        if (invaderHTML.style.opacity != '0') {
                            let op = parseFloat(invaderHTML.style.opacity)
                            if (op == 100) {
                                op = op / 100
                            }
                            op -= 0.2
                            invaderHTML.style.opacity = `${op}`
                            if (op <= 0) {
                                invaderHTML.className = 'bg-neutral-700 invader invader-dead'
                            }
                            hasCollided = true
                        } else {
                            invaderHTML.className = 'bg-neutral-700 invader invader-dead'
                            hasCollided = true
                        }
                    }
                })
    
                return !hasCollided
            })
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            moveProjectiles()
            movePlayer()
        }, 16)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            fireProjectile('player')
        }, fireSpeed)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className='flex-1 flex flex-col items-center justify-center chatBg'>
            {projectiles.map((projectile, index) => (
                <div key={index} style={{
                    position: 'absolute',
                    left: `${projectile.x}px`,
                    top: `${projectile.y}px`,
                    width: `${projectile.width}px`,
                    height: `${projectile.height}px`,
                    borderRadius: '10px',
                    backgroundColor: 'red',
                }}></div>
            ))}
            <div id='player' className='w-[100px] h-[100px]' style={{ position: 'absolute', bottom: `${player.pos.y}px`, left: `${player.pos.x}px` }}></div>
            <div ref={main} className='relative w-full max-w-[800px] h-full max-h-[800px] flex items-start justify-center pt-24'>

                <div className='grid gap-4' style={{ gridTemplateColumns: `repeat(${invaderCells.x}, 75px)`, gridTemplateRows: `repeat(${invaderCells.y}, 75px)` }}>
                    {invaders.map((invader, index) => {
                        return (
                            <div key={index} className='invader' style={{ opacity: '100' }}></div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Page