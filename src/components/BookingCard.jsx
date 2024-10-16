"use client";
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
const bookingIcon = "user.svg";
const calenderClockIcon = "calendar-clock.svg";
const mapPinIcon = "map-pin.svg";
const sendIcon = "send.svg";
import { fetchBookingDetails } from '../app/actions/fetchSlotTimings';
import { useRouter } from 'next/navigation';
import { getDateConversionForBookingCard } from '../utils/timeCalculation';
import { useTranslations } from 'next-intl';
import {Loading} from "../app/bookings/loading"

const BookingCard = () => {
  const [bookData, setBookData] = useState();
  const [page, setPage] = useState(1); // Start from page 1 for each filter
  const [hasMore, setHasMore] = useState(true); // Assume there is more data to load
  const observer = useRef(null); // Use null as the initial value for observer
  const lastBookingRef = useRef(null); // Reference to the last booking element
  const router = useRouter();
  const bookingT=useTranslations('Booking');
  const [loading,setLoading]=useState(false);
  const [filters, setFilters] = useState([
    { id: 0, name: bookingT('all'), isActive: true }, // Default to "All"
    { id: 1, name: bookingT('upcoming'), isActive: false },
    { id: 2, name: bookingT('completed'), isActive: false },
  ]);

  const activeFilter = filters.find(filter => filter.isActive)?.id; // Get the active filter ID

  // Handle filter change
  const handleFilterChange = (index) => {
    setFilters(prevFilters =>
      prevFilters.map((filter, i) => ({
        ...filter,
        isActive: i === index,
      }))
    );
    setPage(1); // Reset page when changing filters
    setBookData([]); // Clear previous booking data when changing filters
    setHasMore(true); // Allow more data to be fetched
  };

  // Fetch more bookings based on the filter
  const loadMoreBookings = async (status = 0, reset = false) => {
    if (!hasMore && !reset) return; // Stop fetching if no more data to fetch

    const currentPage = reset ? 1 : page;
    if(reset){
      setLoading(true);
    }
    const newBookings = await fetchBookingDetails(currentPage, status);

    if (reset) {
      setBookData(newBookings); // Reset data for the new filter
      setPage(2); // Reset to page 2 for next load
      setLoading(false);
    } else {
      setBookData(prevData => [...prevData, ...newBookings]); // Append new data
      setPage(prevPage => prevPage + 1); // Increment page
    }

    if (newBookings?.length === 0) {
      setHasMore(false); // No more data to load
    } else {
      setHasMore(true); // More data can be loaded
    }
  };

  // Fetch bookings when filters change
  useEffect(() => {
    setHasMore(true);
    loadMoreBookings(activeFilter, true); // Reset booking data on filter change
  }, [filters]);

  // Infinite scroll effect - set up observer after layout is updated
  useLayoutEffect(() => {
    if (!hasMore || !bookData?.length || !lastBookingRef?.current) return;

    // Disconnect the previous observer if it exists
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMoreBookings(activeFilter); // Load more bookings when last item is in view
        }
      },
      {
        root: null, // Use the viewport as the container
        rootMargin: '200px', // Load earlier when the user is 200px away from the last element
        threshold: 0.1, // Trigger when 10% of the target is visible
      }
    );

    if (lastBookingRef.current) {
      observer.current.observe(lastBookingRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [bookData, hasMore]); // Ensure lastBookingRef is available after data changes


  if(loading){
    return <Loading />
  }

  return (
    <div className="flex flex-col px-[16px] bg-bg-secondary pb-[4rem]">
      <div className="flex flex-row items-center mt-[24px]">
        <span className="text-title3 font-semiBold text-title-large">{bookingT('my-bookings')}</span>
      </div>

      {/* Filter Section */}
      <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto">
        {filters.map((item, index) => (
          <div
            key={index}
            onClick={() => handleFilterChange(index)}
            className={`flex flex-row py-[4px] px-[14px] whitespace-nowrap font-normal text-title-tight rounded-2xl cursor-pointer ${item.isActive
              ? "border-[1px] border-primary bg-custom-blue-100"
              : "text-title3 bg-white"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>

      {bookData?.map((item, index) => {
        const isLastItem = bookData.length - 1 === index;
        return (
          <div
            className="flex flex-col p-[16px] bg-white rounded-xl mt-[20px]"
            ref={isLastItem ? lastBookingRef : null} // Assign ref to last item
            key={index}
            onClick={() => router.push(`/bookings/${item?.id}`)}
          >
            <div className="flex flex-row items-center gap-[12px]">
              <img className="size-10" src={bookingIcon} alt="bg-image" />
              <div className="flex flex-col gap-[4px]">
                <span className="text-title3 font-bold-500 text-title-tight">
                  {item?.Service?.name}
                </span>
                <span className="py-[2px] px-[8px] bg-custom-blue-100 text-bg-booking-blue font-bold-500 text-title-5 rounded-md max-w-fit">
                  {item?.Service?.category}
                </span>
              </div>
            </div>
            <div className="flex flex-col bg-bg-secondary mt-[16px] p-[12px] rounded-lg gap-[12px]">
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-[8px]">
                  <img className="size-[18px]" src={calenderClockIcon} alt="calender-clock" />
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-title3 font-bold-500 text-title-6">{getDateConversionForBookingCard(item['date_and_time']?.split()[0])}</span>
                    <span className="text-text-secondary font-normal text-title-7">{item['date_and_time']?.split()[1]}</span>
                  </div>
                </div>
                <div className="bg-bg-upcoming py-[2px] px-[8px] rounded-md text-bg-booking-blue font-bold-500 text-title-5 flex items-center justify-center">
                  {filters.filter(filterItem => filterItem?.id == item?.status)[0]?.name}
                </div>
              </div>
              <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row gap-[8px]">
                  <img className="size-[18px]" src={mapPinIcon} alt="map-pin" />
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-title3 font-bold-500 text-title-6">{item?.Location?.name}</span>
                    <span className="text-text-secondary font-normal text-title-7">{item?.Location?.address}</span>
                  </div>
                </div>
                <img className="size-[18px]" src={sendIcon} alt="send" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingCard;
