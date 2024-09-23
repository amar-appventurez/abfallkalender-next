import React from 'react'
import BookingDetailsHeader from "../../../components/bookings/BookingDetailsHeader"
import { fetchBookingDetails } from '../../../actions/fetchBookingDetails'
import ServiceDetails from "../../../components/services-details/ServiceDetails"
import CategoryTag from '../../../components/CategoryTag'
import {getFromatedTimeFromUTCString} from "../../../utils/timeCalculation"

const page = async ({ params }) => {
    const bookingId = parseInt(params?.bookingId)
 
    const bookingDetails = await fetchBookingDetails(bookingId)
    const transformedBookingDetails = bookingDetails["Service"]["ServiceDetails"]?.map((ele) => {
        return {
            name: ele.type,
            description: ele.description
        }
    });

    return (
        <>
            <BookingDetailsHeader></BookingDetailsHeader>
            <div className="px-4 py-[20px] w-full">
                <div className='flex flex-col gap-4'>
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
                                <span className='text-title-6 text-bold-500 text-title3'>{getFromatedTimeFromUTCString(bookingDetails?.utc)}</span>
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
            <ServiceDetails serviceDetails={transformedBookingDetails} serviceId={bookingDetails["Service"]?.id} serviceName={bookingDetails["Service"]?.name} serviceCategory={bookingDetails["Service"]?.category} forDisplay={true}></ServiceDetails>
        </>)
}

export default page