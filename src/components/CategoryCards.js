"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {default as BgImage} from 'next/image'
import DateList from './DatesList';

const CategoryCards = ({ addressDetails }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [activeCard, setActiveCard] = useState(1);
  const router = useRouter();
  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(() => {

    if (addressDetails) {
      const mapper = Object.keys(addressDetails).filter((key) => key !== 'streetName').map((key, index) => {
        return { id: index + 1, categoryName: key, dates: addressDetails[`${key}`] }
      })
      setCategoryData(mapper);
    }
  }, [addressDetails])
  return (<>
    <div className="flex flex-col gap-6 mx-4 min-w-[90%] mt-4 mb-4">
      {categoryData?.map(({ id, categoryName, dates }) => (
        <div
          key={id}
          className={`rounded-lg`}
        >
          <div className='flex justify-between mb-2'>
            <span className="font-semiBold text-regular-normal-medium">{categoryName}</span>
            <div className='flex items-center'>
              <span className='text-[#F47921] text-semiBold text-title-tight'>{`Add`}</span>
              <BgImage src="/Frame.svg" width={20} height={20} alt="image of a post envelope"/>
            </div>
          </div>
          <div className="bg-[#F8F8F8] rounded-lg py-3 px-[14px]">
            <DateList dates={dates}/>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default CategoryCards;
