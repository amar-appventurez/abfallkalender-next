// src/app/actions/sessionHandler.js
"use server";
import { createSession, getUserSession } from '../../session';
import { cookies } from "next/headers";

export async function handleSession(userParams) {
  try {
    const existingSession = await getUserSession();

    if (!existingSession) {
      console.log("Creating new session...");
      await createSession(userParams);

      // Set the session token in the cookie
      const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
      const sessionToken = "your-session-token"; // Adjust as per your logic
      cookies().set("session", sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure only in production
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
      });
    }
    
    return existingSession || { message: "New session created" };
  } catch (error) {
    console.error("Error handling session:", error);
    throw new Error("Session handling failed");
  }
}
