'use client'

import React, {useEffect, useState} from 'react'

export default function Page() {

    const [articles, setArticles] = useState(null)

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col items-center justify-center'>
            {articles ? (
                null
            ) : (
                <h1 className='text-gray-300 font-light'>Nothing to see here...</h1>
            )}
        </div>
    )
}
