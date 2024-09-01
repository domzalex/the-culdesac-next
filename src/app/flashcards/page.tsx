'use client'

import Link from "next/link"
import FlashcardLink from "../components/FlashcardLink"
import { useEffect, useState } from "react"

const Flashcards = () => {

    interface Flashcard {
        id: string
        learningLanguage: string
        nativeLanguage: string
        numberCorrect: number
        numberIncorrect: number
    }

    const [flashcards, setFlashcards] = useState<Flashcard[]>()

    useEffect(() => {
        const cards = localStorage.getItem('flashcards')
        if (cards && cards != '[]') {
            try {
                const parsedCards = JSON.parse(cards)
                setFlashcards(parsedCards)
            } catch (e) {
                console.error('Failed to parse flashcards:', e)
            }
        }
    }, [])

    return (
        <div className='bg-gray-100 dark:bg-neutral-800 flex-1 relative flex flex-col chatBg'>
            <div className="w-full flex flex-wrap gap-3 p-3 pt-[64px]">
                {flashcards ? (
                    <>
                        {flashcards.map((card, index) => {
                            return (
                                <Link key={index} href={"/"} className="card-link rounded-md border border-neutral-600 px-2 py-1">
                                    <h1 className="text-neutral-300">{card.learningLanguage}</h1>
                                    <div className="card-progress"></div>
                                </Link>
                            )
                        })}
                    </>
                ) : (
                    <></>
                )}
                {/* <Link href={"/"} className="card-link rounded-md border border-neutral-600 px-2 py-1">
                    <h1 className="text-neutral-300">Ass</h1>
                    <div className="card-progress"></div>
                </Link>
                <Link href={"/"} className="card-link rounded-md border border-neutral-600 px-2 py-1">
                    <h1 className="text-neutral-300">Ass</h1>
                    <div className="card-progress"></div>
                </Link> */}
                <Link href={"/flashcards/create"} className="absolute bottom-6 right-6 bg-blue-600 hover:bg-blue-800 w-12 rounded-full aspect-square text-center text-white text-4xl leading-[42px] font-medium">
                    +
                </Link>
            </div>
        </div>
    )
}

export default Flashcards