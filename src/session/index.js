"use server"
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = "process.env.SESSION_SECRET";
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    // .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
    return null;
  }
}

export async function createSession(userDetails, sameSite= false) {
  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7days
  // const session = await encrypt({ userDetails, expiresAt });
  console.log("Is cookies set by same site? ", sameSite)
  const session = await encrypt({ userDetails });

  cookies().set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // false for localhost, true for production
    sameSite: sameSite ? "strict" : "lax",
    path: "/",
  });

  // Now also explicitly accessible on /home
  // cookies().set("session", session, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/home", 
  // });
  
  // console.log("Server side cookie is set...returning session value")
  return session;
}

export async function updateSessionWithStreetUrl(updatedStreetUrl) {
  const session = cookies().get("session").value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const {userDetails:{streetUrl}}= payload;

  if(updatedStreetUrl!= streetUrl){
    payload['userDetails']['streetUrl']= updatedStreetUrl;
    const updatedSession=await encrypt(payload)
    cookies().set("session", updatedSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false for localhost, true for production
      // expires: expiresAt,
      sameSite: "strict",
      path: "/",
    });
  }

  // const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  
}

export async function deleteSession() {
  console.log("Deleting cookie")
  cookies().delete("session");
}

export async function getUserSession() {
  const sessionCookie = cookies().get("session");

  // If the session cookie is not set, return null
  if (!sessionCookie?.value) {
    // console.log("No session cookie found");
    return null;
  }

  // Try to decrypt the session cookie
  try {
    const session = await decrypt(sessionCookie?.value);
    return session;
  } catch (error) {
    console.error("Failed to decrypt session", error);
    return null; // Return null if session decryption fails
  }
}
