import { NextResponse } from "next/server";
import { deleteSession } from "../../../session";
import { Endpoints } from "../../../constants/Endpoint";


export async function GET(request) {
        // Clear the session cookie
        console.log("Clearing session and redirecting...");
        await deleteSession();
        // Perform redirection (server-side)
        return NextResponse.redirect(`${Endpoints.baseUrl}/auth/login`);
    
}
