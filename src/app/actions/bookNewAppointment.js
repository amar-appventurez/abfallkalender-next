"use server"

import { getUserSession } from "../../session";
import { Endpoints } from "../../constants/Endpoint";
// import { decryptToken } from "../n";

export const bookNewAppointment=async (body)=>{

  const url = `${Endpoints.baseUrl}/booking`;

  const token=(await getUserSession())?.userDetails?.token
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Authorization': `Bearer ${token}`, // Ensure the token is correct
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