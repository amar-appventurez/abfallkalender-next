import React from 'react'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import {decrypt, getUserSession} from '../../session';

const page = async () => {
    const cookieStore= cookies();
    const { userDetails: { streetAddress } } = await decrypt(cookieStore.get('session')?.value);
    if (streetAddress)  // add 2nd condition here backend process: parse the endpoint and check for if results ar found
        return (redirect(`https://www.ebwo.de/de/abfallkalender/2024/?sTerm=${streetAddress.replace(/\d+$/, '').trim()}`))
    redirect('https://www.ebwo.de/de/abfallkalender/2024')

}

export default page