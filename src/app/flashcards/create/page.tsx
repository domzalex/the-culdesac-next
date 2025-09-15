'use client'

import { useState, useEffect } from "react"
import { v4 } from 'uuid'

const CreateFlashcard = () => {

    interface Flashcard {
        id: string
        learningLanguage: string
        nativeLanguage: string
        numberCorrect: number
        numberIncorrect: number
    }

    const [learningLanguage, setLearningLanguage] = useState('')
    const [nativeLanguage, setNativeLanguage] = useState('')
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
        if (nativeLanguage != '' && learningLanguage != '') {
            const uid = v4()

            const flashcard = {
                id: uid,
                learningLanguage: learningLanguage,
                nativeLanguage: nativeLanguage,
                numberCorrect: 0,
                numberIncorrect: 0 
            }

            setFlashcards((prev) => [...prev, flashcard])

            setLearningLanguage('')
            setNativeLanguage('')

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
            <div className="w-full flex-1 flex flex-col items-center justify-center sm:justify-center gap-12 p-3 pt-[64px]">
                <div className="card bg-neutral-800 w-5/6 max-w-[500px] aspect-[3/2] border border-neutral-700 rounded flex flex-col justify-evenly items-center">
                    <input className="bg-transparent text-xl text-neutral-200 card-input text-center border-b border-b-neutral-700 font-light px-2 py-1 rounded-none" placeholder="Learning Language" value={learningLanguage} onChange={(e) => {setLearningLanguage(e.target.value)}}/>
                    <input className="bg-transparent text-xl text-neutral-200 card-input text-center border-b border-b-neutral-700 font-light px-2 py-1 rounded-none" placeholder="Native Language" value={nativeLanguage} onChange={(e) => {setNativeLanguage(e.target.value)}}/>
                </div>
                <button className="bg-blue-700 text-white rounded px-5 py-3 font-bold w-max max-w-[500px]" onClick={createCard}>Submit</button>
            </div>
        </div>
    )
}

export default CreateFlashcard