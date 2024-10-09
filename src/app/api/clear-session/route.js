import { NextResponse } from "next/server";
import { deleteSession } from "../../../session";


export async function GET(request) {
        // Clear the session cookie
        // await deleteSession();
        // Perform redirection (server-side)

        const response= NextResponse.redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`);

        console.log("Clearing session cookies explicitly")
        response.cookies.set('session', '', {
            expires: new Date(0), // Set to a date in the past to delete the cookie
            path: '/',            // Make sure the path matches where the cookie was set
        });
    
        return response;
        
    
}
