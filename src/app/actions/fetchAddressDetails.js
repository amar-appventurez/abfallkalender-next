"use server"
import { getUserSession } from "../../session";
import {Endpoints} from "../../constants/Endpoint"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { redirect } from "next/navigation";

  export const fetchAddressDetails = async (dataUrl) => {


    const params = new URLSearchParams({
      streetUrl: dataUrl
    });
  
    // const url = `${Endpoints.baseUrl}/location?${params}`;
    const url = `${Endpoints.baseUrl}/street/detail?${params}`;
    try {
      const response = await fetchWithAuth(url, {
        method: 'GET', 
        // cache: 'force-cache', // Adjust based on need
      });

      if (response.redirect) {
        // Perform the redirection
        redirect('/'); // Redirect to the home page
    }
  
      if (!response.ok) {
        
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      return data.result;
      
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
  
  }
};
  