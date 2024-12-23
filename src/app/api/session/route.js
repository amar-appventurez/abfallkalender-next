import { NextResponse } from "next/server";
import { createSession } from "../../../session";
import { decryptToken, isValidUTF8 } from "../../../constants/common";
import { add } from "date-fns";


/** Handler for post route for actual callback for backend redirection after 
 * successful Oath
 * Uncomment post handler and comment get handler in production
 */

// // POST request handler
// export async function POST(request) {
//   try {
//     const authHeader = request.headers.get('authorization');
//     if (authHeader !== process.env.API_ROUTE_KEY) { 
//       return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 404 }); 
//     }
//     const { userDetails } = await request.json(); // Parse request body
//     const sessionToken = await createSession({ userDetails }); // Create session

//     const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Set expiration

//     // Create a redirect response
//     const response = NextResponse.redirect(`${process.env.NEXT_SERVER ?? "http://localhost/3000/"}home`); // Redirect to /home
//     console.log(sessionToken)
//     // Set the session cookie
//     response.cookies.set({
//       name: "session",
//       value: sessionToken,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       expires: expiresAt,
//       sameSite: "strict",
//       path: "/",
//     });

//     return response; // Return the redirect response with the cookie
//   } catch (error) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }


/** Handler for get route for testing through browser */

export async function GET(request) {
    // Extract query parameters (e.g., tokens or user info)

    // const authHeader = request.headers.get('authorization');
    // if (authHeader !== process.env.API_ROUTE_KEY) { 
    //   return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 404 }); 
    // }
    const { searchParams } = new URL(request.url);
    console.log("Request", request.url)
    const oauthToken = searchParams.get('token');
    const userName = searchParams.get('name') || `${searchParams.get('given_name')} ${searchParams.get('family_name')}`;
    const email= searchParams.get('email')
    const streetAddress = searchParams.get('street_address');
    const streetUrl= searchParams.get('street_url');
   
    const consent = searchParams.get('consent');

    const emailVerified= searchParams.get('email_verified') ?? false;
   
    // if (!oauthToken) {
    //     return NextResponse.redirect('/');  // Handle OAuth failure
    // }
  
    // Use the token and user data to create a session
    // const userDetails = {
    //     token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFtYXIubWlzaHJhQGtvYmlsLmNvbSIsImlhdCI6MTcyODk5NTc0NiwiZXhwIjoxNzI5MDgyMTQ2fQ.362ocb-uPwsgnIKE-196-kIKlgayGG49Iu1ixcM8nV8',
    //     userName: "amar",
    //     email:"amar.m130@gmail.com"
    // };
    if(consent && consent.toLowerCase() === 'false'){
        return NextResponse.redirect('https://www.ebwo.de/de/abfallkalender/2024');
    }
    const decryptedToken = await decryptToken(oauthToken); 
    if (typeof decryptedToken !== 'string' || !isValidUTF8(decryptedToken)) {
        return NextResponse.json({ success: false, message: 'Invalid token format' }, { status: 400 });
    }
    const userDetails = {
        token: decryptedToken,
        userName,
        email,
        streetAddress,
        streetUrl: streetUrl || undefined,
        encrptedToken: oauthToken
    };
    let redirectUrl
  
    if(streetUrl){
        redirectUrl = new URL(`/view-details?dataUrl=${streetUrl}`,request.url)
    }else{
        redirectUrl = new URL('/home',request.url)
    }
    // Create the session with the token
    const sessionToken = await createSession(userDetails, !emailVerified);

    const response = NextResponse.redirect(`${redirectUrl}`);  // Redirect to homepage after successful login
    //for same site explicity set cookie head
    if(!emailVerified){
        response.cookies.set('session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            // secure:false,
            sameSite: 'strict',
            path: '/',
            // expires: new Date(Date.now() +  50 * 1000) // 50 sec
        });
    }
    
    return response;
}

export async function DELETE(request) {
    // Clear cookies on logout
    cookies().delete('session')
  
    return NextResponse.json({ success: true })
  }