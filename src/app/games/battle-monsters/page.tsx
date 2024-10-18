'use client'

import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import io, { Socket } from 'socket.io-client'

export default function Page() {

    const socket = useRef<Socket | null>(null)

    const arenaRef = useRef<HTMLDivElement | null>(null)

    interface Monster {
        name: string
        hp: number
        atk: number
        def: number
        spd: number
        type: string
        weakTo: string
        // attacks: string[] // not sure how to handle this yet
        imgFront: string
        imgBack: string
    }

    const [monsters, setMonsters] = useState<Monster[]>([
        {
            name: 'Charmander',
            hp: 30,
            atk: 12,
            def: 8,
            spd: 10,
            type: 'fire',
            weakTo: 'water',
            imgFront: 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/charmander.png',
            imgBack: 'https://img.pokemondb.net/sprites/emerald/back-normal/charmander.png'
        },
        {
            name: 'Squirtle',
            hp: 30,
            atk: 10,
            def: 10,
            spd: 10,
            type: 'water',
            weakTo: 'grass',
            imgFront: 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/squirtle.png',
            imgBack: 'https://img.pokemondb.net/sprites/emerald/back-normal/squirtle.png'
        },
        {
            name: 'Bulbasaur',
            hp: 30,
            atk: 9,
            def: 13,
            spd: 8,
            type: 'grass',
            weakTo: 'fire',
            imgFront: 'https://img.pokemondb.net/sprites/ruby-sapphire/normal/bulbasaur.png',
            imgBack: 'https://img.pokemondb.net/sprites/emerald/back-normal/bulbasaur.png'
        },
    ])
    const [socketId, setSocketId] = useState<String | undefined>(undefined)
    const [myMonster, setMyMonster] = useState<Monster | null>(null)
    const [enemyMonster, setEnemyMonster] = useState<Monster | null>(null)
    const [widthRatio, setWidthRatio] = useState(0)

    const chooseMyMonster = (monster: Monster) => {
        if (!myMonster) {
            setMyMonster(monster)
            socket.current?.emit('enemyMonster', {socketId, monster})
        }
    }

    // setting id
    useEffect(() => {
        console.log("Setting ID: ", socketId)
    }, [socketId])

    // socket stuff
    useEffect(() => {
        socket.current = io()

        socket.current.on('connect', () => {
            console.log('Client Connected to WebSocket from Pokemon with socket: ', socket.current?.id)
            if (socket.current && !socketId) {
                const id = socket.current.id
                setSocketId(id)
            }
        })

        socket.current.on('enemyMonster', (data: any) => {
            calculateWidthRatio(arenaRef.current?.offsetWidth)
            if (data.data.socketId != socketId) {
                console.log("setting enemy")
                setEnemyMonster(data.data.monster)
            }
        })

        return () => {
            socket.current?.disconnect()
        }
    }, [socketId])

    const calculateWidthRatio = (width: any) => {
        setWidthRatio(width / 1200)
    }

    useEffect(() => {
    
        const handleResize = (entries: any) => {
            if (!Array.isArray(entries)) return
            const entry = entries[0]
            const currentWidth = entry.contentRect.width
            calculateWidthRatio(currentWidth)
        }
    
        const resizeObserver = new ResizeObserver((entries) => handleResize(entries))
    
        if (arenaRef.current) {
            resizeObserver.observe(arenaRef.current)
            // Run the calculation immediately when the component mounts
            calculateWidthRatio(arenaRef.current.offsetWidth)
        }
    
        return () => {
            if (arenaRef.current) {
                resizeObserver.unobserve(arenaRef.current)
            }
        }
    }, [])


    return (
        <div className='flex-1 flex flex-col items-center justify-center chatBg battle-monster-container'>
            <div className='flex'>
                {monsters.map((monster, index) => (
                    <Image key={index} src={monster.imgFront} alt={monster.name} width={100} height={100} unoptimized className='battle-monster-image cursor-pointer' onClick={() => chooseMyMonster(monster)} />
                ))}
            </div>
            <div ref={arenaRef} className='relative rounded-lg w-full max-w-[1200px] h-auto max-h-[800px] aspect-[3/2] flex flex-col justify-between overflow-hidden' style={{ resize: 'both', transform: `scale(${widthRatio})` }}>
                <Image src={'/battle-bg.webp'} className='battle-monster-image z-0 absolute' alt='battle background' width={1200} height={560} unoptimized />
                {enemyMonster ? (
                    <div className='w-full h-[30%] relative z-20'>
                        <div className='absolute top-[60px] left-[55px]'>
                            <Image src={'/battle-enemy-status.webp'} alt={'enemy monser status'} width={520} height={145} unoptimized className='battle-monster-image' />
                            <h1 className='absolute top-[8px] left-[35px] text-7xl text-neutral-800'>{enemyMonster.name.toUpperCase()}</h1>
                        </div>
                        <Image src={enemyMonster.imgFront} alt={enemyMonster.name} width={320} height={320} unoptimized className='battle-monster-image absolute top-[90px] right-[200px]' />
                    </div>
                ) : (
                    <></>
                )}
                {myMonster ? (
                    <div className='w-full h-[30%] mt-auto relative z-20'>
                        <Image src={myMonster.imgBack} alt={myMonster.name} width={320} height={320} unoptimized className='battle-monster-image absolute -top-[240px] left-[160px]' />
                        <div className='absolute -top-[190px] right-[44px]'>
                            <Image src={'/battle-player-status.webp'} alt={'player monster status'} width={520} height={185} unoptimized className='battle-monster-image' />
                            <h1 className='absolute top-[5px] left-[80px] text-7xl text-neutral-800'>{myMonster.name.toUpperCase()}</h1>
                        </div>
                        <div className='w-full h-full flex items-center justify-center absolute z-40' style={{ backgroundImage: `url('/battle-menu-bg.webp')` }}>
                            {/* <button className='bg-neutral-400 text-white text-4xl font-bold rounded-lg px-3 py-2'>Attack</button> */}
                            <h1 className='text-7xl text-white pl-14 mt-4'>What will<br></br>{myMonster.name.toUpperCase()} do?</h1>
                            <div className='w-1/2 h-full ml-auto' style={{ backgroundImage: `url('/battle-option-bg.webp')` }}></div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}

            </div>
        </div>
    )
}