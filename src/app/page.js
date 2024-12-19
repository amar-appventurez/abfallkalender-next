
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
import {decrypt, getUserSession} from '../session';
import { cookies } from "next/headers";
export default async function Root() {
  const cookieStore= cookies();
  let isTokenSet=false;
  let streetUrlFound = null;
  try{
    const {userDetails:{token, streetUrl}} =await decrypt(cookieStore.get('session')?.value);
    if(streetUrl) streetUrlFound= streetUrl;
    if(token) isTokenSet=true
  }
  catch{
    isTokenSet=false;
  }
  
 
  if(!isTokenSet){  
    console.log("Redirecting to oauth server");
    redirect(`${Endpoints.baseUrl}/auth/login`);
  }
  
  if(streetUrlFound){
    redirect(`/view-details?dataUrl=${streetUrlFound}`)
  }else{
    redirect('/home')
  }
  

  

   
}
