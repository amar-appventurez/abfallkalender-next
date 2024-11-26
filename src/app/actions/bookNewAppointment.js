"use server"

import { getUserSession } from "../../session";
import { Endpoints } from "../../constants/Endpoint";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { cache } from "react";
import { redirect } from "next/navigation";
// import { decryptToken } from "../n";

export const bookNewAppointment=async (body)=>{

  const url = `${Endpoints.baseUrl}/booking`;

  // const token=(await getUserSession())?.userDetails?.token
    const response = await fetchWithAuth(url, {
      method: 'POST', 
      body: JSON.stringify(body),
    });

    if (response.redirect) {
      // Perform the redirection
      redirect('/'); // Redirect to the home page
  }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // const data = await response.json();
    // return data.result.rows;
 
}