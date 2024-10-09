"use server"

import { cookies } from "next/headers"; // Adjust the import based on your project structure
import { deleteSession, getUserSession } from "../session";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";


// Function to get the token from cookies
const getToken = async () => {
    const session = await getUserSession(); // Replace 'session' with your cookie name
    return session?.userDetails?.token ?? null; // Adjust based on your token structure
};




// Custom fetch function
export const fetchWithAuth = async (url, options = {}) => {
    const token = await getToken();
    const locale = getLocale();

    if (!token) {
        await fetch(`${process.env.NEXT_SERVER}api/clear-session`, {
            method: "GET",
          });
          console.log("Back from clearing the session--token was missing");
          if (typeof window === 'undefined') {
            // Server-side redirection using Next.js redirect
            console.log("Server side redirection")
            redirect("/home");  // Redirect to the home page
        } else {
            // Client-side redirection
            console.log("Client side redirection")
            window.location.href = `${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}home`;
        }
        return { redirect: true }; // Indicate that a redirect is needed
        // Optionally, return here to avoid further execution
        
      }

    // Set default headers
    const headers = {
        'Content-Type': 'application/json',
        'Accpet-Language': locale,
        ...(token && { 'Authorization': `Bearer ${token}` }), // Add Authorization header if token exists
        ...options.headers, // Spread existing headers from the options
    };

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // Check for 401 error and handle token expiration
    if (response.status === 401) {
        console.log("Received 401, clearing session");
       
        await fetch(`${process.env.NEXT_SERVER}api/clear-session`, {
            method: "GET",
        });

          console.log("Back from clearing the session");

        //   return { redirect: true }; // Indicate that a redirect is needed
          if (typeof window === 'undefined') {
            // Server-side redirection using Next.js redirect
            console.log("Server side redirection")
            redirect("/home");  // Redirect to the home page
        } else {
            // Client-side redirection
            console.log("Client side redirection")
            window.location.href = `${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}home`;
        }

        // Optionally, return here to avoid further execution
        
     
           
    }

    // Check for response errors and handle accordingly
    if (!response.ok) {
        // You can add additional error handling logic here
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
};
