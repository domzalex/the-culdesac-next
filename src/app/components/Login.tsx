'use client'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function Login() {

    const uri = useSearchParams().get('ref')

    const [redirectURL, setRedirectURL] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (uri) {
            setRedirectURL(uri)
        }
    }, [uri])

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const res = await signIn('credentials', {
            redirect: false,
            username,
            password
        })

        if (res && res.ok) {
            window.location.href = redirectURL
        } else {
            alert('Login failed')
        }
    }

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit} className='w-full flex flex-col gap-3 items-center'>
                <input
                    className='w-2/3 max-w-96 p-1.5 px-3 rounded-lg'
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    className='w-2/3 max-w-96 p-1.5 px-3 rounded-lg'
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className='bg-blue-500 text-white rounded-lg p-1.5 px-3 w-2/3 max-w-96'>Login</button>
            </form>
        </div>
    )
}
