import React from 'react'
import Header from "../../components/services-details/Header"
import { useTranslations } from 'next-intl'
const Loading = () => {
  const serviceDT= useTranslations('ServiceDetails')
  const serviceDetailsSkeleton=[{},{}]
  return (
    <>
      <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" />
            <div className="flex flex-grow justify-center">
                <span>{serviceDT('service-details')}</span>
            </div>
            <img src="search copy.svg" alt="header" />
        </div>
        <div className='px-[16px] py-[20px] bg-white'>
            <div className='flex flex-col gap-[12px]'>
            <div className="cursor-pointer w-[24px] h-[24px] animate-pulse bg-slate-200"></div>
            <span className='text-large-none-semibold text-semibold w-[50px] h-[20px]  animate-pulse bg-slate-200'>{""}</span>
            <span className='text-bg-booking-blue text-title-5 py-[2px] px-[8px] bg-custom-blue-100 rounded-md w-fit-content w-[150px] h-[20px] animate-pulse'>{""}</span>
            </div>
        </div>
    <div className="container mx-auto px-4 py-8  bg-bg-secondary h-[500px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceDetailsSkeleton.map((service) => (
          <div key={service.id} className="col-span-1">
            <p className="font-bold-500 text-header-description m-0 p-4 w-[100px] h-[22px]">{""}</p>
            <div className="bg-white shadow-md rounded-lg p-4 w-[343px] animate-pulse h-[200px]">
            </div>
          </div>
        ))}
      </div>

     
      <div className="text-center mt-8">
     

        <button class="flex items-center justify-center px-4 py-2 bg-worms-blue text-white border-none rounded-xl cursor-pointer relative w-bottom-nav-button h-bottom-nav-button">
          <span class="flex-1 text-center text-white"> {serviceDT('select-location')}</span>
          <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
        </button>
      </div>

    </div>
    </>);
}

export default Loading