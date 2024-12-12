"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { Endpoints } from '@/constants/Endpoint';
import { default as BgImage } from "next/image";
import { useTranslations } from 'next-intl';
const StreetNameNotFound = () => {
    const router = useRouter();
    const streetNotFoundTranslations = useTranslations('StreetNotFoundPage');
    return (
        <>
            <BgImage src="/group-72.svg" width={112} height={112} alt="image of a flagpost" style={{marginTop: 80, marginBottom: 40 , marginLeft: 131.5 }}/>
            <div className='flex flex-col items-center mx-[40px]'>
                
                <span className='text-title-not-found-1 font-semiBold text-center text-[#1F1F25]'>{`${streetNotFoundTranslations('message-1')}`}</span>
                <span className='text-small-tight-regular text-center text-[#63636B]'>{`${streetNotFoundTranslations('message-2')}`}</span>

            </div>
            <button onClick={() => { router.push(`${Endpoints.ebwoOrigin}/${new Date().getFullYear()}`); }} className='w-[90%] mx-[5%] mt-[119px] py-[12px] px-[77.5px] text-white bg-[#F47921] rounded-[100px]'>{`${streetNotFoundTranslations('redirection-button-message')}`}</button>
        </>)
}

export default StreetNameNotFound