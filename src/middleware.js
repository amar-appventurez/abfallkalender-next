// import { NextResponse } from 'next/server'
// import { getUserSession } from './session';


// This function can be marked `async` if using `await` inside
// export async function middleware(request) {

//     const { pathname } = new URL(request.url);
//     console.log(pathname)
    
   
//     // Skip session checking for the base path '/'
//     if (['/api/session','/','/api/clear-session'].includes(pathname)) {
//         return NextResponse.next(); // Allow the request to proceed without session check
//     }
    
//     const session = await getUserSession();
//     // const session= request.cookies.get('session');
//     console.log("Session data found in middleware", session)
//     if (!session) {
//         console.log("Session not found, redirecting to auth");
//         // return NextResponse.redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`); 
//         // const loginUrl = new URL("/", request.url)
//         // return NextResponse.redirect(loginUrl);
//     }
//     return NextResponse.next(); 
// }

// export const config = {
//     matcher: ['/:path*'], // Match everything except the base `/`
// }






import { NextResponse } from 'next/server';
import { jwtVerify, decodeJwt } from 'jose'; // JWT verification library
import { decrypt } from './session';
let url;
export async function middleware(req) {
  try {
    console.log("::::::::::Middleware is hit:::::::")
    
    url = req.nextUrl.clone(); // Clone the Next.js URL object

    const decyptedSessionCookie = await decrypt(req.cookies.get('session')?.value);
    console.log("Decypted session cookie in middleware", decyptedSessionCookie)
    const {userDetails:{token}}= decyptedSessionCookie ?? {};
    // If no token exists, redirect to the login page
    if (!token) {
      console.log("No token found");
      console.log("Sending new login request to generate a token")
      const response = NextResponse.redirect(process.env.NEXT_SERVER);

      // Delete the session cookie if the token is expired
      response.cookies.set('session', '', { maxAge: 0 });
      return response;
    }

    // Allow access to the login route without authentication
    if (url.pathname === '/' || url.pathname.startsWith('/api/session') || ['/api/session'].includes(url.pathname)) {
        console.log(url.pathname)
        if(!token){
            return NextResponse.next();
        }
        return NextResponse.redirect('/home');
    }
   

    // Decode the token to check its expiration
    const decodedToken = decodeJwt(token);
    const now = Math.floor(Date.now() / 1000);

    // Check if token is expired
    if (decodedToken.exp && decodedToken.exp < now) {
      console.log('Token expired');
      console.log("Sending new login request to generate a token")
      const response = NextResponse.redirect(process.env.NEXT_SERVER);

      // Delete the session cookie if the token is expired
      response.cookies.set('session', '', { maxAge: 0 });
      return response;
    }
    // If the token is still valid, verify it (signature check)
    // await jwtVerify(session?.token, new TextEncoder().encode(process.env.JWT_SECRET));

    return NextResponse.next(); // Token is valid, proceed with the request
  } catch (error) {
    console.log('JWT Verification Error:', error.message || error);

    // Token is invalid or expired, delete the session cookie and redirect to login
    const response = NextResponse.redirect(process.env.NEXT_SERVER);
    response.cookies.set('session', '', { maxAge: 0 });
    return response;
  }
}

export const config = {
  matcher: ['/home','/bookings','/services','/service-details','/book-service','/','/api/session'],  //middleware apply on the paths(specific routes)
};
