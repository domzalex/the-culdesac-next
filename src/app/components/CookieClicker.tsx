/* eslint-disable react/no-unescaped-entities */
'use client'

import React, {useEffect, useState, useRef} from 'react'
import Image from 'next/image'

import GameNav from './GameNav'

import cookieImg from '/public/cookie.png'


export default function CookieClicker() {

    type Upgrade = {
        name: string,
        amount: number,
        productivity: number,
        cost: number,
        baseCost: number
    }

    type Upgrades = {
        [key: string]: Upgrade;
    }

    const [cookieTotal, setCookieTotal] = useState(0)
    const [cookiesPerSecond, setCookiesPerSecond] = useState(0)
    const [cookiesPerClick, setCookiesPerClick] = useState(1)
    const [upgrades, setUpgrades] = useState<Upgrades>({
        'Clicker': {name: 'Clicker', amount: 0, productivity: 0.1, cost: 15, baseCost: 15},
        'Grandma': {name: 'Grandma', amount: 0, productivity: 1, cost: 100, baseCost: 100},
        'Bakery': {name: 'Bakery', amount: 0, productivity: 8, cost: 1100, baseCost: 1100},
        'Farm': {name: 'Farm', amount: 0, productivity: 47, cost: 12000, baseCost: 12000},
        'Factory': {name: 'Factory', amount: 0, productivity: 260, cost: 130000, baseCost: 130000},
        'Bank': {name: 'Bank', amount: 0, productivity: 1400, cost: 1400000, baseCost: 1400000},
        'Temple': {name: 'Temple', amount: 0, productivity: 7800, cost: 20000000, baseCost: 20000000},
        'Wizard Tower': {name: 'Wizard Tower', amount: 0, productivity: 44000, cost: 330000000, baseCost: 330000000},
        'Shipment': {name: 'Shipment', amount: 0, productivity: 260000, cost: 5100000000, baseCost: 5100000000},
        'Alchemy Lab': {name: 'Alchemy Lab', amount: 0, productivity: 1600000, cost: 75000000000, baseCost: 75000000000},
    })

    const addCookies = (amount: number) => {
        setCookieTotal(prev => (
            prev + amount
        ))
    }

    const purchaseUpgrade = (upgrade: string) => {
        if (cookieTotal >= upgrades[upgrade].cost) {
            setUpgrades(prev => ({
                ...prev,
                [upgrade]: {
                    ...prev[upgrade],
                    amount: prev[upgrade].amount + 1,
                    cost: Math.round(prev[upgrade].baseCost * Math.pow(1.15, (prev[upgrade].amount + 1)))
                }
            }))
            setCookieTotal(prev => (
                prev - upgrades[upgrade].cost
            ))
        }
    }

    useEffect(() => {
        let amt = 0
        Object.entries(upgrades).forEach(upgrade => {
            amt += Math.round(10 * (upgrade[1].amount * upgrade[1].productivity)) / 10
        })
        setCookiesPerSecond(amt)
    }, [upgrades])

    useEffect(() => {
        let interval: any
        if (cookiesPerSecond > 0) {
            interval = setInterval(() => {
                setCookieTotal(prev => (
                    prev + cookiesPerSecond / 50
                ))
            }, 20)
        }
        return () => clearInterval(interval)
    }, [cookiesPerSecond])

    return (
        <div className='bg-gray-100 flex-1 h-full relative flex flex-col'>
            <div className='w-full h-16 bg-white border-b flex items-center justify-center px-6 sm:hidden'>
                <h1 className='text-center font-black text-2xl'>THIS GAME DOESN'T SAVE. PROGRESS DELETED WHEN LEAVING THE PAGE.</h1>
            </div>
            <div className='w-full flex-1 flex sm:flex-col sm:h-dvh'>
                <div className='w-1/2 flex flex-col flex-1 items-center gap-6 sm:w-full sm:h-3.4 p-3 px-2'>
                    <div className='mt-32 sm:mt-12 sm:flex sm:justify-between sm:w-full'>
                        <h1 className='text-center text-gray-400 font-light text-xl'>Cookies per second:</h1>
                        <h1 className='text-center font-bold text-xl'>{cookiesPerSecond}</h1>
                    </div>
                    <div className='sm:hidden'>
                        <h1 className='text-center text-gray-400 font-light'>Cookies per click:</h1>
                        <h1 className='text-center font-bold text-xl'>{cookiesPerClick}</h1>
                    </div>
                    <Image src={cookieImg} width="250" height="250" alt="cookie to click to get cookies" onClick={() => addCookies(cookiesPerClick)} className='cursor-pointer transition-all duration-100 hover:scale-[1.05] active:scale-[1.025]'/> 
                    <div>
                        <h1 className='text-center text-gray-400 font-light text-xl'>Cookies:</h1>
                        <h1 className='text-center font-bold text-xl'>{Math.floor(cookieTotal)}</h1>
                    </div>
                </div>
                <div className='w-1/2 flex-1 flex flex-col sm:w-full sm:h-1/4'>
                    <div className='h-1/3 bg-gray-300 sm:hidden'></div>
                    <div className='flex flex-col h-2/3 overflow-y-scroll bg-gray-200 divide-y divide-gray-300 sm:h-full'>
                        {Object.entries(upgrades).map((upgrade, index) => (
                            <div key={index} onClick={() => purchaseUpgrade(upgrade[1].name)} className={cookieTotal >= upgrade[1].cost ? 'cursor-pointer flex justify-between p-3 hover:bg-gray-300 sm:p-1 sm:px-2' : 'cursor-pointer flex opacity-50 justify-between p-3 sm:p-1 sm:px-2'}>
                                <div className='flex items-end gap-6 sm:gap-0'>
                                    <div>
                                        <h2 className='text-left text-gray-400 font-light text-xs'>Amount</h2>
                                        <h1 className='text-2xl font-black text-[#696969] sm:text-lg'>{upgrade[1].amount}</h1>
                                    </div>
                                    <h1 className='text-2xl font-black text-[#696969] sm:text-lg'>{upgrade[1].name}</h1>
                                </div>
                                <div>
                                    <div>
                                        <h2 className='text-right text-gray-400 font-light text-xs'>Cost</h2>
                                        <h1 className='text-2xl text-[#696969] sm:text-lg'>{upgrade[1].cost}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
