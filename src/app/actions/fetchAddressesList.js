"use server"

import { getUserSession } from "../../session";
import { Endpoints } from "../../constants/Endpoint";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { cache } from "react";
import { redirect } from "next/navigation";
// import { decryptToken } from "../n";

export const fetchAddressesList=async (streetName)=>{
  const params = new URLSearchParams({
    address: streetName,
  });
  const url = `${Endpoints.baseUrl}/street/scrape?${params}`;


  // const token=(await getUserSession())?.userDetails?.token
    const response = await fetchWithAuth(url);

    if (response.redirect) {
      // Perform the redirection
      redirect('/'); // Redirect to the home page
  }

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.result;
 
}