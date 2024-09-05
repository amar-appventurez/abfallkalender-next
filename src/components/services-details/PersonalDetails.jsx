"use client";
import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    familyName: '',
    email: '',
    reenterEmail: '',
    declaration: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <Box className="w-full max-w-md mx-auto p-4">
      <Typography variant="h6" component="div" gutterBottom>
        Personal Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <Typography variant="body1" component="label" htmlFor="firstName" display="block" mb={1}>
            First Name
          </Typography>
          <TextField
            id="firstName"
            name="firstName"
            variant="outlined"
            fullWidth
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <Typography variant="body1" component="label" htmlFor="familyName" display="block" mb={1}>
            Family Name
          </Typography>
          <TextField
            id="familyName"
            name="familyName"
            variant="outlined"
            fullWidth
            placeholder="Enter your family name"
            value={formData.familyName}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <Typography variant="body1" component="label" htmlFor="email" display="block" mb={1}>
            Email
          </Typography>
          <TextField
            id="email"
            name="email"
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
          />
          <Typography variant="body2" color="textSecondary" mt={1}>
            Please provide a valid email address.
          </Typography>
        </Box>
        <Box mb={3}>
          <Typography variant="body1" component="label" htmlFor="reenterEmail" display="block" mb={1}>
            Re-enter Email
          </Typography>
          <TextField
            id="reenterEmail"
            name="reenterEmail"
            variant="outlined"
            fullWidth
            type="email"
            placeholder="Re-enter your email address"
            value={formData.reenterEmail}
            onChange={handleChange}
          />
        </Box>
        <Box mb={3}>
          <FormControlLabel
            control={
              <Checkbox
                id="declaration"
                name="declaration"
                checked={formData.declaration}
                onChange={handleChange}
              />
            }
            label="I declare that the information provided is correct and complete."
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default PersonalDetails;
