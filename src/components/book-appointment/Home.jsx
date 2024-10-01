import React from "react";
import Badge from "@mui/material/Badge";
// import SetSession from "../SetSession"
import {createSession, decrypt, getUserSession} from '../../session'
import HomeMain from "./HomeMain"

const image = "logo.svg";


import BookingCard from '../BookingCard'


const Home =async ({userParams}) => {
  // Get the session on the server
  const session = await getUserSession(); 
  console.log("Session info fetched", session); 
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

  console.log("Descrypted token", await decrypt("eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyRGV0YWlscyI6eyJ0b2tlbiI6IlUyRnNkR1ZrWDE5Y0lsS1Z4SzQ1a2hHMEhHck54eW1RdDFJM04zakpZMVVZWjlGc2JpVEdUVFdlMGx4NFhlZG1wQ1dVcGdNT3haSWtPQm8rMlFnZ0ZTSUVONTJhQjd5QlJWMkRrODVMcGVsUFZwN2hISlVHTVVuY09iV1J3cmRZTnFFSzIwY2Z5N1V6UDQ5RU9xSGpJa3kyUmV6VE80NzdEUzdibTdMQ00yOUFCNmJVRnpsamowUTIvZmN6MnZ3Vm5Cbi8wYTBqV3crc1EzV2FRQjlqVWdLQ2FyeFRLdzFNcjc1UWg5UHJmSlhKK3FmUHZsL0dyd3dPU3VsZTlSSkkiLCJ1c2VyTmFtZSI6bnVsbCwiZW1haWwiOiJhbWFyLm1pc2hyYUBrb2JpbC5jb20ifSwiZXhwaXJlc0F0IjoiMjAyNC0xMC0wN1QxNDo0NjoyMy40NDNaIiwiaWF0IjoxNzI3NzA3NTgzLCJleHAiOjE3MjgzMTIzODN9.RDYhgVDe8uWXDRKAQ-bxy4CU5TluxvuuBfkJLr1nfAA"))
 
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
