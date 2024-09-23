"use server"
import {Endpoints} from "../constants/Endpoint"

  export const fetchBookingDetails = async (bookingId) => {


    const params = new URLSearchParams({
      bookingId,
      page:1,
      size:1
    });
  
    // const url = `${Endpoints.baseUrl}/location?${params}`;
    const url = `${Endpoints.baseUrl}/booking?${params}`;

    try {
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${Endpoints.token}`, // Ensure the token is correct
          'Content-Type': 'application/json', // Include if necessary
        },
        cache: 'force-cache', // Adjust based on need
      });
  
      if (!response.ok) {
        
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      return data.result.rows[0];
      
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
  
  }
};
  