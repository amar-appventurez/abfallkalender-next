import React from "react";
import Badge from "@mui/material/Badge";
// import SetSession from "../SetSession"
import {createSession, getUserSession} from '../../session'
import HomeMain from "./HomeMain"

const image = "logo.svg";


import BookingCard from '../BookingCard'


const Home =async ({userParams}) => {
  // Get the session on the server
  const session = await getUserSession();  
  const userName = session?.userDetails?.userName;
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
 
 
};

export default Home;
