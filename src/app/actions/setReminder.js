"use server"
import { getUserSession } from "../../session";
import {Endpoints} from "../../constants/Endpoint"
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { redirect } from "next/navigation";

  export const setReminder = async (streetUrl, category) => {
    const url = `${Endpoints.baseUrl}/street/reminder/`;
    try {
      const response = await fetchWithAuth(url, {
        method: 'POST',
        body:JSON.stringify({
            streetUrl,
            category
        })
        // cache: 'force-cache', // Adjust based on need
      });

      if (response.redirect) {
        // Perform the redirection
        redirect('/'); // Redirect to the home page
    }
  
      if (!response.ok) {
        return false
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // const data=await response.json()
      // console.log("Request completed succesfully", data.result)
      return true;
      
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
  
  }
};
  