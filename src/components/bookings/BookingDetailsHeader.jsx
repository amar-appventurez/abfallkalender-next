"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image';
const BookingDetailsHeader = () => {
    const router= useRouter();
  return (
    <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
    <img className="cursor-pointer" src='/chevron-left.svg' alt="back" onClick={() => { router.push('/bookings') }} />
    <div className="flex flex-grow justify-center">
      <span>Booking Details</span>
    </div>
</div>
  )
}

export default BookingDetailsHeader