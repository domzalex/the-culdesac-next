'use client'

import React, { Suspense } from 'react'
import Register from '../components/Register'

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {/* <Register /> */}
        </Suspense>
    )
}