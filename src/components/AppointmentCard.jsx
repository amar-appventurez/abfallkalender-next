"use client"
import React from 'react'
import CategoryTag from './CategoryTag'
import { useBookingForm } from './services-details/BookingFormContext'
import { useTranslations } from 'next-intl'

const AppointmentCard = ({serviceName, serviceCategory, location}) => {
    const {locations,selectedLocation, timings, selectedSlot, selectedDate } = useBookingForm();
    const locationT= useTranslations('Location')
    return (
    <div className='flex flex-col gap-4'>
        <div className='flex gap-[12px]'>
            <img src="square-user-round.svg" alt="user-icon"></img>
            <div className='flex flex-col'>
                <span className='text-small-tight-regular text-bold-500'> {serviceName}</span>
                <CategoryTag name={`${serviceCategory}`}/>
            </div>
        </div>
        <hr className='text-text-secondary'/>
        <div className='flex flex-col'>
            <span className='text-text-secondary text-title-5 text-normal'>{locationT('date-time')}</span>
            <div className='flex gap-1'>
                <img className='w-[18px]' src='calendar-clock.svg'></img>
                <div className='flex flex-col'>
                    <span className='text-title-6 text-bold-500 text-title3'>{selectedDate?.$d?.toString().split(' ').reduce((acc,curr,index)=>{ if(index==0){acc+=curr+","}else if(index<=3){acc+=curr+ " "} return acc },"")}</span>
                    <span className='text-text-secondary text-title-7 text-normal'>{timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex]}</span>
                </div>
            </div>
        </div>
        <div className='flex flex-col'>
            <span className='text-text-secondary text-title-5 text-normal'>{locationT('your-location')}</span>
            <div className='flex gap-1'>
                <img className='w-[18px]' src='map-pin.svg'></img>
                <div className='flex flex-col'>
                    <span className='text-title-6 text-bold-500 text-title3'>{locations?.[selectedLocation]?.name}</span>
                    <span className='text-text-secondary text-title-7 text-normal'>{locations?.[selectedLocation]?.address}</span>
                </div>
                <div className='flex gap-1'> 
                    <img src="send.svg"></img>
                    <span className='text-title-6 text-primary text-semiBold'></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AppointmentCard