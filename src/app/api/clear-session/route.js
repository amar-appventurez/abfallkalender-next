import { NextResponse } from "next/server";
import { deleteSession } from "../../../session";
import { redirect } from "next/navigation";


export async function GET(request,response) {
        // Clear the session cookie
        // deleteSession();
        // Perform redirection (server-side)

        const response= NextResponse.redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`);

        console.log("Clearing session cookies explicitly")
        response.cookies.delete('session');
        // response.cookies.set('session', '', {
        //     expires: new Date(0), // Set to a date in the past to delete the cookie
        //     path: '/',   
        // });
        return response;   
}
