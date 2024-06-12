'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function Page() {

    const param = useSearchParams().get('_id')

    const { data: session, status } = useSession()

    const [id, setId] = useState('')
    const [postData, setPostData] = useState({
        name: '',
        title: '',
        content: '',
        tag: '',
        date: ''
    })

    useEffect(() => {
        const getEditablePost = async () => {
            const response = await fetch(`/api?_id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json()
            setPostData({
                name: res.posts[0].name,
                title: res.posts[0].title,
                content: res.posts[0].content,
                tag: res.posts[0].tag,
                date: res.posts[0].date
            })
        }
        if (param && id === '') {
            setId(param)
            getEditablePost()
        }
    }, [id, param])

    const handleChange = (e: any) => {
        setPostData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const savePost = async () => {
        const response = await fetch('/api', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({postId: id, updatedData: postData})
        })
        const res = await response.json()
        if (res.status == 200) {
            window.location.href = '/blog'
        }
    }

    return (
        session && session.user && session.user.username == postData.name) ? (
            <div className='p-8 py-12 flex flex-col gap-5 bg-white sm:px-3 relative w-3/5'>

                <div className='flex flex-col items-start gap-1 max-w-[800px] '>
                    <div className='flex items-center w-full gap-2 sm:w-full sm:items-end sm:gap-1'>
                        <input className='font-bold border w-full rounded-lg p-2 sm:text-xl' name="title" onChange={handleChange} value={postData.title} />
                    </div>
                    <div className='sm:w-full flex items-center gap-3'>
                        <h2 className='font-light text-gray-400 text-xs'>{postData.date}</h2>
                        <h2 className='font-light text-gray-400 text-xs bg-gray-200 p-1 px-2 rounded-full'>{postData.tag}</h2>
                    </div>
                </div>
                <textarea className='border p-2 rounded-lg h-96 w-full font-light text-sm whitespace-pre-wrap max-w-[800px] resize-none' name="content" onChange={handleChange} value={ postData.content } />
                <div className='flex gap-2 absolute bottom-3 right-3'>
                    <button className='text-blue-500 hover:underline' onClick={savePost}>Save</button>
                </div>
            </div>
        ) : (
            null
    )    
}