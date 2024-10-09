"use server"

import { redirect } from "next/navigation";
import { Endpoints } from "../../constants/Endpoint";
import { getUserSession } from "../../session";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
// import { getUserSession } from "../session";

export const fetchSlotTimings = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const timings = [
        {
          id: 1,
          period: 'Morning 7:00-8:00',
          slots: ['7:00', '7:30', '7:45', '7:50'],
        },
        {
          id: 2,
          period: 'Afternoon 12:00-1:00',
          slots: ['12:00', '12:15', '12:30', '12:45'],
        },
        {
          id: 3,
          period: 'Evening 5:00-6:00',
          slots: ['5:00', '5:15', '5:30', '5:45'],
        },
      ];
      resolve(timings);
    }, 0);
  });
};


export const fetchBookingDetails = async (page, status = 0, size = 3) => {
  const queryParams = new URLSearchParams({
    page,
    size,
    ...(status !== 0 && { status }) // Add status only if it's not 0
  });

  const url = `${Endpoints.baseUrl}/booking?${queryParams}`;
  
  // console.log("Using token to call api",token)
  try {
    const response = await fetchWithAuth(url, {

      // cache: 'force-cache',
    });

    if (response.redirect) {
      // Perform the redirection
      redirect('/'); // Redirect to the home page
  }
    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
   
      return data.result.rows;
    } else {
      throw new Error("Invalid content-type. Expected JSON.");
    }

  } catch (error) {
    console.error("Error in fetchBookingDetails:", error);
    return []; // Return empty array on error
  }
};





