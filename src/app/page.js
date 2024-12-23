
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
import {decrypt, getUserSession} from '../session';
import { cookies } from "next/headers";
export default async function Root() {
  const cookieStore= cookies();
  let isTokenSet=false;
  let streetUrlFound = null;
  try{
    const decryptedCookie=await decrypt(cookieStore.get('session')?.value);
    console.log("Decrypted cookie in home page", decryptedCookie);
    const {userDetails:{token, streetUrl}} = decryptedCookie;
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
    console.log("From home page: Redirecting to view details page with streetUrl: ",streetUrlFound)
    redirect(`/view-details?dataUrl=${streetUrlFound}`)
  }else{
    redirect('/home')
  }
   
}
