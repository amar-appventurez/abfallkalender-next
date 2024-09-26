"use server"
import { redirect } from "next/navigation";
import { createSession } from "../../session";
import { cookies } from "next/headers";
export async function signUp(userDetails) {
  console.log("Generating session token..... ")
    const sessionToken=await createSession(userDetails);
    console.log("Session token", sessionToken)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    cookies().set("session", sessionToken , {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false for localhost, true for production
      expires: expiresAt,
      sameSite: "strict",
      path: "/",
    });
    console.log("Redirecting to home")
    // redirect("/home");
  }