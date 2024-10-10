"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import LocationSelect from './LocationSelect';
import ServiceDetails from './ServiceDetails';
// import DateCardCarousel from './DateCardCarousel';
import TimingTabs from './TimingsTab';
import PersonalDetails from './PersonalDetails';
import MultiStepForm from './MultiStepForm';
import { useTranslations } from 'next-intl';

const Header = ({name, category}) => {
    const serviceDTrans= useTranslations('ServiceDetails')
    const router = useRouter();
    return (<div className='fixed w-[100vw]'>
        <div className="flex flex-row items-center px-[16px] py-[12px] bg-white w-[100vw]">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { router.push('/services') }} />
            <div className="flex flex-grow justify-center">
                <span>{serviceDTrans('service-details')}</span>
            </div>
        </div>
        <div className='px-[16px] py-[20px] bg-white w-[100vw]'>
            <div className='flex flex-col gap-[12px]'>
            <img className="cursor-pointer w-[24px]" src='square-user-round.svg' alt="back" onClick={() => { router.push('/services') }} />
            <span className='text-large-none-semibold text-semibold'>{name}</span>
            <span className='text-bg-booking-blue text-title-5 py-[2px] px-[8px] bg-custom-blue-100 rounded-md w-fit-content'>{category}</span>
            </div>
        </div>
       
    </div>
    )
}

export default Header;