const mapPinIcon = "map-pin.svg";
const sendIcon = "send.svg";
const bookingIcon = "user.svg";
const calenderClockIcon = "calendar-clock.svg";

import { useTranslations } from 'next-intl';
import React from 'react'

export const Loading = () => {
  const bookingT=useTranslations("Booking")
  const filters=[
    { id: 0, name: "All", isActive: true }, // Default to "All"
    { id: 1, name: "Upcoming", isActive: false },
    { id: 2, name: "Completed", isActive: false },
  ];
  return ( <>

    <div className="flex flex-col px-[16px] bg-bg-secondary pb-[4rem]">
    <div className="flex flex-row items-center mt-[24px]">
      <span className="text-title3 font-semiBold text-title-large">{bookingT('my-bookings')}</span>
    </div>

    {/* Filter Section */}
    <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto">
      {filters.map((item, index) => (
        <div
          key={index}
       
          className={`flex flex-row py-[4px] px-[14px] whitespace-nowrap font-normal text-title-tight rounded-2xl cursor-pointer 
            
text-title3 bg-white
          `}
        >
          {item.name}
        </div>
      ))}
    </div>

    {Array.from({length:4})?.map((item, index) => {
      return (
        <div
          className="flex flex-col p-[16px] bg-white animate-pulse rounded-xl mt-[20px]"
          key={index}
        >
          <div className="flex flex-row items-center gap-[12px] animate-pulse">
            <img className="size-10" src={bookingIcon} alt="bg-image" />
            <div className="flex flex-col gap-[4px]">
              <span className="text-title3 font-bold-500 text-title-tight">
                {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}
              </span>
              <span className="py-[2px] px-[8px] bg-custom-blue-100 text-bg-booking-blue font-bold-500 text-title-5 rounded-md">
                {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-bg-secondary mt-[16px] p-[12px] rounded-lg gap-[12px]">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[8px]">
                <img className="size-[18px]" src={calenderClockIcon} alt="calender-clock" />
                <div className="flex flex-col gap-[4px]">
                  <span className="text-title3 font-bold-500 text-title-6">{<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp; </>}</span>
                  <span className="text-text-secondary font-normal text-title-7">{<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}</span>
                </div>
              </div>
              <div className="bg-bg-upcoming py-[2px] px-[8px] rounded-md text-bg-booking-blue font-bold-500 text-title-5 flex items-center justify-center">
                {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}
              </div>
            </div>
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[8px]">
                <img className="size-[18px]" src={mapPinIcon} alt="map-pin" />
                <div className="flex flex-col gap-[4px]">
                  <span className="text-title3 font-bold-500 text-title-6">{<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}</span>
                  <span className="text-text-secondary font-normal text-title-7">{<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  &nbsp; &nbsp; &nbsp;</>}</span>
                </div>
              </div>
              <img className="size-[18px]" src={sendIcon} alt="send" />
            </div>
          </div>
        </div>
      );
    })}
  </div>
  </>
  )
}

export default Loading