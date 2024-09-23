"use server"
import {Endpoints} from "../constants/Endpoint"

  export const fetchLocationDetails = async (serviceId) => {


    const params = new URLSearchParams({
      serviceId
    });
  
    // const url = `${Endpoints.baseUrl}/location?${params}`;
    const url = `${Endpoints.baseUrl}/service/location`;
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
      return data.result.rows;
      
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
  
  }
};
  