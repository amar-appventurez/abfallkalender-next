import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { decrypt, getUserSession, updateSessionWithStreetUrl } from '../../session';
import { fetchAddressesList } from '../actions/fetchAddressesList';
import { fetchAddressDetails } from '../actions/fetchAddressDetails';
import CategoryCards from '@/components/CategoryCards';
import { default as BgImage } from 'next/image'
import StreetDetailsPageHeader from '@/components/StreetDetailsPageHeader';


const page = async ({ searchParams }) => {

    const { dataUrl } = searchParams;
    const cookieStore = cookies();
    const { userDetails: { streetAddress } } = await decrypt(cookieStore.get('session')?.value);
    
    
    const addressesDetails = await fetchAddressDetails(dataUrl);

    //update cookie with this street url found on the params
    // await updateSessionWithStreetUrl(dataUrl);
   
    return (<div className='flex flex-col gap-4 bg-[#F8F8F8]'>
        <div className='h-[44px] w-[100%] flex flex-col justify-center'>
            <BgImage src="/ebwo-logo.svg"
                width={70}
                height={35}
                style={{ marginLeft: "16px" }}
                alt="picture of ebwo logo"></BgImage></div>
        <StreetDetailsPageHeader streetName={addressesDetails?.streetName} />
        <div className='bg-[#FFFFFF] rounded-t-[2.5rem]'>
            <CategoryCards addressDetails={addressesDetails} streetUrl={dataUrl} streetId={addressesDetails?.streetName}></CategoryCards>
        </div>
    </div>)
    return (<div className='mt-12 flex flex-col items-center'>
        <span className={'py-4 text-lg font-semiBold'}>{`Pick up dates for ${addressesDetails?.streetName}`}</span>
        <CategoryCards addressDetails={addressesDetails}></CategoryCards>
    </div>)

}

export default page