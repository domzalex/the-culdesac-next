/* eslint-disable react/no-unescaped-entities */
'use client'

import React, { useEffect, useState, useRef } from 'react'

import GameNav from './GameNav'

let currentTeamToGo = 'x'

export default function TicTacoToe() {

    const ws = useRef<WebSocket | null>(null)

    const [board, setBoard] = useState([
        '0','0','0',
        '0','0','0',
        '0','0','0'
    ])

    const [teams, setTeams] = useState<string[]>([])
    const [myTeam, setMyTeam] = useState('')
    const [winner, setWinner] = useState('')

    const changeTeam = () => {
        if (currentTeamToGo == 'x') {
            currentTeamToGo = 'o'
        } else {
            currentTeamToGo = 'x'
        }
    }

    const handleClick = (index: number) => {
        if (currentTeamToGo == myTeam && !teams.includes('0')) {
            if (board[index] == '0') {
                const tempBoard = [...board]
                tempBoard[index] = myTeam
                setBoard(tempBoard)
                ws.current?.send(JSON.stringify({type: 'board', boardState: tempBoard}))
            } else alert(`Can't move there!`)
        }
    }

    const addToTeams = (t: string) => {
        if (ws.current) {
            ws.current.send(JSON.stringify({type: 'board', teams: [...teams, t]}))
        }
        setTeams(prev => {
            if (prev.length < 2) {
                return [...prev, t]
            } else {
                return prev
            }
        })
    }

    useEffect(() => {
        const checkWinner = () => {
            const winningOrders = [
                [0,1,2],
                [3,4,5],
                [6,7,8],
                [0,3,6],
                [1,4,7],
                [2,5,8],
                [0,4,8],
                [2,4,6]
            ]
    
            for (const order of winningOrders) {
                const [a,b,c] = order
                if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                    if (board[a] !== '0') {
                        setWinner(board[a])
                        return board[a]
                    }
                }
            }

            return null
        }
        checkWinner()
    }, [board])

    useEffect(() => {
        if (winner == '1') {
            alert("It's a draw!")
        }
        if (winner == 'x') {
            alert("X wins!")
        }
        if (winner == 'o') {
            alert("O wins!")
        }
    }, [winner])

    useEffect(() => {
        ws.current = new WebSocket('ws://localhost:8080')

        ws.current.onopen = () => {
            // console.log('connected to WS server')
        }

        ws.current.onmessage = (e: any) => {
            const data = JSON.parse(e.data)
            if (data.data.board) {
                const currentBoard = data.data.board
                setBoard(currentBoard)
                changeTeam()
            }
            if (data.data.teams) {
                const wteams = data.data.teams
                setTeams(wteams)
            }
        }

        return () => {
            ws.current?.close()
        }
    }, [])

    return (
            <div className='flex-1 h-full relative flex flex-col items-center justify-center sm:justify-end px-12 pb-12'>
                <div className='w-full max-w-96 h-auto flex flex-col gap-3'>
                    {myTeam == '' ? (
                        <div className='flex flex-col justify-center items-center w-full mb-12 gap-3'>
                            <h1 className='text-2xl font-bold'>Choose A Team</h1>
                            <div className='flex gap-3'>
                                {teams.includes('x') ? (
                                    <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-xl font-bold hover:bg-blue-600 opacity-25'>X</button>
                                ) : (
                                    <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-xl font-bold hover:bg-blue-600' onClick={() => {setMyTeam('x'); addToTeams('x')}}>X</button>
                                )}
                                {teams.includes('o') ? (
                                    <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-xl font-bold hover:bg-blue-600 opacity-25'>O</button>
                                ) : (
                                    <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-xl font-bold hover:bg-blue-600' onClick={() => {setMyTeam('o'); addToTeams('o')}}>O</button>
                                )}
                            </div>
                        </div>
                    ) : <div className='flex flex-col justify-center items-center w-full mb-12 gap-3 opacity-25'>
                            <h1 className='text-2xl font-bold'>Choose A Team</h1>
                            <div className='flex gap-3'>
                                <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-2xl font-bold cursor-default'>X</button>
                                <button className='w-12 h-12 rounded-lg bg-blue-500 text-white text-2xl font-bold cursor-default'>O</button>
                            </div>
                        </div>}
                    <div className='flex justify-between w-full'>
                        <h1 className='text-3xl font-bold text-gray-400'>Turn: {currentTeamToGo.toUpperCase()}</h1>
                        <button className='bg-blue-500 text-white rounded-lg px-3 font-bold'>Reset</button>
                    </div>
                    <div className='border border-gray-400 w-full aspect-square bg-gray-400 rounded-lg grid grid-cols-3 gap-px grid-rows-3 place-items-center overflow-hidden'>
                        {board.map((box, index) => (
                            <div key={index} className={box == '0' ? 'bg-gray-100 cursor-pointer text-gray-100 w-full h-full hover:bg-gray-200 text-7xl font-black w-full h-full grid place-items-center pb-2' : 'bg-gray-200 text-7xl text-gray-400 font-black w-full h-full grid place-items-center pb-2'} onClick={(e) => handleClick(index)}>
                                <h1 className='cursor-default pointer-events-none place-self-center text-center'>
                                    {box == '0' ? myTeam : box}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    )
}
