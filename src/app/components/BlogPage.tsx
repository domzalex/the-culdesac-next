'use client'

import React, {useEffect, useState} from 'react'

import Search from '../components/Search'
import Posts from '../components/Posts'
import { useSession } from 'next-auth/react'

export default function BlogPage() {

    const { data: session, status } = useSession()

    const [currentUser, setCurrentUser] = useState('')
    const [tag, setTag] = useState('')

    useEffect(() => {
        if (session && session.user) {
            const user = session.user as { username: string }
            setCurrentUser(user.username)
        } else setCurrentUser('')
    },[session])

    const toggleTag = (tag: string) => {
        setTag(tag)
    }

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col sm:pt-[52px] sm:w-full'>
            <Search text="Filter by tag..." func={toggleTag} currentUser={currentUser} />
            <Posts tag={tag} userLoggedIn={currentUser}/>
        </div>
    )
}
