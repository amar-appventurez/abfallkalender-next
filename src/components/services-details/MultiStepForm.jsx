"use client";
import React, { useState } from "react";
import { Box, Button, Typography, IconButton, Stepper, Step, StepLabel, Card, CardContent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LocationSelect from './LocationSelect'; // First Step
import TimingsTab from './TimingsTab'; // Second Step
import PersonalDetails from './PersonalDetails'; // Third Step

// AppointmentConfirmed component for the final step
const AppointmentConfirmed = ({ handleRedirectToBookings }) => (
  <Box>
    <Card sx={{ mt: 4, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" color="primary">
          Appointment Confirmed!
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          Your appointment has been successfully booked.
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          We’ve sent you a confirmation email with all the details.
        </Typography>
      </CardContent>
    </Card>
  </Box>
);

const steps = ["Select Location", "Select Slot Timings", "Enter Personal Details", "Appointment Confirmed"];

const MultiStepForm = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRedirectToBookings = () => {
    // Logic to redirect to the MyBookings page (use React Router or window.location)
    console.log("Redirecting to MyBookings...");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <LocationSelect />;
      case 1:
        return <TimingsTab />;
      case 2:
        return <PersonalDetails />;
      case 3:
        return <AppointmentConfirmed handleRedirectToBookings={handleRedirectToBookings} />;
      default:
        return <Typography>Unknown Step</Typography>;
    }
  };

  const getNextButtonLabel = () => {
    switch (activeStep) {
      case 0:
        return "Select date and time";
      case 1:
        return "Select slot timings";
      case 2:
        return "Reserve";
      default:
        return "Next";
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", mx: "auto", p: 2, boxSizing: 'border-box', position: 'relative' }}>
      {/* Back Button */}
      {activeStep > 0 && (
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
      )}

      {/* Stepper */}
      {/* <Stepper activeStep={activeStep} sx={{ mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}

      {/* Step Content */}
      {renderStepContent(activeStep)}

      {/* Navigation Buttons */}
      <Box sx={{ mt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {activeStep < steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleNext} sx={{ mb: 2 }}>
            {getNextButtonLabel()}
          </Button>
        )}
        {/* Show "Go to My Bookings" button on the final step */}
        {activeStep === steps.length - 1 && (
          <Button variant="contained" color="primary" onClick={handleRedirectToBookings}>
            Go to My Bookings
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MultiStepForm;
