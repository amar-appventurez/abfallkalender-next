import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { decrypt, getUserSession } from '../../session';
import { fetchAddressesList } from '../actions/fetchAddressesList';
import { fetchAddressDetails } from '../actions/fetchAddressDetails';
import CategoryCards from '@/components/CategoryCards';

const page = async ({searchParams}) => {
    const {dataUrl}= searchParams;
    const cookieStore = cookies();
    const { userDetails: { streetAddress } } = await decrypt(cookieStore.get('session')?.value);
    const addressesDetails = await fetchAddressDetails(dataUrl);
    return (<div className='mt-12 flex flex-col items-center'>
                <span className={'py-4 text-lg font-semiBold'}>{`Pick up dates for ${addressesDetails?.streetName}`}</span>
                <CategoryCards addressDetails={addressesDetails}></CategoryCards>
            </div>)
}

export default page