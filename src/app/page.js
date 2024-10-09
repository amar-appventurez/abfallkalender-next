
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
// import {getUserSession} from '../session';
export default async function Root() {
  // const session= await getUserSession();
  console.log("Redirecting to oauth server");
    redirect(`${Endpoints.baseUrl}/auth/login`);
  // if(!session){
    
   
  // }
  // // redirect(`${process.env.NEXT_SERVER}home`);
  // redirect('/home')
}
