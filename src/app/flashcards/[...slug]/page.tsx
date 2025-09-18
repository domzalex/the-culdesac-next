'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {

    const router = useRouter()

    interface Flashcard {
        id: string
        front: string
        back: string
        numberCorrect: number
        numberIncorrect: number,
        folder: string 
    }

    const path = usePathname()
    const cardName = decodeURIComponent(path)

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [card, setCard] = useState<Flashcard>()
    const [checked, setChecked] = useState(false)
    const [valueToCheck, setValueToCheck] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [alert, setAlert] = useState(false)

    const [splitOne, setSplitOne] = useState('')
    const [splitTwo, setSplitTwo] = useState('')

    useEffect(() => {
        const cards = localStorage.getItem('flashcards')
        if (cards) {
            const parsedCards = JSON.parse(cards)
            setFlashcards(parsedCards)
        }
    }, [])

    useEffect(() => {
        if (flashcards && flashcards.length > 0) {
            const cardTitle = cardName.split("/")
            const cardToSet = flashcards.find(card => card.front === cardTitle[cardTitle.length - 1])
            setCard(cardToSet)
            if (cardToSet) {
                let split = cardToSet.front.match(/([^\(\)]+)|(\([^)]*\))/g)
                if (split) {
                    setSplitOne(split[0])
                    setSplitTwo(split[1])
                } else {
                    setSplitOne(cardToSet.front)
                    setSplitTwo('')
                }
            }
        }
    }, [flashcards, cardName])

    useEffect(() => {
        if (flashcards.length > 0) {
            localStorage.setItem('flashcards', JSON.stringify(flashcards))
        }
    }, [flashcards])

    const checkCard = () => {
        if (card) {
            if (valueToCheck.toLowerCase() == card.back.toLowerCase()) {
                setIsCorrect(true)
                updateCardCorrect(card.id, 'numberCorrect')
            } else {
                setIsCorrect(false)
                updateCardCorrect(card.id, 'numberIncorrect')
            }
            setChecked(true)
        }
    }

    const updateCardCorrect = (id: string, key: 'numberCorrect' | 'numberIncorrect') => {
        setFlashcards((prevCards: Flashcard[]) =>
            prevCards.map(card =>
                card.id === id ? { ...card, [key]: card[key] + 1 } : card
            )
        )
    }

    const newCard = () => {
        let n = Math.floor(Math.random() * flashcards.length)
        router.push(`/flashcards/${flashcards[n].front}`)
    }

    const removeCard = () => {
        let tempCards = [...flashcards]
        const idx = flashcards.findIndex(crd => crd.id === card?.id)
        if (idx !== -1) {
            tempCards.splice(idx, 1)
            setFlashcards(tempCards)
            localStorage.setItem('flashcards', JSON.stringify(tempCards))
            router.push('/flashcards')
        }
    }

    return (
        <div className='flex-1 relative flex flex-col chatBg'>
            <a href="/flashcards" className="fixed top-[64px] left-3 text-neutral-600 font-bold underline">Back</a>
            <div className="w-full flex-1 flex flex-col items-center justify-center sm:justify-center gap-3 p-3 pt-[104px]">
                <div id='card'>
                    <div id='card-inner' className={checked ? 'card-hover' : 'none'}>
                        <div id='card-front'>
                            <h1 className="card-info text-white text-2xl">{splitOne}</h1>
                            <h2 className="card-info text-neutral-600 font-light">{splitTwo}</h2>
                            <button className='absolute bottom-1 right-1 rotate-45 text-neutral-600 font-light text-[28px] pb-[3px] leading-[0px] text-center w-[36px] h-[36px]' onClick={() => setAlert(true)}>+</button>
                        </div>
                        <div id='card-back'>
                            <h1 id='card-back-header'>
                                {splitOne}
                            </h1>
                            <div id='card-back-inner'>
                                <h1 className="card-info text-white text-xl">{card?.back}</h1>
                                <h1 className={isCorrect ? 'card-info text-emerald-600 text-xl' : 'text-xl card-info text-red-500 line-through'}>{valueToCheck.charAt(0).toUpperCase() + valueToCheck.slice(1)}</h1>
                            </div>
                            <button className='absolute bottom-1 right-1 rotate-45 text-neutral-600 font-light text-[28px] pb-[3px] leading-[0px] text-center w-[36px] h-[36px]' onClick={() => setAlert(true)}>+</button>
                        </div>
                    </div>
                </div>
                {!checked ? (
                    <div id='card-check-container' className='flex gap-3 w-[90%]'>
                        <input className="backdrop-blur-sm w-3/4 bg-neutral-950/20 text-neutral-200 card-input text-center border border-neutral-700 font-light px-2 py-1 rounded" placeholder='What is this in English?' onChange={(e) => {setValueToCheck(e.target.value)}} />
                        <button className="bg-emerald-800 text-white flex-1 rounded px-3 py-2 font-bold" onClick={checkCard}>Submit</button>
                    </div>
                ) : (
                    <div id='card-check-container'>
                        <button className="bg-emerald-800 text-white rounded px-3 py-2 font-bold w-max" onClick={newCard}>New Card</button>
                    </div>
                )}
            </div>
            {alert ? (
                <div id='alert-container'>
                    <div className='flex flex-col divide-y divide-neutral-700'>
                        <h1 className='font-bold text-2xl text-neutral-200 py-6'>Delete Card:</h1>
                        <h2 className='text-xl text-neutral-200 py-6'>Are you sure you want to delete this card?</h2>
                        <div className='flex justify-between py-6'>
                            <button className='bg-red-700 text-neutral-200 font-bold text-xl px-5 py-1 rounded' onClick={removeCard}>Yes</button>
                            <button className='bg-emerald-700 text-neutral-200 font-bold text-xl px-5 py-1 rounded' onClick={() => {setAlert(false)}}>No</button>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </div>
    )
}

export default Page