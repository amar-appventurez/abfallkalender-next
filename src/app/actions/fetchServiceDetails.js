"server only"
import { getUserSession } from "../../session";
import {Endpoints} from "../../constants/Endpoint"

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { redirect } from "next/navigation";

export const fetchServiceDetails = async (serviceId) => {


  const params = new URLSearchParams({
    serviceId,
  });

  const url = `${Endpoints.baseUrl}/service?${params}`;
  try {
    const response = await fetchWithAuth(url, {
      method: 'GET', 
      // cache: 'force-cache',
    });

    if (response.redirect) {
      // Perform the redirection
      redirect('/'); // Redirect to the home page
    }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
   
    return data.result.rows[0];
  } catch (error) {
    console.error('Fetch error:', error);
    return {}
  }
};
