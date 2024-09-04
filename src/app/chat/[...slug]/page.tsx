'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useState } from 'react';

let socket: any

const ChatRoom = () => {
    const router = useRouter();
    const roomName = useSearchParams()
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        console.log(roomName)
    })

    // useEffect(() => {
    //     if (!router.isReady) return;

    //     // Initialize socket connection
    //     socket = io('http://localhost:3000');

    //     // Join the room based on the slug
    //     socket.emit('join-room', slug);

    //     // Listen for incoming messages
    //     socket.on('receive-message', (message) => {
    //         setMessages((prevMessages) => [...prevMessages, message]);
    //     });

    //     return () => {
    //         socket.emit('leave-room', slug); // Leave room on cleanup
    //         socket.disconnect();
    //     };
    // }, [router.isReady, slug]);

    // const sendMessage = () => {
    //     if (newMessage.trim() === '') return;

    //     const messageData = {
    //         room: slug,
    //         message: newMessage,
    //     };

    //     // Send the message to the server
    //     socket.emit('send-message', messageData);

    //     // Optionally add the message to your own state immediately
    //     setMessages((prevMessages) => [...prevMessages, messageData.message]);
    //     setNewMessage('');
    // };

    return (
        <div>
            <h1>Chat Room</h1>
            {/* <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button> */}
        </div>
    );
}

export default ChatRoom