"use client";
import React, { useEffect, useState } from 'react';
import { fetchSlotTimings } from '../../app/actions/fetchSlotTimings';
import {useBookingForm} from './BookingFormContext'

const TimingTabs = () => {
  const [selectedTiming, setSelectedTiming] = useState(0);


  const {    timings, setTimings,selectedSlot, setSelectedSlot} =useBookingForm();
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const setSlotTimings = async () => {
      try {
        const fetchedTimings = await fetchSlotTimings();
        setTimings(fetchedTimings || []);
      } catch (error) {
        console.error("Error fetching slot timings:", error);
      } finally {
        setLoading(false);
      }
    };
    setSlotTimings();
  }, []);

  const handleSlotClick = (timingIndex, slotIndex) => {
    setSelectedTiming(timingIndex);
    setSelectedSlot({ timingIndex, slotIndex }); // Set both timingIndex and slotIndex
  };

  if (loading) {
    const timingsForSkeleton=[{slots:[1,2,3,4]},{slots:[1,2,3,4]},{slots:[1,2,3,4]},]
    return <div className="container mx-auto px-4 py-8 max-w-9xl bg-bg-secondary flex flex-col gap-[24px]">
    {timingsForSkeleton.map((timing, timingIndex) => (
      <div key={timingIndex} className='flex flex-col gap-[16px]'>
        <span className="font-bold-500 text-header-description-1 w-[100px] animate-pulse bg-white h-[22px]">{""}</span>
        <div className="flex flex-wrap gap-[15px]">
          {timing.slots.map((slot, slotIndex) => (
            <div
              key={slotIndex} // Ensure unique key for each slot
              className={`w-[104px] h-[42px] px-[16px] py-[11px] rounded-lg cursor-pointer flex items-center justify-center bg-white animate-pulse`}
            >
              <span className="text-center text-header-description-1 w-[50px] animate-pulse">{""}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>;
  }

  if (timings.length === 0) {
    return <>No timings available</>;
  }

  return (
    <>
    
    <div className="container mx-auto px-4 py-8 max-w-9xl bg-bg-secondary flex flex-col gap-[24px] pb-[120px]">
      {timings.map((timing, timingIndex) => (
        <div key={timing.id} className='flex flex-col gap-[16px]'>
          <span className="font-bold-500 text-header-description-1">{timing.period}</span>
          <div className="flex flex-wrap gap-[15px]">
            {timing.slots.map((slot, slotIndex) => (
              <div
                key={slotIndex} // Ensure unique key for each slot
                className={`w-[104px] h-[42px] px-[16px] py-[11px] rounded-lg cursor-pointer flex items-center justify-center 
                  ${
                    selectedSlot?.timingIndex === timingIndex &&
                    selectedSlot?.slotIndex === slotIndex
                      ? 'text-white bg-worms-brand-2'
                      : 'bg-white text-black border-gray-300'
                  }`}
                onClick={() => handleSlotClick(timingIndex, slotIndex)}
              >
                <span className="text-center text-header-description-1">{slot}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default TimingTabs;
