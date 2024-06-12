'use client'

import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'

export default function Posts({ tag, userLoggedIn }: { tag: string, userLoggedIn: string }) {

    const { data: session, status } = useSession()

    type Post = {
        _id: string,
        content: string,
        date: string,
        name: string,
        tag: string,
        title: string
    }

    const [posts, setPosts] = useState<Post[]>([])
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState('')

    useEffect(() => {
        if (session && session.user) {
            const uname = session.user as { username: string }
            setUser(uname.username)
        }
    }, [session])

    //Grabbing all the posts from the DB
    useEffect(() => {
        const getDb = async () => {
            setLoading(true)
            const response = await fetch(`/api`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json()
            const p: any = Object.entries(res)[0][1]
            setPosts(p)
            setFilteredPosts(p)
            setLoading(false)
        }
        getDb()
    }, [])

    //Filtering posts
    useEffect(() => {
        const filterPosts = (filter: string) => {
            const filtered: Post[] = posts.filter(post => {
                if (filter) {
                    return post.tag.toLowerCase() === filter.toLowerCase()
                }
                return true
            })
            setFilteredPosts(filtered)
        }
        filterPosts(tag)
    }, [tag, posts])

    const editPost = (id: string) => {
        window.location.href = `/blog/edit?_id=${id}`
    }
    const deletePost = async (id: string) => {
        const response = await fetch(`/api?_id=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const res = await response.json()
        if (res.status === 200) {
            window.location.href = '/blog'
        }
    }

    return (
        <div className='overflow-hidden flex-1'>
            <div className='h-full w-full divide-y overflow-y-scroll'>
                {loading ? (
                    <div className='h-full w-full flex flex-col gap-8 items-center justify-center'>
                        <div className="lds-ripple"><div></div><div></div></div>
                        <h1 className='text-gray-400'>Loading...</h1>
                    </div>
                ) : (
                    filteredPosts.length > 0 ? (filteredPosts.map((post, index) => (
                        <div key={index} className='p-8 py-12 flex flex-col gap-5 bg-white sm:px-3 relative'>
                            <div className='flex flex-col items-start gap-1'>
                                <div className='flex items-center gap-2 sm:w-full sm:items-end sm:gap-1'>
                                    <h1 className='font-bold sm:text-xl'>{post.title} <span className='font-light text-gray-400 text-xs pt-1 sm:pb-0.5 px-1'> by </span><span className='text-blue-500'> {post.name}</span></h1>
                                </div>
                                <div className='sm:w-full flex items-center gap-3'>
                                    <h2 className='font-light text-gray-400 text-xs'>{post.date}</h2>
                                    <h2 className='font-light text-gray-400 text-xs bg-gray-200 p-1 px-2 rounded-full'>{post.tag}</h2>
                                </div>
                            </div>
                            <div className='font-light text-sm whitespace-pre-wrap max-w-[800px]' dangerouslySetInnerHTML={{ __html: post.content }} />
                            {(session && session.user && user == post.name) ? (
                                <div className='flex gap-2 absolute bottom-3 left-3'>
                                    <button className='text-blue-500 hover:underline' onClick={() => editPost(post._id)}>Edit</button>
                                    <span>/</span>
                                    <button className='text-red-500 hover:underline' onClick={() => deletePost(post._id)}>Delete</button>
                                </div>
                            ) : null}
                        </div>
                    ))) : (<div className='h-full flex items-center justify-center'>
                        <h1 className='text-gray-300 text-2xl font-light text-center'>No posts found...</h1>
                    </div>)
                )}
            </div>
        </div> 
    )
}