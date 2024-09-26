import React from "react";
import Badge from "@mui/material/Badge";
// import SetSession from "../SetSession"
import {createSession, getUserSession} from '../../session'
import HomeMain from "./HomeMain"
import {signUp} from "../../app/actions/signUp"

const image = "logo.svg";
const searchImage = "search.svg";
const serviceOfficeIcon = "diamond.svg";


import BookingCard from '../BookingCard'
import { redirect } from "next/navigation";



async function createNewSession(userParams) {
"use server";

  try {
    const res = await fetch("http://localhost:3000/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userDetails: userParams }),
    });

    if (res.ok) {
      console.log("Session created successfully");
      return true;
    } else {
      console.error("Failed to create session:", res.status, res.statusText);
      return false;
    }
  } catch (error) {
    console.error("Error while session request", error);
    return false;
  }
}

const Home =async ({userParams}) => {
  // Get the session on the server
  const session = await getUserSession();  
  console.log(session)
  const userName = session?.userDetails?.userName;
  if(!session){
    redirect('/')
  }
  // Case: No session or user email
  // if (!userEmail && userParams && Object.keys(userParams).length !== 0) {
  //   try {
  //     console.log("Creating a new session for userParams", userParams);
  //     await createNewSession(userParams);

  //     // Redirect after session is created to avoid session creation on reload
  //     // return redirect('/home');
  //   } catch (error) {
  //     console.error('Error in creating session:', error.message);
  //     return redirect('/');  // Redirect to login page on failure
  //   }
  // }

  // Case: Valid session and user email
  if (userName) {
    return (
      <div className="flex flex-col w-full bg-white mb-[200px]">
        {/* HEADER */}
        <div className="flex flex-row py-[8px] px-[16px] items-center justify-between">
          <img src={image} alt="header" />
          <Badge color="primary" variant="dot"></Badge>
        </div>
        <HomeMain userName={userName} />
        {/* MY BOOKING */}
        <BookingCard />
      </div>
    );
  }

  // Default: If no session and no userParams, redirect to the login page
  // return redirect('/');
 
};

export default Home;
