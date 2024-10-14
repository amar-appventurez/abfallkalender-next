import { useTranslations } from 'next-intl';
import React from 'react'

const Loading = () => {
  const locationT = useTranslations('Location');
  const serviceDTrans = useTranslations('Location');
  return (
    <>
      <div className="flex flex-row items-center py-[12px] px-[16px] bg-white fixed">
        <img className="cursor-pointer" src='/chevron-left.svg' alt="back"/>
        <div className="flex flex-grow justify-center">
          <span>Booking Details</span>
        </div>
      </div>

      <div className="px-4 py-[20px] w-full">
        <div className='flex flex-col gap-4 mt-[48px]'>
          <div className='flex gap-[12px]'>
            <img src="/square-user-round.svg" alt="user-icon"></img>
            <div className='flex flex-col'>
              <span className='text-small-tight-regular text-bold-500'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <span className='text-bg-booking-blue text-title-5 py-[2px] px-[8px] bg-custom-blue-100 rounded-md w-fit-content'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </div>
          </div>
          <hr className='text-text-secondary' />
          <div className='flex flex-col'>
            <span className='text-text-secondary text-title-5 text-normal'>{locationT('date-time')}</span>
            <div className='flex gap-1'>
              <img className='w-[18px]' src='/calendar-clock.svg'></img>
              <div className='flex flex-col'>
                <span className='text-title-6 text-bold-500 text-title3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {/* <span className='text-text-secondary text-title-7 text-normal'>{"Show time here"}</span> */}
              </div>
            </div>
          </div>
          <div className='flex flex-col'>
            <span className='text-text-secondary text-title-5 text-normal'>{locationT('your location')}</span>
            <div className='flex gap-1'>
              <img className='w-[18px]' src='/map-pin.svg'></img>
              <div className='flex flex-col'>
                <span className='text-title-6 text-bold-500 text-title3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span className='text-text-secondary text-title-7 text-normal'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              </div>
              <div className='flex gap-1'>
                <img src="/send.svg"></img>
                <span className='text-title-6 text-primary text-semiBold'></span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="container mx-auto px-4 py-8  bg-bg-secondary pb-[75px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({length: 3})?.map((_, index) => (
            <div key={index} className="col-span-1">
              <p className="font-bold-500 text-header-description-1 m-0 p-4">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
              <div className="bg-white shadow-md rounded-lg p-4">
                <ul className="list-disc">
                  {Array.from({length:3}).map((item, index) => (
                    <li key={index} className='ml-4'>
                      <p className="font-normal text-small-tight-regular ">{<>&nbsp;&nbsp;&nbsp;&nbsp;</>}{<>{" "}<span className='font-bold-900'>{`€${<>&nbsp;&nbsp;&nbsp;&nbsp;</>}`}</span></>}</p>
                      {<hr className="my-[5px] text-border-color width-[311px]" />}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Select Location Button */}
        <div className="text-center mt-8">

          <button className="flex items-center justify-center px-4 py-2 bg-worms-blue text-white border-none rounded-xl cursor-pointer relative w-[100%] h-bottom-nav-button">
            <span className="flex-1 text-center text-white">{serviceDTrans('select-location')}</span>
            <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
          </button>
        </div>


      </div>

    </>
  )
}

export default Loading