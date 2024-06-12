'use client'

import React, { Suspense } from 'react'
import BlogEdit from '@/app/components/BlogEdit'

export default function Page() {
    return (
        <Suspense>
            <BlogEdit />
        </Suspense>
    )
}