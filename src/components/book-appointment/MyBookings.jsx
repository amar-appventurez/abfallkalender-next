import React from 'react';
import BookingCard from '../BookingCard';
import { fetchBookingDetails } from '../../app/actions/fetchSlotTimings';
import { useTranslations } from 'next-intl';
import MyBookingHeader from './MyBookingHeader'

const MyBookings = async () => {
  // const initialBookings = await fetchBookingDetails(1); // Fetch first page on the server
  return (
    <>
    <MyBookingHeader/>
      {/* Render BookingCard with initial data */}
      {/* <BookingCard initialBookings={initialBookings} /> */}
      <BookingCard/>
    </>
  );
};

export default MyBookings;
