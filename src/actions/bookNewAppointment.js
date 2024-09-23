"server only"

import { Endpoints } from "../constants/Endpoint";

export const bookNewAppointment=async (body)=>{

  const url = `${Endpoints.baseUrl}/booking`;
  
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${Endpoints.token}`, // Ensure the token is correct
        'Content-Type': 'application/json', // Include if necessary
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // const data = await response.json();
    // return data.result.rows;
 
}