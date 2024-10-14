import React from 'react'
import BookingDetailsHeader from "../../../components/bookings/BookingDetailsHeader"
import BookingDetailsMain from "../../../components/bookings/BookingDetialsMain"
import { fetchBookingDetails } from '../../actions/fetchBookingDetails'
import ServiceDetails from "../../../components/services-details/ServiceDetails"
import CategoryTag from '../../../components/CategoryTag'
import {getFromatedTimeFromUTCString} from "../../../utils/timeCalculation"

const page = async ({ params }) => {
    const bookingId = parseInt(params?.bookingId)
 
    const bookingDetails = await fetchBookingDetails(bookingId)
    const transformedBookingDetails = bookingDetails?.["Service"]?.["ServiceDetails"]?.map((ele) => {
        return {
            name: ele.type,
            description: ele.description
        }
    });

    return (
        <>
            <BookingDetailsHeader></BookingDetailsHeader>
            <BookingDetailsMain bookingDetails={bookingDetails}></BookingDetailsMain>
            <ServiceDetails serviceDetails={transformedBookingDetails} serviceId={bookingDetails["Service"]?.id} serviceName={bookingDetails["Service"]?.name} serviceCategory={bookingDetails["Service"]?.category} forDisplay={true}></ServiceDetails>
        </>)
}

export default page