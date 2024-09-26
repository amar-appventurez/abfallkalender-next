"use server"
import { getUserSession } from "../../session";
import {Endpoints} from "../../constants/Endpoint"

  export const fetchLocationDetails = async (serviceId) => {


    const params = new URLSearchParams({
      serviceId
    });
  
    // const url = `${Endpoints.baseUrl}/location?${params}`;
    const url = `${Endpoints.baseUrl}/service/location`;
    const token=(await getUserSession())?.userDetails?.token
    try {
      const response = await fetch(url, {
        method: 'GET', 
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure the token is correct
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
  