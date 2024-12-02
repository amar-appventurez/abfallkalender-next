import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { decrypt, getUserSession } from '../../session';
import { fetchAddressesList } from '../actions/fetchAddressesList';
import StreetNameList from '@/components/StreetNameList';
import StreetNameNotFound from '@/components/StreetNameNotFound';
const page = async () => {
    const cookieStore = cookies();
    const { userDetails: { streetAddress } } = await decrypt(cookieStore.get('session')?.value);
    const addressesList = await fetchAddressesList(streetAddress.replace(/\d+$/, '').trim());
   
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