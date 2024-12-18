import React from 'react'
import { useTranslations } from 'next-intl'
const HomePageHeader = () => {
    const homePageTranslations = useTranslations('HomePage');
    return (
        <div className='flex flex-col ml-[16px]'>
            <span className='text-[#1F1F25] text-title-main font-semiBold'>{`${homePageTranslations('waste-calender')} ${new Date().getFullYear()}`}</span>
            <span className='text-[#63636B] text-regular-normal-medium font-normal'>{`${homePageTranslations('select-your-street')}`}</span>
        </div>
    )
}

export default HomePageHeader