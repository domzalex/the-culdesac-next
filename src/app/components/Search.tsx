'use client'

import React, { useState } from 'react'
import Link from 'next/link'

type SearchProps = {
    text: string,
    func: (a: string) => void,
    currentUser: any
}

export default function Search({ text, func, currentUser }: SearchProps) {

    const [tagFilter, setTagFilter] = useState('')

    const handleChange = (e: any) => {
        setTagFilter(e.target.value)
    }

    return (
        <div className='w-full h-[52px] bg-white dark:bg-neutral-900 border-b dark:border-b-transparent flex items-center justify-between px-6 sm:px-3'>
            <div className='flex gap-3 items-center sm:w-full'>
                <input type="text" name="search" placeholder={text} autoCapitalize='off' autoCorrect='off' className='border p-1 px-2 rounded-lg dark:bg-neutral-800 dark:border-transparent' value={tagFilter} onChange={handleChange} />
                <button className='bg-black text-white dark:text-neutral-200 font-bold text-sm px-4 py-1 rounded-full hover:bg-blue-500' onClick={() => func(tagFilter)}>Filter</button>
                <button className='text-gray-400 text-sm py-1 rounded-full hover:underline sm:ml-auto' onClick={() => {func(''); setTagFilter('')}}>Clear</button>
            </div>
            {currentUser !== '' ? (
                <Link href='/blog/create-new-post' className='bg-black text-white font-bold text-sm px-4 py-1 rounded-full hover:bg-blue-500 sm:fixed sm:bottom-2 sm:right-2 sm:z-10'>Create Post</Link>
            ) : null}
        </div>
    )

}