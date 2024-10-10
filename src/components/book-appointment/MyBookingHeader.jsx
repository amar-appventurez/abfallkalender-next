import { useTranslations } from 'next-intl'
import React from 'react'

const MyBookingHeader = () => {
    const bookT=useTranslations('Booking')
  return (
    <div className="flex flex-row items-center py-[12px] px-[16px] bg-white fixed w-[100vw]">
    <div className="flex flex-grow justify-center">
      <span className="text-title3 text-title-large-1">{bookT('my-bookings')}</span>
    </div>
  </div>

  )
}

export default MyBookingHeader