import { cookies } from "next/headers"; // Adjust the import based on your project structure
// import { deleteSession, getUserSession } from "../session";
import { getLocale } from "next-intl/server";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";


// Function to get the token from cookies
// const getToken = async () => {
//     const session = await getUserSession(); // Replace 'session' with your cookie name
//     return session?.userDetails?.token ?? null; // Adjust based on your token structure
// };


// const handleRedirect = () => {
//     const redirectUrl = `${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`
//     if (typeof window === 'undefined') {
//         console.log("Server side redirection")
//         return NextResponse.redirect(redirectUrl)
//     } else {
//         console.log("Client side redirection")
//         window.location.href = redirectUrl;
//     }
// }

const getSessionToken = () => {
    if (typeof window === 'undefined') {
        const cookieStore = cookies();
        const session = cookieStore.get('session')?.value;
        return session?.userDetails?.token
    } else {
        const match = document.cookie.match(new RegExp('(^| )session=([^;]+)'));
        console.log("Client getSession token value- in client api call", decodeURIComponent(match[2]))
        return match ? decodeURIComponent(match[2]) : null;
    }
};


// Custom fetch function
export const fetchWithAuth = async (url, options = {}) => {
    // const token = await getToken();
    const token = getSessionToken();
    const locale = getLocale();

    // if (!token) {
    //     // // await fetch(`${process.env.NEXT_SERVER}api/clear-session`, {
    //     // //     method: "GET",
    //     // //   });
    //     // //   console.log("Back from clearing the session--token was missing");
    //     // if (typeof window === 'undefined') {
    //     //     // Server-side redirection using Next.js redirect
    //     //     console.log("Server side redirection")
    //     //     redirect("/");  // Redirect to the login page
    //     // } else {
    //     //     // Client-side redirection
    //     //     console.log("Client side redirection")
    //     //     window.location.href = `${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`;
    //     // }
    //     // return 
    //     return handleRedirect() 
    // }

    if (!token) {
        throw new Error("Session token missing"); // Middleware should already handle redirect
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

    //Removing redirection from this function and handling it in the middleware

    // Check for 401 error and handle token expiration
    // if (response.status === 401) {
    //     console.log("Received 401, clearing session and redirecting")
    //     await deleteSession();
    //     return handleRedirect();
    // }

    // Check for response errors and handle accordingly
    if (!response.ok) {
        // You can add additional error handling logic here
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response;
};
