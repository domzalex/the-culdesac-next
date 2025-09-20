'use client'

import Link from "next/link"
import { PropsWithChildren, useState } from "react"

interface Flashcard {
    id: string
    front: string
    back: string
    numberCorrect: number
    numberIncorrect: number,
    folder: string 
}

export const Collapsible = ({ children, title, open, cards }: PropsWithChildren & { title: string, open: boolean, cards: Flashcard[] }) => {
    const [isOpen, setIsOpen] = useState(open)
    const rndCardIndex = Math.floor(Math.random() * ((cards.length - 1) - 0 + 1)) + 0
    return (
        <div className="flex flex-col w-full">
            <div className={isOpen || title === 'Miscellaneous' ? "flex items-center justify-between bg-neutral-800/50 px-3 pt-3 pb-2 border-b border-neutral-700 backdrop-blur-sm" : "flex items-center justify-between bg-neutral-800/50 px-3 pt-3 pb-2 backdrop-blur-sm"}>
                <p onClick={() => setIsOpen((value) => !value)} className={isOpen ? "font-bold text-neutral-200 flex gap-2 flex-1" : "font-bold text-neutral-700 flex gap-2 flex-1"}>{title} {!isOpen ? <p className="pt-1 font-black text-neutral-500">^</p> : <p className="pt-1 font-black text-neutral-500 transform rotate-180">^</p>}</p>
                <Link href={`/flashcards/folders/${title}`} className={isOpen ? "text-neutral-300 font-bold text-xs underline" : "text-neutral-700 font-bold text-xs underline"}>start!</Link>
            </div>
            {isOpen && <div className={title !== 'Miscellaneous' ? "w-full flex flex-wrap gap-3 p-3 bg-neutral-950/40" : "w-full flex flex-wrap gap-3 p-3 bg-neutral-950/40 border-b border-neutral-700"}>{children}</div>}
        </div>
    )
}