import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { decrypt, getUserSession } from '../../session';
import { fetchAddressesList } from '../actions/fetchAddressesList';
import StreetNameList from '@/components/StreetNameList';
import StreetNameNotFound from '@/components/StreetNameNotFound';
import {default as BgImage} from 'next/image'
const page = async () => {
    const cookieStore = cookies();
    const { userDetails: { streetAddress } } = await decrypt(cookieStore.get('session')?.value);
    const addressesList = await fetchAddressesList(streetAddress.replace(/\d+$/, '').trim());
    

    return (<div className='flex flex-col gap-4 bg-[#F8F8F8]'>
        <div className='h-[44px] w-[100%] flex flex-col justify-center'>
            <BgImage  src="/ebwo-logo.svg"
      width={70}
      height={35}
      style={{ marginLeft : "16px"}}
      alt="picture of ebwo logo"></BgImage></div>
        <div className='flex flex-col ml-[16px]'>
            <span className='text-[#1F1F25] text-title-main font-semiBold'>{`Waste Calender ${new Date().getFullYear()}`}</span>
            <span className='text-[#63636B] text-regular-normal-medium font-normal'>{`Street your street`}</span>
        </div>
        <div className='bg-[#FFFFFF] rounded-t-[2.5rem]'>
            {addressesList.length === 0 && <StreetNameNotFound/>}
            {addressesList.length > 0 && <StreetNameList addressesList={addressesList}/>}
        </div>
    </div>)
    if(addressesList.length === 0){
        return <StreetNameNotFound></StreetNameNotFound>
    }
    if (addressesList.length > 0)  // add 2nd condition here backend process: parse the endpoint and check for if results ar found
        return <StreetNameList addressesList={addressesList}/>

    if (streetAddress && notFound) {
        return (
        <>
            <p>StreetName could not be fetched from the ebwo website.</p>
            <button>Navigate to EBWO website</button>
        </>
        )
    }

    redirect('https://www.ebwo.de/de/abfallkalender/2024')
}

export default page