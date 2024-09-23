import React, { createContext, useContext, useRef, useState } from 'react';
import dayjs from 'dayjs';
// Create the context
export const BookingFormContext = createContext();

// Create a provider component
export const BookingFormProvider = ({ children, serviceName, serviceCategory }) => {
    // const [user, setUser] = useState({
    //     name: "John Doe",
    //     email: "john@example.com"
    // });

    //for locations
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    //console.log("Selected location details",locations?.[selectedLocation])
   

    //for date
    const today = dayjs().startOf('day');
    const [selectedYear, setSelectedYear] = useState(today.year());
    const [selectedMonth, setSelectedMonth] = useState(today.month());
    const [selectedDate, setSelectedDate] = useState(today);
    const selectedDateRef = useRef(null); // Create a reference to the selected date

    //for slots
    const [selectedSlot, setSelectedSlot] = useState(null); // Track only one selected slot
    const [timings, setTimings] = useState([]);
    //console.log("Selected slot", timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex])

    //for personal details
    const [formData, setFormData] = useState({
        firstName: '',
        familyName: '',
        email: '',
        reenterEmail: '',
        phone: '',
        phoneWithOutCountry: '',
        countryCode: '',
        declaration: false,
    });
    return (
        <BookingFormContext.Provider
            value={{
                serviceName, serviceCategory,
                locations, setLocations, selectedLocation, setSelectedLocation,
                selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDate, setSelectedDate, selectedDateRef,today,
                timings, setTimings, selectedSlot, setSelectedSlot,
                formData, setFormData
            }}>
            {children}
        </BookingFormContext.Provider>
    );
};

export const useBookingForm = () => useContext(BookingFormContext)
