'use client'

import React, { Suspense } from 'react'

import BlogPage from '../components/BlogPage'

export default function Page() {
    return (
        <Suspense>
            <BlogPage />
        </Suspense>
    )
}
