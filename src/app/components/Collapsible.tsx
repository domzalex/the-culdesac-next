'use client'

import { PropsWithChildren, useState } from "react"

export const Collapsible = ({ children, title, open }: PropsWithChildren & { title: string, open: boolean }) => {
    const [isOpen, setIsOpen] = useState(open)
    return (
        <div className="flex flex-col w-full gap-3">
            <p onClick={() => setIsOpen((value) => !value)} className="font-bold text-neutral-200 flex gap-2">{title} {!isOpen ? <p className="pt-1 font-black text-neutral-500">^</p> : <p className="pt-1 font-black text-neutral-500 transform rotate-180">^</p>}</p>
            {isOpen && <div className="w-full flex flex-wrap gap-3">{children}</div>}
        </div>
    )
}