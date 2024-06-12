'use client'

import React from 'react'

import Agario from '@/app/components/Agario'

export default function Page() {
    return (
        <div className='flex-1 h-screen overflow-hidden flex justify-center items-center'>
            <Agario />
        </div>
    )
}