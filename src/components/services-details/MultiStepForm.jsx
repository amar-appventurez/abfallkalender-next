"use client";
import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Stepper, Step, StepLabel, Card, CardContent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationSelect from './LocationSelect'; // First Step
import TimingsTab from './TimingsTab'; // Second Step
import PersonalDetails from './PersonalDetails'; // Third Step
import { useRouter } from "next/navigation";
import AppointmentCard from "../AppointmentCard"
import DateCardCarousel from "./DateCardCarousel"
import { BookingFormProvider, useBookingForm } from "./BookingFormContext";
import MultiStepperBottomNextButton from './MultiStepperBottomNextButton'
import { bookNewAppointment } from "../../app/actions/bookNewAppointment"
import { useTranslations } from "next-intl";
// AppointmentConfirmed component for the final step
const AppointmentConfirmed = ({ handleRedirectToBookings }) => {
  const multiStepT= useTranslations('MultiStep');
  const { serviceName, serviceCategory } = useBookingForm();

  return (<CardContent className="flex flex-col gap-[32px] items-center w-bottom-nav-button m-auto bg-bg-secondary w-[100%]">
    <img src="ic_appointment confirmed.svg" alt="appoinmtment confirmed icon" className="w-[100px] h-[100px]"></img>
    <span className="text-title3 text-semiBold text-title-3">
      {multiStepT('confirmed-message')}
    </span>
    <span className="text-text-secondary text-normal text-header-description text-center">
      {multiStepT("confirm-line")}
    </span>
    <div className="w-w-100 bg-white p-4 rounded-md w-bottom-nav-button mx-auto "><AppointmentCard serviceName={serviceName} serviceCategory={serviceCategory}></AppointmentCard></div>
  </CardContent>);
}

const steps = ["Select Location", "Select Slot Timings", "Enter Personal Details", "Appointment Confirmed"];

const MultiStepForm = ({ serviceId, serviceName, serviceCategory }) => {
  const multiStepT= useTranslations('MultiStep');
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = async (currentStep = undefined, formData = null) => {
    const step = currentStep ?? activeStep
    if (step == 2) {
      //make booking api call if result is success proceed else
      try {
        //make api call
        const { firstName, familyName, email, phoneWithOutCountry: phone, declaration, countryCode, locationId,dateAndTime } = formData
  
        await bookNewAppointment({
            firstName,
          familyName,
          email,
          phone,
          countryCode,
          serviceId: parseInt(serviceId),
          locationId,
          dateAndTime
        })
      }
      catch (err) {
        //prompt for fail case with toast or prompt
        console.log("Error occured on booking api call", err)
        return 
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRedirectToBookings = () => {

    // Logic to redirect to the MyBookings page (use React Router or window.location)
    router.push('/bookings')
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <>
          <LocationSelect serviceId={serviceId} />
        </>;
      case 1:
        return <>
          <div className="flex flex-row items-center py-[12px] px-[16px] bg-white fixed w-[100vw]">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { handleBack() }} />
            <div className="flex flex-grow justify-center">
              <span>{multiStepT('select-date-time')}</span>
            </div>
          </div>
          <DateCardCarousel></DateCardCarousel>
          <TimingsTab /></>;
      case 2:
        return <>

          <div className="flex flex-row items-center py-[12px] px-[16px] bg-white fixed w-[100vw]">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { handleBack() }} />
            <div className="flex flex-grow justify-center">
              <span>{multiStepT('personal-details')}</span>
            </div>
          </div>
          <div className="px-4 py-[20px] w-full pt-[4rem]"><AppointmentCard serviceName={serviceName} serviceCategory={serviceCategory} /></div>
          <PersonalDetails /></>;
      case 3:
        return (
          <>
          <div className="bg-bg-secondary pt-[120px] mb-[95px]">
            <AppointmentConfirmed handleRedirectToBookings={handleRedirectToBookings} />
          </div>
          <div className="flex justify-around"><Button className={"flex w-bottom-nav-button items-center justify-center px-4 py-2 border-none rounded-xl text-white bg-worms-blue"} variant="contained" color="primary" onClick={handleRedirectToBookings} sx={{ mb: 2 }} >
              <span class="flex-1 text-center text-white">{multiStepT('go-my-bookings')}</span>
              <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
            </Button>
            </div>
          </>
        );
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  const getNextButtonLabel = () => {
    switch (activeStep) {
      case 0:
        return multiStepT('select-date-time');
      case 1:
        return multiStepT('select-slot-time');
      case 2:
        return multiStepT('reserve');
      default:
        return multiStepT('next');
    }
  };


  return (
    <Box className={'bg-bg-secondary'} sx={{ width: "100%", maxWidth: "100%", mx: "auto", boxSizing: 'border-box', position: 'relative', backgroundColor: "#F0F0F6" }}>
      {/* Back Button */}
      {/* {activeStep > 0 && (
        <IconButton
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1000, // Ensure it's above other elements
            backgroundColor: 'white',
            color: 'black', // Ensure the icon color is visible
            '&:hover': {
              backgroundColor: 'lightgrey',
            },
          }}
          onClick={handleBack}
        >
          <ArrowBackIcon />
        </IconButton>
      )} */}

      {/* Stepper */}
      {/* <Stepper activeStep={activeStep} sx={{ mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}

      {/* Step Content */}
      <BookingFormProvider serviceName={serviceName} serviceCategory={serviceCategory}>
        {renderStepContent(activeStep)}


        {/* Navigation Buttons */}
        <MultiStepperBottomNextButton activeStep={activeStep}
          stepsLength={steps.length}
          getNextButtonLabel={getNextButtonLabel}
          handleNext={handleNext} />
        {/* <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}> */}

        {/* Show "Go to My Bookings" button on the final step */}
        {/* {activeStep === steps.length - 1 && (
          // <Button variant="contained" color="primary" onClick={handleRedirectToBookings} className="mx-auto">
          //   Go to My Bookings
          // </Button>
      
        )} */}
      </BookingFormProvider>
      {/* </Box> */}
    </Box>
  );
};

export default MultiStepForm;
