"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import LocationSelect from './LocationSelect';
import ServiceDetails from './ServiceDetails';
// import DateCardCarousel from './DateCardCarousel';
import TimingTabs from './TimingsTab';
import PersonalDetails from './PersonalDetails';
import MultiStepForm from './MultiStepForm';

const Header = () => {
    const router = useRouter();
    return (<>
        <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { router.push('/services') }} />
            <div className="flex flex-grow justify-center">
                <span>Service Details</span>
            </div>
            <img src="search copy.svg" alt="header" />
        </div>
        {/* <LocationSelect /> */}
        <ServiceDetails/>
        {/* <DateCardCarousel/> */}
        {/* <TimingTabs/> */}
        {/* <PersonalDetails></PersonalDetails> */}
       
    </>
    )
}

export default Header;