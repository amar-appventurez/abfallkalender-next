"use server"

import { cookies } from "next/headers"; // Adjust the import based on your project structure
import { deleteSession, getUserSession } from "../session";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { Endpoints } from "@/constants/Endpoint";


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
        await fetch("/api/clear-session", {
            method: "GET",
          });
        throw new Error(`Token is missing`);
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
        await fetch("/api/clear-session", {
            method: "GET",
          });
    
          throw new Error("Unauthorized - token expired or invalid");
      
    }

    // Check for response errors and handle accordingly
    if (!response.ok) {
        // You can add additional error handling logic here
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
};
