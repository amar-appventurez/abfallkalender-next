
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
import {getUserSession} from '../session';
export default async function Root() {
  const session= await getUserSession();
  console.log("Session found in root path", session)
  console.log("Redirecting to oauth server");
 
  if(!session){  
    redirect(`${Endpoints.baseUrl}/auth/login`);
  }
  // // redirect(`${process.env.NEXT_SERVER}home`);
  redirect('/home')
}
