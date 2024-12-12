"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {default as BgImage} from 'next/image'
import DateList from './DatesList';
import { setReminder } from '@/app/actions/setReminder';

const CategoryCards = ({ addressDetails, streetUrl }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [activeCard, setActiveCard] = useState(1);
  const router = useRouter();
  const handleCardClick = (id) => {
    setActiveCard(id);
  };

  useEffect(() => {
   
    if (addressDetails) {
      const reminderDates= addressDetails?.reminderData.length > 0  ? addressDetails?.reminderData.map(({waste_category_id})=> {return waste_category_id}) : [];
      const mapper = Object.keys(addressDetails?.dates).map((key, index) => {
        return { id: index + 1, categoryName: key, dates: addressDetails?.dates[`${key}`] , hasReminder: reminderDates.includes(index+1)  }
      })
      setCategoryData(mapper);
    }
  }, [addressDetails])

    useEffect(()=>{
      console.log("Category data", categoryData)
    },[categoryData])
  console.log("Address details----", addressDetails)
 
  return (<>
    <div className="flex flex-col gap-6 mx-4 min-w-[90%] mt-4 mb-4">
      {categoryData?.map(({ id, categoryName, dates, hasReminder }) => (
        <div
          key={id}
          className={`rounded-lg`}
        >
          <div className='flex justify-between mb-2'>
            <span className="font-semiBold text-regular-normal-medium">{categoryName}</span>
            <div className='flex items-center'>
              <button onClick={()=>{ setReminder(streetUrl, id); console.log("Request sent for reminder") }}><BgImage src={`${hasReminder ? 'bell-cancelled.svg' : '/bell.svg'}`} width={20} height={20} alt="image of a post envelope"/></button>
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
