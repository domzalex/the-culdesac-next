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
        <div className='flex-1 relative flex flex-col chatBg iconBg'>
            <div className="w-full mt-[52px] flex flex-col overflow-y-scroll divide-y divide-neutral-700">
            {/* <div className="w-full mt-[52px] flex flex-col overflow-y-scroll"> */}
                {flashcards ? (
                    <Collapsible title="All Cards" open={true} cards={flashcards}>
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

                            let splitCardOne
                            let splitCardTwo
                            if (card.front) {
                                let split = card.front.match(/([^\(\)]+)|(\([^)]*\))/g)
                                if (split) {
                                    splitCardOne = split[0]
                                    splitCardTwo = split[1]
                                } else {
                                    splitCardOne = card.front
                                    splitCardTwo = ''
                                }
                            }

                            return (
                                <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 && card.numberIncorrect > 0 ? "card-grid-item backdrop-blur-sm bg-zinc-800 p-1" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "card-grid-item bg-neutral-900 border border-neutral-800 p-[3px]" : "card-grid-item bg-sky-400/30 border border-sky-400/30 flex justify-center overflow-hidden backdrop-blur-sm p-1"}>
                                    {percent >= 80 ? (
                                        <div className="shineBg z-0"></div>
                                    ) : card.numberCorrect == 0 && card.numberIncorrect == 0 ? (
                                        <div className="newTag bg-red-600 text-neutral-200 font-bold rounded absolute right-[-5px] top-[-5px]">New!</div>
                                    ) : (
                                        <></>
                                    )}
                                    <h3 id='card-grid-item-h3' className="relative text-neutral-200 font-light z-1">{splitCardOne}</h3>
                                    {percent < 80 ? (
                                    <div id='card-grid-percent-outer' className={percent < 80 && card.numberIncorrect > 0 ? "relative z-1 bg-zinc-700" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "relative z-1 bg-zinc-800" : "relative z-1 bg-sky-950"}>
                                        <div
                                            id='card-grid-percent-inner'
                                            style={{ width: `${percent}%`, height: `100%` }}
                                            className={percent < 80 ? "relative pulseBg rounded-lg z-1" : "relative bg-sky-400/85 rounded-lg z-1"}
                                        >
                                        </div>
                                    </div>
                                    ) : <></>}
                                </Link>
                            )
                        })}
                    </Collapsible>
                ) : (
                    <></>
                )}
                {flashcards && folders.map((folder) => {
                    if (folder !== 'Miscellaneous') {
                        let cards = flashcards.filter((card) => card.folder !== 'Miscellaneous')
                        return (
                            <Collapsible key={folder} title={folder} open={false} cards={cards}>
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

                                        let splitCardOne
                                        let splitCardTwo
                                        if (card.front) {
                                            let split = card.front.match(/([^\(\)]+)|(\([^)]*\))/g)
                                            if (split) {
                                                splitCardOne = split[0]
                                                splitCardTwo = split[1]
                                            } else {
                                                splitCardOne = card.front
                                                splitCardTwo = ''
                                            }
                                        }

                                        return (
                                            <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 && card.numberIncorrect > 0 ? "card-grid-item backdrop-blur-sm bg-zinc-800 p-1" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "card-grid-item bg-neutral-900 border border-neutral-800 p-[3px]" : "card-grid-item bg-sky-400/30 border border-sky-400/30 flex justify-center overflow-hidden backdrop-blur-sm p-1"}>
                                                {percent >= 80 ? (
                                                    <div className="shineBg z-0"></div>
                                                ) : card.numberCorrect == 0 && card.numberIncorrect == 0 ? (
                                                    <div className="newTag bg-red-600 text-neutral-200 font-bold rounded absolute right-[-5px] top-[-5px]">New!</div>
                                                ) : (
                                                    <></>
                                                )}
                                                <h3 id='card-grid-item-h3' className="relative text-neutral-200 font-light z-1">{splitCardOne}</h3>
                                                {percent < 80 ? (
                                                <div id='card-grid-percent-outer' className={percent < 80 && card.numberIncorrect > 0 ? "relative z-1 bg-zinc-700" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "relative z-1 bg-zinc-800" : "relative z-1 bg-sky-950"}>
                                                    <div
                                                        id='card-grid-percent-inner'
                                                        style={{ width: `${percent}%`, height: `100%` }}
                                                        className={percent < 80 ? "relative pulseBg rounded-lg z-1" : "relative bg-sky-400/85 rounded-lg z-1"}
                                                    >
                                                    </div>
                                                </div>
                                                ) : <></>}
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
                        let cards = flashcards.filter((card) => card.folder == 'Miscellaneous')
                        return (
                            <Collapsible key={folder} title={folder} open={false} cards={cards}>
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

                                        let splitCardOne
                                        let splitCardTwo
                                        if (card.front) {
                                            let split = card.front.match(/([^\(\)]+)|(\([^)]*\))/g)
                                            if (split) {
                                                splitCardOne = split[0]
                                                splitCardTwo = split[1]
                                            } else {
                                                splitCardOne = card.front
                                                splitCardTwo = ''
                                            }
                                        }

                                        return (
                                            <Link key={card.id} href={`/flashcards/${card.front}`} className={percent < 80 && card.numberIncorrect > 0 ? "card-grid-item backdrop-blur-sm bg-zinc-800 p-1" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "card-grid-item bg-neutral-900 border border-neutral-800 p-[3px]" : "card-grid-item bg-sky-400/30 border border-sky-400/30 flex justify-center overflow-hidden backdrop-blur-sm p-1"}>
                                                {percent >= 80 ? (
                                                    <div className="shineBg z-0"></div>
                                                ) : card.numberCorrect == 0 && card.numberIncorrect == 0 ? (
                                                    <div className="newTag bg-red-600 text-neutral-200 font-bold rounded absolute right-[-5px] top-[-5px]">New!</div>
                                                ) : (
                                                    <></>
                                                )}
                                                <h3 id='card-grid-item-h3' className="relative text-neutral-200 font-light z-1">{splitCardOne}</h3>
                                                {percent < 80 ? (
                                                <div id='card-grid-percent-outer' className={percent < 80 && card.numberIncorrect > 0 ? "relative z-1 bg-zinc-700" : card.numberCorrect == 0 && card.numberIncorrect == 0 ? "relative z-1 bg-zinc-800" : "relative z-1 bg-sky-950"}>
                                                    <div
                                                        id='card-grid-percent-inner'
                                                        style={{ width: `${percent}%`, height: `100%` }}
                                                        className={percent < 80 ? "relative pulseBg rounded-lg z-1" : "relative bg-sky-400/85 rounded-lg z-1"}
                                                    >
                                                    </div>
                                                </div>
                                                ) : <></>}
                                            </Link>
                                        )
                                    }
                                })}
                            </Collapsible>
                        )
                    }
                })}
                <Link href={"/flashcards/create"} className="absolute bottom-6 right-6 text-center text-neutral-200 text-4xl border-none font-light">
                    +
                </Link>
            </div>
        </div>
    )
}

export default Flashcards