'use client'

import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'

import DownArrow from '/public/down-arrow-svgrepo-com.png'


const chatIcon = "M8 10.5H16M8 14.5H11M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z"
const blogIcon = "M7.2 21C6.07989 21 5.51984 21 5.09202 20.782C4.71569 20.5903 4.40973 20.2843 4.21799 19.908C4 19.4802 4 18.9201 4 17.8V6.2C4 5.07989 4 4.51984 4.21799 4.09202C4.40973 3.71569 4.71569 3.40973 5.09202 3.21799C5.51984 3 6.0799 3 7.2 3H16.8C17.9201 3 18.4802 3 18.908 3.21799C19.2843 3.40973 19.5903 3.71569 19.782 4.09202C20 4.51984 20 5.0799 20 6.2V7M8 7H14M8 15H9M8 11H12M11.1954 20.8945L12.5102 20.6347C13.2197 20.4945 13.5744 20.4244 13.9052 20.2952C14.1988 20.1806 14.4778 20.0317 14.7365 19.8516C15.0279 19.6486 15.2836 19.393 15.7949 18.8816L20.9434 13.7332C21.6306 13.0459 21.6306 11.9316 20.9434 11.2444C20.2561 10.5571 19.1418 10.5571 18.4546 11.2444L13.2182 16.4808C12.739 16.96 12.4994 17.1996 12.3059 17.4712C12.1341 17.7123 11.9896 17.9717 11.8751 18.2447C11.7461 18.5522 11.6686 18.882 11.5135 19.5417L11.1954 20.8945Z"
const articlesIcon = "M7 8L3 11.6923L7 16M17 8L21 11.6923L17 16M14 4L10 20"
const gamesIcon = "M8 8H8.01M16 8H16.01M12 12H12.01M16 16H16.01M8 16H8.01M7.2 20H16.8C17.9201 20 18.4802 20 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V7.2C20 6.0799 20 5.51984 19.782 5.09202C19.5903 4.71569 19.2843 4.40973 18.908 4.21799C18.4802 4 17.9201 4 16.8 4H7.2C6.0799 4 5.51984 4 5.09202 4.21799C4.71569 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.07989 4 7.2V16.8C4 17.9201 4 18.4802 4.21799 18.908C4.40973 19.2843 4.71569 19.5903 5.09202 19.782C5.51984 20 6.07989 20 7.2 20Z"


const selectedDivStyle = 'bg-white p-2 flex items-center rounded-lg border border-transparent cursor-pointer hover:border-white'
const unSelectedDivStyle = 'p-2 flex items-center rounded-lg border border-transparent cursor-pointer hover:border-white'

const selectedH1Style = 'font-light text-blue-500'
const unSelectedH1Style = 'font-light text-white'

const toggledNavStyle = 'h-screen w-64 bg-blue-500 flex flex-col p-6 pt-2 gap-6 sm:w-screen sm:h-full sm:z-40 sm:overflow-y-hidden sm:absolute'
const hiddenNavStyle = 'h-screen w-64 bg-blue-500 flex flex-col p-6 pt-2 gap-6 sm:w-screen sm:h-auto sm:z-40 sm:overflow-y-hidden sm:absolute sm:pb-0'

const navLinksShownStyle = 'flex flex-col gap-6'
const navLinksHiddenStyle = 'flex flex-col gap-6 sm:hidden'

export default function Nav() {

    type NavLink = {
        selected: boolean;
        text: string;
        icon: string;
    }

    type NavLinks = {
        [key: string]: NavLink;
    }

    const { data: session, status } = useSession()

    const pathname = usePathname()
    
    const [navLinks, setNavLinks] = useState<NavLinks>({
        '/chat': {selected: false, text: "Chat", icon: chatIcon},
        '/blog': {selected: false, text: "Blog", icon: blogIcon},
        // '/articles': {selected: false, text: "Articles", icon: articlesIcon},
        // '/games': {selected: false, text: "Games", icon: gamesIcon}
    })
    const [navToggled, setNavToggled] = useState(false)
    const [loginUrl, setLoginUrl] = useState(`/login?ref=${pathname}`)

    const navToggle = () => {
        setNavToggled(!navToggled)
    }
    
    useEffect(() => {
        setLoginUrl(`/login?ref=${pathname}`)
    }, [pathname])

    const handleClick = (key: string) => {
        if (key.includes('/') && key !== '/') {
            key = key.slice(1)
        }
        setNavLinks(prev => {
            const updated: NavLinks = {}
            for (let i in prev) {
                updated[i] = {
                    ...prev[i],
                    selected: i === key,
                }
            }
            return updated
        })
    }

    return (
        <nav className={navToggled ? toggledNavStyle : hiddenNavStyle}>
            <div className={navToggled ? 'border-b pb-3 w-full flex items-center justify-center sm:justify-between sm:border-b-1' : 'border-b pb-3 w-full flex items-center justify-center sm:justify-between sm:border-b-0'}>
                <Link href="/" onClick={() => handleClick('/')} className='flex flex-col sm:flex-row sm:gap-2 sm:items-end'>
                    <h1 className='text-lg font-light text-white text-center sm:text-left'>the</h1>
                    <h1 className='text-white font-black text-3xl text-center'>CUL-DE-SAC</h1>
                </Link>
                <button className='hidden sm:flex bg-white h-6 w-6' onClick={navToggle}></button>
            </div>
            <div className={navToggled ? navLinksShownStyle : navLinksHiddenStyle}>

                {Object.keys(navLinks).map((key) => {
                    const link = navLinks[key]
                    return (
                        <Link key={key} className={link.selected ? selectedDivStyle : unSelectedDivStyle} href={key} onClick={() => {handleClick(key); navToggle()}}>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" className='mr-2'>
                                <path d={link.icon} stroke={link.selected ? "#3b82f6" : "#ffffff"} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h1 className={link.selected ? selectedH1Style : unSelectedH1Style}>{link.text}</h1>
                        </Link>
                    )
                })}

                <div className={'p-2 flex items-center border border-transparent cursor-pointer hover:border-b-white gamesTab relative'}>
                    <div className='flex w-full items-center justify-between'>
                        <div className='flex items-center'>
                            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" className='mr-2'>
                                <path d={gamesIcon} stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <h1 className={unSelectedH1Style}>Games</h1>
                        </div>
                        <Image src={DownArrow} width="30" height="10" alt="" className='w-5 h-5' />
                    </div>
                    <div className='gamesSubTab flex-col w-full items-end gap-6 p-2 pt-20'>
                        <Link href="/games/cookie-clicker" className='text-white font-light hover:border-b-white' onClick={navToggle}>Cookie Clicker</Link>
                        {/* <Link href="/games/agario" className='text-white font-light hover:border-b-white' onClick={navToggle}>Agario</Link> */}
                        {/* <Link href="/games/tic-tac-toe" className='text-white font-light'>Tic-Tac-Toe</Link> */}
                    </div>
                </div>
                    
            </div>


            <div className={navToggled ? 'w-full flex-1 flex items-end' : 'w-full flex-1 flex items-end sm:hidden'}>
                {status == 'authenticated' ? (
                    <button className='text-white font-bold text-sm rounded-lg border-white border py-2 w-full hover:text-blue-500 hover:bg-white' onClick={() => {signOut(); navToggle()}}>Logout</button>
                ) : (
                    status == 'loading' ? (
                        null
                    ) : (
                        <Link className='text-center text-white font-bold text-sm rounded-lg border-white border py-2 w-full hover:text-blue-500 hover:bg-white' href={loginUrl} onClick={navToggle}>Login</Link>
                    )
                )}
            </div>
        </nav>
    )
}