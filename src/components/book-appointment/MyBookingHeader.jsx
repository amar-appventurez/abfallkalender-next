import { useTranslations } from 'next-intl'
import React from 'react'

const MyBookingHeader = () => {
    const bookT=useTranslations('Booking')
  return (
    <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
    <div className="flex flex-grow justify-center">
      <span className="text-title3 text-title-large-1">{bookT('my-bookings')}</span>
    </div>
    <img src="search copy.svg" alt="header" />
  </div>

  )
}

export default MyBookingHeader