import { NextResponse } from "next/server";
import { deleteSession } from "../../../session";


export async function GET(request) {
        // Clear the session cookie
        await deleteSession();
        // Perform redirection (server-side)
        return NextResponse.redirect(`${process.env.NEXT_SERVER ?? 'http://localhost:3000/'}`);
    
}
