import React from 'react'
import { useBookingForm } from './BookingFormContext'
import { Button } from '@mui/material';
import { convertFromUnixTimestamp, convertToUnixTimestamp, getTimeForBookApiCall, getUTCDateFromLocalTime } from '../../utils/timeCalculation';
const MultiStepperBottomNextButton = ({ activeStep, stepsLength, getNextButtonLabel, handleNext }) => {
    const { serviceName, serviceCategory,
        locations, setLocations, selectedLocation, setSelectedLocation,
        selectedYear, setSelectedYear, selectedMonth, setSelectedMonth, selectedDate, setSelectedDate, selectedDateRef, today,
        timings, setTimings, selectedSlot, setSelectedSlot,
        formData, setFormData } = useBookingForm();
    // console.log("Time and Date", timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex] ,convertToUnixTimestamp(selectedDate?.$d, timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex] ))
    // console.log("From unix time stamp", convertFromUnixTimestamp(1726452000))
    // console.log("Date required", selectedDate)
    // console.log("Date for book api call", getTimeForBookApiCall(selectedDate?.$d,timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex]))
    const isDisabled = () => {
        switch (activeStep) {
            case 0:
                return selectedLocation === null
            case 1:
                return selectedDate == null || selectedSlot == null
            case 2:
                return formData.firstName == '' || formData.familyName == '' || formData.email == '' || formData.reenterEmail == '' || formData.email != formData.reenterEmail || formData.phone == '' || formData.declaration == false
            default:
                return false
        }
    }
    return <>
        {activeStep < stepsLength - 1 && (
            <div className="px-[16px] py-[12px] h-[100px] z-10 fixed bottom-0 left-0 right-0 border-stepper-bottom-nav-border rounded-stepper-bottom-nav-radius border-border-color bg-white">
                <Button className={"flex w-[100%] items-center justify-center px-4 py-2 border-none rounded-xl text-white bg-worms-blue"} variant="contained" color="primary"
                    onClick={() =>
                        handleNext(activeStep,
                            {
                                ...formData, locationId: locations?.[selectedLocation]?.id,
                                dateAndTime: getTimeForBookApiCall(selectedDate?.$d, timings[selectedSlot?.timingIndex]?.slots[selectedSlot?.slotIndex])
                            })}
                    sx={{ mb: 2 }}
                    disabled={isDisabled()}>
                    <span class="flex-1 text-center text-white"> {getNextButtonLabel()}</span>
                    <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
                </Button>
            </div>
        )}
    </>

}

export default MultiStepperBottomNextButton