'use client'

import Link from "next/link"
import FlashcardLink from "../components/FlashcardLink"
import { useEffect, useState } from "react"
import { Collapsible } from "../components/Collapsible"

const Flashcards = () => {

    interface Flashcard {
        id: string
        front: string
        back: string
        numberCorrect: number
        numberIncorrect: number,
        folder: string 
    }

    const [flashcards, setFlashcards] = useState<Flashcard[]>()
    const [folders, setFolders] = useState<string[]>([])

    useEffect(() => {
        const cards = localStorage.getItem('flashcards')
        if (cards && cards != '[]') {
            try {
                const parsedCards = JSON.parse(cards)
                setFlashcards(parsedCards)

                const allFolders: string[] = Array.from(new Set(parsedCards.map((card: { folder: string }) => card.folder)))
                setFolders(allFolders)
            } catch (e) {
                console.error('Failed to parse flashcards:', e)
            }
        }
    }, [])

    return (
        <div className='flex-1 relative flex flex-col chatBg'>
            <div className="w-full mt-[52px] flex flex-col gap-12 p-3 overflow-y-scroll">
                {flashcards ? (
                    <Collapsible title="All Cards" open={true}>
                        {flashcards.map((card) => {
                            let percent = 0
                            if (card.numberIncorrect != 0 && card.numberCorrect == 0) {
                                percent = 0
                            }
                            if (card.numberIncorrect == 0 && card.numberCorrect > 0) {
                                percent = 100
                            }
                            if (card.numberIncorrect != 0 && card.numberCorrect != 0) {
                                percent = (card.numberCorrect / (card.numberCorrect + card.numberIncorrect) * 100)
                            }

                            return (
                                <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 ? "card-grid-item bg-zinc-800 border border-neutral-700" : "card-grid-item bg-sky-900 border border-sky-600 overflow-hidden"}>
                                    <h3 id='card-grid-item-h3' className="text-neutral-200 font-bold">{card.front}</h3>
                                    <div id='card-grid-percent-outer' className="bg-neutral-900">
                                        <div
                                            id='card-grid-percent-inner'
                                            style={{ width: `${percent}%`, height: `100%` }}
                                            className={percent < 80 ? "bg-yellow-500" : "bg-sky-500"}
                                        >
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </Collapsible>
                ) : (
                    <></>
                )}
                {flashcards && folders.map((folder) => {
                    if (folder !== 'Miscellaneous') {
                        return (
                            <Collapsible key={folder} title={folder} open={false}>
                                {flashcards.map((card) => {
                                    if (card.folder === folder && card.folder !== 'Miscellaneous') {
                                        let percent = 0
                                        if (card.numberIncorrect != 0 && card.numberCorrect == 0) {
                                            percent = 0
                                        }
                                        if (card.numberIncorrect == 0 && card.numberCorrect > 0) {
                                            percent = 100
                                        }
                                        if (card.numberIncorrect != 0 && card.numberCorrect != 0) {
                                            percent = (card.numberCorrect / (card.numberCorrect + card.numberIncorrect) * 100)
                                        }

                                        return (
                                            <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 ? "card-grid-item bg-zinc-800 border border-neutral-700" : "card-grid-item bg-sky-900 border border-sky-600 overflow-hidden"}>
                                                <h3 id='card-grid-item-h3' className="text-neutral-200 font-bold">{card.front}</h3>
                                                <div id='card-grid-percent-outer' className="bg-neutral-900">
                                                    <div
                                                        id='card-grid-percent-inner'
                                                        style={{ width: `${percent}%`, height: `100%` }}
                                                        className={percent < 80 ? "bg-yellow-500" : "bg-sky-500"}
                                                    >
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                })}
                            </Collapsible>
                        )
                    }
                })}
                {flashcards && folders.map((folder) => {
                    if (folder === 'Miscellaneous') {
                        return (
                            <Collapsible key={folder} title={folder} open={false}>
                                {flashcards.map((card) => {
                                    if (card.folder == 'Miscellaneous') {
                                        let percent = 0
                                        if (card.numberIncorrect != 0 && card.numberCorrect == 0) {
                                            percent = 0
                                        }
                                        if (card.numberIncorrect == 0 && card.numberCorrect > 0) {
                                            percent = 100
                                        }
                                        if (card.numberIncorrect != 0 && card.numberCorrect != 0) {
                                            percent = (card.numberCorrect / (card.numberCorrect + card.numberIncorrect) * 100)
                                        }

                                        return (
                                            <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 ? "card-grid-item bg-zinc-800 border border-neutral-700" : "card-grid-item bg-sky-900 border border-sky-600 overflow-hidden"}>
                                                <h3 id='card-grid-item-h3' className="text-neutral-200 font-bold">{card.front}</h3>
                                                <div id='card-grid-percent-outer' className="bg-neutral-900">
                                                    <div
                                                        id='card-grid-percent-inner'
                                                        style={{ width: `${percent}%`, height: `100%` }}
                                                        className={percent < 80 ? "bg-yellow-500" : "bg-sky-500"}
                                                    >
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    }
                                })}
                            </Collapsible>
                        )
                    }
                })}
                <Link href={"/flashcards/create"} className="absolute bottom-1 right-1 w-12 rounded-full aspect-square text-center text-white text-4xl leading-[42px] font-light">
                    +
                </Link>
            </div>
        </div>
    )
}

export default Flashcards