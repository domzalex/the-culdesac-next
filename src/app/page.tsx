'use client'

import React from 'react'

export default function Home() {

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col items-start justify-center chatBg'>
            <div className='flex flex-col p-12 sm:p-6 gap-3 sm:gap-0'>
                <h3 className='text-5xl text-gray-400 sm:text-xl font-light'>Welcome to</h3>
                <h1 className='text-8xl font-black text-blue-500 sm:text-5xl'>the<br></br>Cul-De-Sac,</h1>
                <h3 className='text-5xl text-gray-400 sm:text-xl font-light'>my digital playground.</h3>
                <h3 className='text-5xl text-gray-400 sm:text-xl font-light'>Feel free to take alook around!</h3>
            </div>
        </div>
    )
}
