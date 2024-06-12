import React from 'react'
import Link from 'next/link'

export default function GameNav() {
    return (
        <div className='w-full flex flex-col gap-3 p-3'>
            {/* <Link className='font-bold text-white bg-black rounded-lg p-4 py-2' href="/games/ball-game">Ball Game</Link> */}
            <Link className='font-light text-white rounded-lg p-4 py-2' href="/games/tic-tac-toe">Tic-Tac-Toe</Link>
            <Link className='font-light text-white rounded-lg p-4 py-2' href="/games/cookie-clicker">Cookie Clicker</Link>
        </div>
    )
}