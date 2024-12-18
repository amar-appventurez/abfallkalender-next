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
      const reminderDates= addressDetails?.reminderData?.length > 0  ? addressDetails?.reminderData.map(({waste_category_id})=> {return waste_category_id}) : [];
      const mapper = Object.keys(addressDetails?.dates).map((key, index) => {
        return { id: index + 1, categoryName: key, dates: addressDetails?.dates[`${key}`] , hasReminder: reminderDates.includes(index+1)  }
      })
      setCategoryData(mapper);
    }
  }, [addressDetails])

  const handleReminder= async (hasReminder,category)=>{
    // setReminderStreetUrl(streetUrl);
    // setReminderCategory(category);
    if(hasReminder){
      setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = false} return _ }));
      const removeReminderFeedback=await removeReminder(streetUrl,category)
     
      if(removeReminderFeedback){
        setApiMessage(`${streetDetailsTranslations('reminder-removed-message')}`);
        setApiMessageTitle(`${streetDetailsTranslations('reminder-removed-message-title')}`);
      
        router.refresh(`/view-details?dataUrl=${streetUrl}`);
      }else{
        setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = true} return _ }));
        setApiMessage("Some error occured while calling reminder api");
        setApiMessageTitle("Error");
      }
      setShowApiMessage(true);
    }
    else{
      setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = true} return _ }));
      const reminderFeedback=await setReminder(streetUrl,category)
      if(reminderFeedback){
        setApiMessage(`${streetDetailsTranslations('reminder-confirmed-message')}`);
        setApiMessageTitle(`${streetDetailsTranslations('reminder-confirmed-message-title')}`)
        setShowApiMessage(true);
        
        router.refresh(`/view-details?dataUrl=${streetUrl}`);
      }
      else{
        setShowApiMessage(true);
        setApiMessage("Some error occured while calling remove reminder api");
        setCategoryData(categoryData.map((_)=>{ if(_.id === category){ _.hasReminder = false} return _ }));
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
            <span className="font-semiBold text-regular-normal-medium">{streetDetailsTranslations(`category-${id}`)}</span>
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
    { showApiMessage && <div className='fixed bottom-[5vh] mx-[16px] flex bg-[#000] text-white rounded-lg text-regular-normal-medium gap-[10px] px-[12px] py-[8px]'><BgImage src='/info.svg' width={24} height={24} alt="icon of information"/><div><span className='font-semiBold'>{`${apiMessageTitle}`}</span><span>{`${apiMessage}`}</span></div></div>}
  </>
  );
};

export default CategoryCards;
