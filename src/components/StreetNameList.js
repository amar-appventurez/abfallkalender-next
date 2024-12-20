// components/AbfallkalenderButtons.js

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {default as BgImage} from 'next/image';
import { decrypt } from '@/session';

const StreetNameList = ({addressesList, decryptedCookie}) => {

  const router = useRouter();
  const [data,setData] = useState(addressesList ?? null);

  useEffect(()=>{
    if(addressesList){
        setData(addressesList);
    }

  },[addressesList])

  const handleButtonClick =(url) => {
    // Redirect to the URL when a button is clicked
    // router.push(`/view-details?dataUrl=${url}`);
    const {userDetails:{
      token,
      userName,
      email,
      streetAddress,
      encrptedToken
  }} =decryptedCookie;
    const [given_name, family_name]= userName.split(' ');
    const params = new URLSearchParams({
      token: encrptedToken,
      name: userName,
      email,
      given_name,
      family_name,
      street_address: streetAddress,
      street_url: url
    });
    console.log("Street selection made: calling /api/session with updated street url:", url)
    router.push(`/api/session?${params}`)
  };

  return (
    <div className="flex flex-col gap-2 my-[16px]">
      
        {data?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item.dataUrl)}
            className="mx-[16px] py-[12px] px-[14px] bg-[#F8F8F8] text-[#1F1F25] text-regular-normal-medium font-bold-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg transition duration-300"
          >
            <div className='flex justify-between'><span>{item.placeholder}</span><BgImage src='/ic-arrow-right.svg' width={20} height={20}></BgImage></div>
          </button>
        ))}
     
    </div>
  );
};

export default StreetNameList;
