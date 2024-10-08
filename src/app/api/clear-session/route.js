import { NextResponse } from "next/server";
import { deleteSession } from "../../../session";
import { decryptToken, isValidUTF8 } from "../../../constants/common";


export async function GET(request) {
        // Clear the session cookie
        await deleteSession();
        // Perform redirection (server-side)
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SERVER ?? 'http://localhost:3000/'}`, 303);
    
}
