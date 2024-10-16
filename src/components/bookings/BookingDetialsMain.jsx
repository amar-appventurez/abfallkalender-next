import React from 'react'
import CategoryTag from '../CategoryTag'
import { useTranslations } from 'next-intl'
import { getFromatedTimeFromUTCString } from '../../utils/timeCalculation'

const BookingDetialsMain = ({ bookingDetails }) => {
    const locationT = useTranslations('Location');
    return (
        <div className="px-4 py-[20px] w-full">
            <div className='flex flex-col gap-4 mt-[48px]'>
                <div className='flex gap-[12px]'>
                    <img src="/square-user-round.svg" alt="user-icon"></img>
                    <div className='flex flex-col'>
                        <span className='text-small-tight-regular text-bold-500'> {`${bookingDetails["Service"]?.name}`}</span>
                        <CategoryTag name={`${bookingDetails["Service"]?.category}`} />
                    </div>
                </div>
                <hr className='text-text-secondary' />
                <div className='flex flex-col'>
                    <span className='text-text-secondary text-title-5 text-normal'>{locationT('date-time')}</span>
                    <div className='flex gap-1'>
                        <img className='w-[18px]' src='/calendar-clock.svg'></img>
                        <div className='flex flex-col'>
                            <span className='text-title-6 text-bold-500 text-title3'>{getFromatedTimeFromUTCString(bookingDetails?.date_and_time)}</span>
                            {/* <span className='text-text-secondary text-title-7 text-normal'>{"Show time here"}</span> */}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <span className='text-text-secondary text-title-5 text-normal'>{locationT('your location')}</span>
                    <div className='flex gap-1'>
                        <img className='w-[18px]' src='/map-pin.svg'></img>
                        <div className='flex flex-col'>
                            <span className='text-title-6 text-bold-500 text-title3'>{bookingDetails["Location"]?.name}</span>
                            <span className='text-text-secondary text-title-7 text-normal'>{bookingDetails["Location"]?.address}</span>
                        </div>
                        <div className='flex gap-1'>
                            <img src="/send.svg"></img>
                            <span className='text-title-6 text-primary text-semiBold'></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetialsMain