'use client'

import React, {useEffect, useState, useRef, useId} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function Page() {

    const uid = useId()
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session && session.user) {
            const uname = session.user as { username: string }
            setUser(uname.username)
        } else {
            setUser(uid)
        }
    }, [session, uid])

    const router = useRouter()

    type Message = {
        user: string,
        dateTime: string,
        messageText: string,
        gif: string,
        image: string
    }

    const [user, setUser] = useState('')
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)
    const [messageTextContent, setMessageTextContent] = useState('')
    const [readyToSend, setReadyToSend] = useState(false)
    const [message, setMessage] = useState<Message>({
        user: "",
        dateTime: "",
        messageText: "",
        gif: "",
        image: ""
    })




    const ws = useRef<any>(null)

    useEffect(() => {
        ws.current = new WebSocket('ws://10.0.0.124:8080')

        ws.current.onopen = () => {
            console.log('connected to WS server')
        }

        ws.current.onmessage = (e: any) => {
            const newMessage = JSON.parse(e.data)
            setMessages((prev) => [...prev, newMessage.data])
        }

        return () => {
            ws.current.close()
        }
    }, [])




    const bottomScroll = useRef<any>(null)

    useEffect(() => {
        const onSubmit = async () => {
            if (message.messageText.trim() !== '' || message.image || message.gif) {
                if (session && session.user) {
                    try {
                        const response = await fetch('/api/messages', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(message)
                        })
                        ws.current.send(JSON.stringify({type: 'chat', message:message}))
                        setMessageTextContent('')
                        setMessage({
                            user: user,
                            dateTime: "",
                            messageText: "",
                            gif: "",
                            image: ""
                        })
                        // getMessages()
                    } catch (error: any) {
                        console.error("Error sending message from frontend: ", error.message)
                    }
                } else {
                    ws.current.send(JSON.stringify({type: 'chat', message:message}))
                    setMessageTextContent('')
                    setMessage({
                        user: user,
                        dateTime: "",
                        messageText: "",
                        gif: "",
                        image: ""
                    })
                }
            }
        }
        if (readyToSend) {
            onSubmit()
            setReadyToSend(false)
        }
    }, [readyToSend, message, user, session])

    const getMessages = async () => {
        try {
            const response = await fetch('/api/messages', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const res = await response.json()
            setMessages(res)
        } catch (error: any) {
            console.error("Error getting messages from frontend: ", error.message)
        }
    }

    const updateMessage = (k: string, v: string) => {
        setMessage(prev => ({
            ...prev,
            [k]: v
        }))
    }

    useEffect(() => {
        getMessages()
    }, [])

    useEffect(() => {
        scrolling()
    }, [messages])

    const scrolling = () => {
        if (bottomScroll && bottomScroll.current) {
            bottomScroll.current.scrollTop = bottomScroll.current.scrollHeight - bottomScroll.current.clientHeight
        }
    }

    const handleChange = (e: any) => {
        setMessageTextContent(e.target.value)
    }

    const setMessageToSend = () => {
        if (session && session.user) {
            setMessage({
                user: user,
                dateTime: new Date().toUTCString(),
                messageText: messageTextContent,
                gif: "",
                image: ""
            })
            setReadyToSend(true)
        } else {
            setMessage({
                user: uid,
                dateTime: new Date().toUTCString(),
                messageText: messageTextContent,
                gif: "",
                image: ""
            })
            setReadyToSend(true)
        }
    }

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col'>
            <div className='w-full h-16 bg-white border-b flex items-center justify-between px-6 sm:hidden'>
                <h1 className='font-bold text-xl'>Cul-De-Sac Chat</h1>
            </div>

            <div ref={bottomScroll} className='w-full flex-1 overflow-y-scroll sm:pt-14 chatBg relative'>
                {messages ? (
                    <div className='px-6 py-3'>
                        {messages.map((message: Message, index) => (
                            message.user == user ? (
                                <div key={index} className='py-0.5 flex flex-col items-end'>
                                    <div className='inline-block'>
                                        <p className='max-w-[800px] sm:max-w-64 bg-blue-500 text-white p-1.5 px-3 rounded-xl'>{message.messageText}</p>
                                    </div>
                                </div>
                            ) : (
                                <div key={index} className='py-3 flex flex-col items-start'>
                                    <div className='max-w-[800px] sm:max-w-70'>
                                        <h1 className='text-xs text-gray-400 font-light'>{message.user}</h1>
                                        <p className='text-black bg-gray-200 p-1.5 px-3 rounded-xl'>{message.messageText}</p>
                                    </div>
                                </div>
                            )
                        ))}
                        <div id="latestMessage"></div>
                    </div>
                ) : ( <div></div> )}
            </div>

            <div className='w-full h-32 bg-white border-t flex items-center justify-center p-3 gap-3 sm:h-16 relative'>
                {!session ? (
                    <div className='absolute top-[-25px] left-0 w-full text-center'>
                        <h1 className='text-gray-300 font-light'>If you are not logged in, your messages will not persist.</h1>
                    </div>
                ) : null}
                <textarea name="message" value={messageTextContent} onChange={handleChange} placeholder='Enter a message...' className='resize-none border rounded-lg h-full flex-1 p-3 py-2 sm:px-3 sm:py-1.5' />
                <div className='flex flex-col gap-3 h-full'>
                    <div className='flex gap-3 flex-1 sm:hidden'>
                        <button className='rounded-lg bg-gray-300 text-white w-1/2 cursor-not-allowed' onClick={scrolling}>G</button>
                        <button className='rounded-lg bg-gray-300 text-white w-1/2 cursor-not-allowed'>P</button>
                    </div>
                    <button className='bg-blue-500 text-white font-bold rounded-lg h-3/5 p-3 px-5 hover:bg-blue-600 sm:h-full sm:px-3 sm:py-1' onClick={setMessageToSend}>Send</button>
                </div>
            </div>

        </div>
    )
}
