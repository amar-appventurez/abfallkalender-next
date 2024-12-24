import React from 'react'
import { redirect } from 'next/navigation'
import { fetchAddressesList } from '../actions/fetchAddressesList';
import StreetNameList from '@/components/StreetNameList';
import StreetNameNotFound from '@/components/StreetNameNotFound';
import {default as BgImage} from 'next/image'
import HomePageHeader from '@/components/HomePageHeader';
import { fetchUserInfo } from '../actions/fetchUserInfo';
const page = async () => {
    const userInfo= await fetchUserInfo();
    const {streetAddress}= userInfo;
    const searchStreet= streetAddress.replace(/\d+$/, '').trim();
    const addressesList = searchStreet=='' ? []: await fetchAddressesList(searchStreet);
    

    return (<div className='flex flex-col gap-4 bg-[#F8F8F8]'>
        <div className='h-[44px] w-[100%] flex flex-col justify-center'>
            <BgImage  src="/ebwo-logo.svg"
      width={70}
      height={35}
      style={{ marginLeft : "16px"}}
      alt="picture of ebwo logo"></BgImage></div>
       <HomePageHeader/>
        <div className='bg-[#FFFFFF] rounded-t-[2.5rem]'>
            { addressesList.length === 0 && <StreetNameNotFound/>}
            {addressesList.length > 0 && <StreetNameList addressesList={addressesList} />}
        </div>
    </div>);
}

export default page