"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { default as BgImage} from 'next/image'

const ViewDetailsHeader = ({streetName}) => {
    const router = useRouter();
    return (
        <div className='flex items-center justify-between w-[90%]'>
            <span className='text-[#1F1F25] text-title-main font-semiBold'>{`${streetName}`}</span>
            <button className='rounded-lg' onClick={() => { router.back() }}><BgImage src="/Signature.svg" width={24} height={24} alt="image of a post envelope" style={{minHeight: 24, minWidth: 24}}/></button>
        </div>
    )
}

export default ViewDetailsHeader