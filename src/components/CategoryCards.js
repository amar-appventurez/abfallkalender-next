"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {default as BgImage} from 'next/image'
import DateList from './DatesList';
import { setReminder } from '@/app/actions/setReminder';
import { useTranslations } from 'next-intl';
import { removeReminder } from '@/app/actions/removeReminder';

const CategoryCards = ({ addressDetails, streetUrl, streetId }) => {
  const streetDetailsTranslations= useTranslations('StreetDetailsPage');
  const [categoryData, setCategoryData] = useState(null);
  const router=useRouter()
  // const [reminderStreetUrl, setReminderStreetUrl]= useState()
  // const [reminderCategory, setReminderCategory]= useState()
  const [showApiMessage, setShowApiMessage] = useState(false);
  const [apiMessage,setApiMessage]= useState();
  const [apiMessageTitle,setApiMessageTitle]= useState();
  useEffect(() => {
   
    if (addressDetails) {
      const reminderDates= addressDetails?.reminderData.length > 0  ? addressDetails?.reminderData.map(({waste_category_id})=> {return waste_category_id}) : [];
      const mapper = Object.keys(addressDetails?.dates).map((key, index) => {
        return { id: index + 1, categoryName: key, dates: addressDetails?.dates[`${key}`] , hasReminder: reminderDates.includes(index+1)  }
      })
      setCategoryData(mapper);
    }
  }, [addressDetails])

  const handleReminder= (hasReminder,category)=>{
    // setReminderStreetUrl(streetUrl);
    // setReminderCategory(category);
    if(hasReminder){
      const removeReminderFeedback=removeReminder(streetUrl,category)
      setShowApiMessage(true);
      if(removeReminderFeedback){
        setApiMessage(`${streetDetailsTranslations('reminder-removed-message')}`);
        setApiMessageTitle(`${streetDetailsTranslations('reminder-removed-message-title')}`);
        setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = false} return _ }));
        router.refresh(`/view-details?dataUrl=${streetUrl}`);
      }else{
        setApiMessage("Some error occured while calling reminder api");
      }
    }
    else{
      const reminderFeedback=setReminder(streetUrl,category)
      setShowApiMessage(true);
      if(reminderFeedback){
        setApiMessage(`${streetDetailsTranslations('reminder-confirmed-message')}`);
        setApiMessageTitle(`${streetDetailsTranslations('reminder-confirmed-message-title')}`)
        setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = true} return _ }));
        router.refresh(`/view-details?dataUrl=${streetUrl}`);
      }
      else{
        setApiMessage("Some error occured while calling remove reminder api");
      }
      
    }
  }

  useEffect(()=>{
    if(showApiMessage){
      setTimeout(()=>{
        setShowApiMessage(false);
      },2500)
    }
  },[showApiMessage])

 
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
              {<button className={`${showApiMessage && "disabled"}`} onClick={()=>{ handleReminder(hasReminder,id) }}><BgImage src={`${hasReminder ? 'bell-cancelled.svg' : '/bell.svg'}`} width={20} height={20} alt="image of a post envelope"/></button>}
            </div>
          </div>
          <div className="bg-[#F8F8F8] rounded-lg py-3 px-[14px]">
            <DateList dates={dates}/>
          </div>
        </div>
      ))}
    </div>
    { showApiMessage && <div className='fixed bottom-[5vh] w-[100%] flex bg-[#000] text-white rounded-lg text-regular-normal-medium gap-1 px-[12px] py-[8px] font-semiBold'><BgImage src='/info.svg' width={24} height={24} alt="icon of information"/><div><span className='font-semiBold'>{`${apiMessageTitle}`}</span><span className='font-semiBold'>{`${apiMessage}`}</span></div></div>}
  </>
  );
};

export default CategoryCards;
