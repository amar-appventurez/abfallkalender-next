"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Endpoints } from '@/constants/Endpoint';
const StreetNameNotFound = () => {
    const router= useRouter();
    return (
        <div className='flex flex-col items-center mt-12'>
            <span className='text-center mb-8'>StreetName could not be fetched from the ebwo website.</span>
            <button onClick={() => { router.push(`${Endpoints.ebwoOrigin}/${new Date().getFullYear()}`); }} className=' w-full py-2 px-4 text-white bg-bg-booking-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg transition duration-300'>Navigate to EBWO website</button>
        </div>
    )
}

export default StreetNameNotFound