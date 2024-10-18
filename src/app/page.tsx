'use client'

import React from 'react'

import System from './components/System'

export default function Home() {

    return (
        <div className='bg-gray-100 flex-1 relative flex flex-col sm:items-center chatBg'>
            <div className='flex sm:h-full sm:flex-col p-3 sm:p-3 gap-3 sm:pt-16 overflow-y-scroll'>

                <System />

                <div id='news' className='flex flex-col bg-neutral-800 border border-neutral-700 w-1/3 sm:w-full h-[350px] sm:h-1/2 max-w-[600px] rounded overflow-hidden'>
                    <div className='w-full p-3 sm:p-2 border-b border-b-neutral-700'>
                        <h1 className='font-bold text-xl sm:text-sm text-neutral-200'>Recent News</h1>
                    </div>
                    <div className='overflow-y-scroll flex-1 w-full'>
                        <div className='w-full divide-y divide-neutral-700 max-w-[600px]'>
                            <div className='p-3 sm:p-2 py-9 sm:py-6 flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-neutral-200 text-lg sm:text-xs font-bold'>Dashboard Concepts</h2>
                                    <p className='text-neutral-600 text-sm sm:text-xs'>17 Oct 2024, 11:14PM EST</p>
                                </div>
                                <p className='text-neutral-400 font-light sm:text-xs'>The site will begin to slowly roll out changes to the homepage.<br></br><br></br>These changes include a recent news section where you can find brief notes about new features or other updates, and also a system status module that displays the CPU and memory usage for the machine the site runs on.</p>
                            </div>
                            {/* <div className='p-3 sm:p-2 py-9 sm:py-6 flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-neutral-200 text-lg sm:text-xs font-bold'>Test Headline</h2>
                                    <p className='text-neutral-600 text-sm sm:text-xs'>03 Feb 2024, 02:24:19PM EST</p>
                                </div>
                                <p className='text-neutral-400 font-light sm:text-xs'>Fusce tempus nisi sagittis nisi semper, id consectetur nulla ultricies. Aliquam sit amet arcu eget lectus cursus pretium. Cras quis mi non magna fringilla porttitor.</p>
                            </div>
                            <div className='p-3 sm:p-2 py-9 sm:py-6 flex flex-col gap-2'>
                                <div className='flex justify-between items-center'>
                                    <h2 className='text-neutral-200 text-lg sm:text-xs font-bold'>Test Headline</h2>
                                    <p className='text-neutral-600 text-sm sm:text-xs'>03 Feb 2024, 02:24:19PM EST</p>
                                </div>
                                <p className='text-neutral-400 font-light sm:text-xs'>Fusce tempus nisi sagittis nisi semper, id consectetur nulla ultricies. Aliquam sit amet arcu eget lectus cursus pretium. Cras quis mi non magna fringilla porttitor.</p>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
