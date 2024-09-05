"use client"; // Ensure this component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation'; // Use next/navigation for app directory in Next.js 13+
import { fetchServiceDetails } from '@/actions/fetchServiceDetails';

const ServiceDetails = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter hook

  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const fetchedDetails = await fetchServiceDetails();
        setServiceDetails(fetchedDetails || []);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        setLoading(false);
      }
    };
    getServiceDetails();
  }, []);

  if (loading) {
    return <>Loading...</>; // Display a loading state while fetching data
  }

  if (serviceDetails?.length === 0) {
    return <>No service details available</>; // Handle the case where there are no service details available
  }

  // Handler function for button click
  const handleSelectLocation = () => {
    router.push('/book-service'); // Replace '/your-target-route' with your desired route
  };

  return (
    <Box className="w-full max-w-screen-lg mx-auto p-4">
      <Box className="flex flex-wrap gap-4">
        {serviceDetails.map((location) => (
          <Box key={location.id} className="flex-1 min-w-[250px] mb-4">
            <Typography variant="h5" component="div" className="font-semiBold">
              {location.name}
            </Typography>
            <Card 
              sx={{ 
                boxShadow: 'none', 
                border: '1px solid #e0e0e0',  // Added border to the card
                borderRadius: '8px', // Ensure consistent rounding of corners
              }}
            >
              <CardContent>
                {location.description.map((item, index) => (
                  <Box key={index} mb={index !== location.description.length - 1 ? 2 : 0}>
                    <Box
                      component="li"
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        position: 'relative',
                        paddingLeft: 3, // Padding to make space for the bullet
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          left: '15px',
                          top: '7px', // Align bullet point with the top of the text line
                          width: '6px',  // Size of the bullet
                          height: '6px',
                          backgroundColor: '#014899',
                          borderRadius: '50%',  // Ensures circular shape
                        },
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          wordBreak: 'break-word',  // Break long words
                          overflowWrap: 'break-word', // Ensure text breaks correctly
                          marginLeft: 1, // Margin-left to create space between bullet and text
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                    {index !== location.description.length - 1 && (
                      <Divider className="bg-gray-300 mt-2" />
                    )}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {/* Select Location Button */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: '200px' }}
          onClick={handleSelectLocation} // Attach the click handler
        >
          Select Location
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceDetails;
