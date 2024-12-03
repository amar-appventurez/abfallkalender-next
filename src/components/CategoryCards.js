"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const CategoryCards = ({addressDetails}) => {
  const [categoryData, setCategoryData]= useState(null);
  const [activeCard, setActiveCard] = useState(1);
  const router= useRouter();
  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(()=>{
  
   if(addressDetails){
    const mapper= Object.keys(addressDetails).filter((key)=> key!=='streetName').map((key,index)=>{
      return {id: index+1, categoryName: key , dates: addressDetails[`${key}`]}
    })
    setCategoryData(mapper);
   }
  },[addressDetails])
  return (<>
      <div className="flex flex-col gap-2 mx-4 min-w-[90%]">
        {categoryData?.map(({ id, categoryName }) => (
          <div
            key={id}
            className={`rounded-lg px-4 cursor-pointer transition-all duration-300 ${
              activeCard === id
                ? 'bg-[#f5deb3] py-[0.5rem]'
                : 'bg-bg-secondary'
            }`}
            onClick={() => handleCardClick(id)}
          >
            <span className="text-xl font-semibold">{categoryName}</span>
            {activeCard === id && categoryData?.map(({ id, dates }) => (
          <div
            key={id}
            className={`w-full transition-all duration-100 ease-in-out ${
              activeCard === id
                ? 'opacity-100 mb-2 min-w-[90%]'
                : 'hidden'
            }`}
          >
            <div className="bg-white rounded-lg py-4 bg-gray-100">
              <ul className="flex gap-2 px-[0.5rem]">
                {dates?.map((date) => (
                  <li key={date} className="p-2 bg-[#f47922] text-white rounded-lg">
                    {date}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
          </div>
        ))}
      </div>
      <button className='bg-[#217cb5] text-white p-2 mx-auto rounded-lg mt-4' onClick={()=>{router.back()}}>Reset street name</button>
      </>
  );
};

export default CategoryCards;
