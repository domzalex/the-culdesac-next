'use client'

import React, {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'

export default function Page() {

    const { data: session, status } = useSession()

    useEffect(() => {
        if (session && session.user) {
            const user = session.user as { username: string }
            setPostData(prev => ({
                ...prev,
                name: user.username
            }))
        }
    }, [session])

    const [postData, setPostData] = useState({
        name: '',
        title: '',
        content: '',
        tag: '',
        date: ''
    })
    const [codeBlock, setCodeBlock] = useState('<div class="codeBlock"><div><h2 class="codeLanguage"></h2><div class="codeInnerDiv"><p></p></div></div></div>')
    const [readyToSend, setReadyToSend] = useState(false)

    const handleChange = (e: any) => {
        setPostData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const addCodeBlock = () => {
        setPostData(prev => ({
            ...prev,
            content: prev.content + codeBlock
        }))
    }
    const addLinkBlock = () => {
        setPostData(prev => ({
            ...prev,
            content: prev.content + '<a href="" target="_blank" class="text-blue-500 underline"></a>'
        }))
    }
    const addBoldBlock = () => {
        setPostData(prev => ({
            ...prev,
            content: prev.content + '<b></b>'
        }))
    }
    const addItalicBlock = () => {
        setPostData(prev => ({
            ...prev,
            content: prev.content + '<i></i>'
        }))
    }
    const addStyledBlock = () => {
        setPostData(prev => ({
            ...prev,
            content: prev.content + '<span class=""></span>'
        }))
    }

    const setBlogToPost = () => {
        setPostData(prev => ({
            ...prev,
            date: new Date().toUTCString()
        }))
        setReadyToSend(true)
    }

    useEffect(() => {
        const onSubmit = async () => {
            if (postData.content.trim() !== '' && postData.title.trim() !== '') {
                try {
                    const response = await fetch('/api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(postData)
                    })
                    const res = await response.json()
                    setPostData({
                        name: '',
                        title: '',
                        content: '',
                        tag: '',
                        date: ''
                    })
                    window.location.href = '/blog'
                } catch (error: any) {
                    console.error("Error creating blog post from frontend: ", error.message)
                }
            }
        }
        if (readyToSend) {
            onSubmit()
            setReadyToSend(false)
        }
    }, [readyToSend, postData])

    
    return session && session.user ? (
        <div className='bg-gray-100 flex-1 relative flex flex-col items-center justify-center p-3'>
            <div className='flex flex-col gap-3 w-full h-full justify-center max-w-[800px]'>
                <div className='flex gap-3'>
                    <button className='rounded-lg px-3 py-1 font-light text-sm text-gray-500 border border-gray-400 bg-gray-100' onClick={addCodeBlock}>Code</button>
                    <button className='rounded-lg px-3 py-1 font-light text-sm text-gray-500 border border-gray-400 bg-gray-100' onClick={addLinkBlock}>Link</button>
                    <button className='rounded-lg px-3 py-1 font-light text-sm text-gray-500 border border-gray-400 bg-gray-100' onClick={addBoldBlock}>Bold</button>
                    <button className='rounded-lg px-3 py-1 font-light text-sm text-gray-500 border border-gray-400 bg-gray-100' onClick={addItalicBlock}>Italic</button>
                    <button className='rounded-lg px-3 py-1 font-light text-sm text-gray-500 border border-gray-400 bg-gray-100' onClick={addStyledBlock}>Styled</button>
                </div>
                <input type='text' name="title" placeholder='Title...' className='rounded-md p-1 px-2 border' value={postData.title} onChange={handleChange}/>
                <textarea placeholder='Content...' name="content" className='rounded-md p-1 px-2 resize-none border h-96 sm:h-64' value={postData.content} onChange={handleChange}/>
                <input type='text' name="tag" placeholder='Tag...' className='rounded-md p-1 px-2 border' value={postData.tag} onChange={handleChange}/>
                <button className='w-full max-w-64 mx-auto p-1 bg-blue-500 rounded-md text-white font-bold' onClick={setBlogToPost}>Submit</button>
            </div>
        </div>
    ) : <h1>NOT LOGGED IN</h1>
}
