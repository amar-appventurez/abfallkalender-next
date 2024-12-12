"use client"
import React, { useEffect, useState } from 'react'
import ViewDetailsHeader from '@/components/ViewDetailsHeader';
import { useTranslations } from 'next-intl';

const StreetDetailsPageHeader = ({streetName}) => {
    // const [streetName,setStreetName]= useState();
    // useEffect(()=>{
    //     if(addressesDetails?.streetName)
    //     setStreetName(addressesDetails?.streetName)
    // },[addressesDetails])
    const streetDetailsTranslations= useTranslations('StreetDetailsPage');
    return (
        <div className='flex flex-col ml-[16px]'>
            <span className='text-[#63636B] text-regular-normal-medium font-normal'>{`${streetDetailsTranslations('selected-street')}`}</span>
            <ViewDetailsHeader streetName={streetName} />
        </div>
    )
}

export default StreetDetailsPageHeader