'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {

    const router = useRouter()

    interface Flashcard {
        id: string
        learningLanguage: string
        nativeLanguage: string
        numberCorrect: number
        numberIncorrect: number
    }

    const path = usePathname()
    const cardName = decodeURIComponent(path)

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [card, setCard] = useState<Flashcard>()
    const [checked, setChecked] = useState(false)
    const [valueToCheck, setValueToCheck] = useState('')
    const [isCorrect, setIsCorrect] = useState(false)
    const [alert, setAlert] = useState(false)

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
            const cardToSet = flashcards.find(card => card.learningLanguage === cardTitle[cardTitle.length - 1])
            setCard(cardToSet)
        }
    }, [flashcards, cardName])

    useEffect(() => {
        if (flashcards.length > 0) {
            localStorage.setItem('flashcards', JSON.stringify(flashcards))
        }
    }, [flashcards])

    const checkCard = () => {
        if (card) {
            console.log(valueToCheck, card.nativeLanguage)
            if (valueToCheck.toLowerCase() == card.nativeLanguage.toLowerCase()) {
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
        router.push(`/flashcards/${flashcards[n].learningLanguage}`)
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
            <div className="w-full flex-1 flex flex-col items-center justify-center sm:justify-center gap-3 p-3 pt-[64px]">
                <div id='card'>
                    <div id='card-inner' className={checked ? 'card-hover' : 'none'}>
                        <div id='card-front'>
                            <h1 className="card-info text-white">{card?.learningLanguage}</h1>
                            <button className='absolute bottom-3 right-3 bg-red-600 rounded-full rotate-45 text-white font-bold text-[28px] pb-[3px] leading-[0px] text-center w-[36px] h-[36px]' onClick={() => setAlert(true)}>+</button>
                        </div>
                        <div id='card-back'>
                            <h1 id='card-back-header'>
                                {card?.learningLanguage}
                            </h1>
                            <div id='card-back-inner'>
                                <h1 className="card-info text-white">{card?.nativeLanguage}</h1>
                                <h1 className={isCorrect ? 'card-info text-green-500' : 'card-info text-red-500 line-through'}>{valueToCheck.charAt(0).toUpperCase() + valueToCheck.slice(1)}</h1>
                            </div>
                            <button className='absolute bottom-3 right-3 bg-red-600 rounded-full rotate-45 text-white font-bold text-[28px] pb-[3px] leading-[0px] text-center w-[36px] h-[36px]' onClick={() => setAlert(true)}>+</button>
                        </div>
                    </div>
                </div>
                {!checked ? (
                    <div id='card-check-container'>
                        <input className="bg-transparent text-2xl text-neutral-200 card-input text-center border-b border-b-neutral-700 font-light px-2 py-1 rounded-none" placeholder='What is this in English?' onChange={(e) => {setValueToCheck(e.target.value)}} />
                        <button className="bg-blue-700 text-white rounded px-2 py-1 font-bold w-1/3 max-w-[500px]" onClick={checkCard}>Submit</button>
                    </div>
                ) : (
                    <div id='card-check-container'>
                        <button className="bg-blue-700 text-white rounded px-2 py-1 font-bold w-1/3 max-w-[500px]" onClick={newCard}>New Card</button>
                    </div>
                )}
            </div>
            {alert ? (
                <div id='alert-container'>
                    <div className='alert-box'>
                        <h1 className='alert-box-h1 text-white'>Are you sure you want to delete this question?</h1>
                        <div className='alert-box-buttons'>
                            <button className='alert-delete-confirm' onClick={removeCard}>Yes</button>
                            <button className='alert-delete-deny' onClick={() => {setAlert(false)}}>No</button>
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