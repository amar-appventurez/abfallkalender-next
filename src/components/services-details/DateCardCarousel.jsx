"use client";
import React, { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isToday from 'dayjs/plugin/isToday';
import { useBookingForm } from './BookingFormContext';

// Extend dayjs with the plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isToday);

const DateCardCarousel = () => {
  const { selectedYear, setSelectedYear,
    selectedMonth, setSelectedMonth,
    selectedDate, setSelectedDate,
    selectedDateRef, today } = useBookingForm();
  const [dates, setDates] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [displayMode, setDisplayMode] = useState('dates'); // 'years', 'months'
  const [isOpen, setIsOpen] = useState(false); // To manage dropdown visibility


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 9 }, (_, i) => dayjs().year() - 4 + i);

  useEffect(() => {
    if (selectedYear && selectedMonth != null) {
      const startOfMonth = dayjs(`${selectedYear}-${selectedMonth + 1}-01`);
      const endOfMonth = startOfMonth.endOf('month');

      const allDates = [];
      let current = startOfMonth;

      while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, 'day')) {
        allDates.push(current);
        current = current.add(1, 'day');
      }

      setDates(allDates);
    }
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    if (displayMode === 'years') {
      setDropdownOptions(
        years
          .filter(year => dayjs().year() <= year) // Filter out past years
          .map(year => ({
            value: year,
            label: year.toString()
          }))
      );
    } else if (displayMode === 'months') {
      setDropdownOptions(
        months
          .filter((_, index) => index >= dayjs().month() || selectedYear > dayjs().year()) // Filter out past months
          .map((month, index) => ({
            value: selectedYear > today.year() ? index : index + dayjs().month(),
            label: month
          }))
      );
    }
  }, [displayMode, selectedYear]);

  const handleSelectionChange = (value) => {
    if (displayMode === 'years') {
      const year = parseInt(value, 10);
      setSelectedYear(year);
      setDisplayMode('months');
    } else if (displayMode === 'months') {
      const month = parseInt(value, 10);
      setSelectedMonth(month);
      setDisplayMode('dates');
      if(selectedYear === today.year()){
        setSelectedDate(today)
      }
      setIsOpen(false); // Close dropdown after selection
    }
  };

  const handleDropdownToggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setDisplayMode('years'); // Reset to show years when dropdown opens
    }
  };

  const handleDateClick = (date) => {
    if (!date.isBefore(today)) {
      setSelectedDate(date); // Update selected date
    }
  };

  useEffect(() => {
    // Always scroll to the selected date's card when the component is rendered or updated
    if (selectedDateRef.current) {
      selectedDateRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [dates, selectedDate]);

  const selectedLabel = displayMode === 'dates'
    ? `${months[selectedMonth]} ${selectedYear}`
    : displayMode === 'months'
      ? `Select Month`
      : `Select Year`;

  return (
    <div className="w-full max-w-screen-lg mx-auto p-4 bg-white">
    
        <button
          onClick={handleDropdownToggle}
          className="text-left text-regular-normal-medium font-bold-500"
        >
          {selectedLabel}
        </button>

        {isOpen && (
          <div className="z-10 bg-white rounded-md mt-2 w-full max-h-60 overflow-y-auto">
            <div className={`flex flex-wrap gap-2 ${displayMode === 'years' ? 'w-full' : ''}`}>
              {dropdownOptions.map(option => (
                <div
                  key={option.value}
                  className={`flex-1 min-w-[100px] p-2 cursor-pointer text-center rounded-lg ${(displayMode === 'years' && option.value === selectedYear) ||
                    (displayMode === 'months' && option.value === selectedMonth)
                    ? 'bg-[#014899] text-white'
                    : 'hover:bg-gray-200'
                    }`}
                  onClick={() => handleSelectionChange(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      

      {displayMode === 'dates' && (
        <div className="overflow-x-auto flex gap-2 mt-4">
          {dates.map((date) => (
            <div
              key={date.format()}
              ref={date.isSame(selectedDate, 'day') ? selectedDateRef : null} // Assign ref to selected date
              className={`min-w-[61px] h-[82px] text-center cursor-pointer rounded-lg border-bg-secondary ${date.isSame(selectedDate, 'day')
                ? 'bg-[#014899] text-white border-2 border-[#014899]'
                : 'bg-white text-black border border-gray-300'
                } ${date.isBefore(today) ? 'cursor-not-allowed bg-slate-200' : ''}`}
              onClick={() => handleDateClick(date)}
            >
              <div className={`p-2 ${date.isBefore(today) ? 'bg-slate-200' : ''}`}>
                <div className="font-bold-500 text-title-6 text-text-inactive">
                  {date.format('ddd')} {/* Display day abbreviation */}
                </div>
                <div className="text-title-3 font-600">
                  {date.format('DD')} {/* Display date */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DateCardCarousel;
