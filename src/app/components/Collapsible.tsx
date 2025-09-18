'use client'

import { PropsWithChildren, useState } from "react"

export const Collapsible = ({ children, title, open }: PropsWithChildren & { title: string, open: boolean }) => {
    const [isOpen, setIsOpen] = useState(open)
    return (
        <div className="flex flex-col w-full gap-2">
            <p onClick={() => setIsOpen((value) => !value)} className={isOpen ? "font-bold text-neutral-200 flex gap-2" : "font-bold text-neutral-600 flex gap-2"}>{title} {!isOpen ? <p className="pt-1 font-black text-neutral-500">^</p> : <p className="pt-1 font-black text-neutral-500 transform rotate-180">^</p>}</p>
            {/* <p onClick={() => setIsOpen((value) => !value)} className="font-bold text-neutral-200 flex gap-2 p-3">{title} {!isOpen ? <p className="pt-1 font-black text-neutral-500">^</p> : <p className="pt-1 font-black text-neutral-500 transform rotate-180">^</p>}</p> */}
            {isOpen && <div className="w-full flex flex-wrap gap-6">{children}</div>}
            {/* {isOpen && <div className="w-full flex flex-col">{children}</div>} */}
        </div>
    )
}