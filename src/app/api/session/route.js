import { NextResponse } from "next/server";
import { createSession } from "../../../session";


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
    const authHeader = request.headers.get('authorization');
    if (authHeader !== process.env.API_ROUTE_KEY) { 
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 404 }); 
    }
    const { searchParams } = new URL(request.url);
    const oauthToken = searchParams.get('token');
    const userName = searchParams.get('userName');
    const email= searchParams.get('email')
    if (!oauthToken) {
        return NextResponse.redirect('/error');  // Handle OAuth failure
    }

    // Use the token and user data to create a session
    const userDetails = {
        token: oauthToken,
        userName: userName,
        email
    };

    // Create the session with the token
    const sessionToken = await createSession(userDetails);

    // Set the session cookie in the response
    const response = NextResponse.redirect(`${process.env.NEXT_SERVER ?? "http://localhost/3000/"}home`);  // Redirect to homepage after successful login
    response.cookies.set('session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
    });

    return response;
}
