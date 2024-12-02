// components/AbfallkalenderButtons.js

"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const StreetNameList = ({addressesList}) => {

  const router = useRouter();

  const [data,setData] = useState(addressesList ?? null);

  useEffect(()=>{
    if(addressesList){
        console.log("Addresses list",addressesList);
        setData(addressesList);
    }

  },[addressesList])

  const handleButtonClick = (url) => {
    // Redirect to the URL when a button is clicked
    router.push(url);
  };

  return (
    <div className="p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Select your street</h1>
      <div className="space-y-3">
        {data?.map((item, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(item.dataUrl)}
            className="w-full py-2 px-4 text-white bg-bg-booking-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg transition duration-300"
          >
            {item.placeholder}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StreetNameList;
