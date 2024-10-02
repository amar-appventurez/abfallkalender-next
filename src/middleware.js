import { NextResponse } from 'next/server'
// import { getUserSession } from './session'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {

    const { pathname } = new URL(request.url);
    console.log(pathname)
    // Skip session checking for the base path '/'
    if (['/api/session','/'].includes(pathname)) {
        return NextResponse.next(); // Allow the request to proceed
    }
    const session = request.cookies.get("session");
    console.log("Session data found in middleware", session)
    if (!session) {
        console.log("Session not found, redirecting to auth");
        return NextResponse.redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`); 
        // return NextResponse.redirect('/');
    }
    return NextResponse.next(); 
}

export const config = {
    matcher: ['/:path*'], // Match everything except the base `/`
}