'use client'

import { useState, useEffect } from "react"
import { v4 } from 'uuid'

const CreateFlashcard = () => {

    interface Flashcard {
        id: string
        front: string
        back: string
        numberCorrect: number
        numberIncorrect: number,
        folder: string 

    }

    const [front, setFront] = useState('')
    const [back, setBack] = useState('')
    const [folder, setFolder] = useState('')
    const [flashcards, setFlashcards] = useState<Flashcard[]>([])

    useEffect(() => {
        const cards = localStorage.getItem('flashcards')
        if (cards && cards != '[]') {
            try {
                const parsedCards = JSON.parse(cards);
                console.log("Getting cards: ", parsedCards);
                setFlashcards(parsedCards);
            } catch (e) {
                console.error('Failed to parse flashcards:', e);
            }
        }
    }, [])

    const createCard = () => {
        if (back != '' && front != '') {
            const uid = v4()

            const flashcard = {
                id: uid,
                front: front,
                back: back,
                numberCorrect: 0,
                numberIncorrect: 0,
                folder: folder
            }

            setFlashcards((prev) => [...prev, flashcard])

            setFront('')
            setBack('')
            setFolder('')

            alert("Card Created")
        } else alert("Please add card information")
    }

    useEffect(() => {
        console.log("Cards: ", flashcards)
        localStorage.setItem('flashcards', JSON.stringify(flashcards))

    }, [flashcards])

    return (
        <div className='flex-1 relative flex flex-col chatBg'>
            <a href="/flashcards" className="fixed top-[64px] left-3 text-neutral-600 font-bold underline">Back</a>
            <div className="w-full h-full flex flex-col items-center justify-center sm:justify-center gap-3 p-3 pt-[64px]">
                <div className="card bg-neutral-800 w-5/6 max-w-[500px] aspect-[3/2] border border-neutral-700 rounded flex flex-col justify-evenly items-center">
                    <div className="border-b border-b-neutral-700 h-1/2 flex justify-center w-full">
                        <input className="bg-transparent text-xl text-neutral-200 card-input text-center font-light px-2 py-1 rounded-none w-full" placeholder="Front" value={front} onChange={(e) => {setFront(e.target.value)}}/>
                    </div>
                    <div className="h-1/2 flex justify-center w-full">
                        <input className="bg-transparent text-xl text-neutral-200 card-input text-center font-light px-2 py-1 rounded-none w-full" placeholder="Back" value={back} onChange={(e) => {setBack(e.target.value)}}/>
                    </div>
                </div>
                <div className="flex gap-3 w-5/6 max-w-[500px]">
                    <input className="w-2/3 bg-transparent text-lgl text-neutral-200 card-input font-light px-2 py-1 rounded border border-neutral-700" placeholder="Folder" value={folder} onChange={(e) => {setFolder(e.target.value)}}/>
                    <button className="bg-emerald-800 flex-1 text-white rounded px-4 py-2 font-bold" onClick={createCard}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default CreateFlashcard