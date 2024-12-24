
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
import {decrypt, getUserSession} from '../session';
import { cookies } from "next/headers";
import { fetchUserInfo } from "./actions/fetchUserInfo";
export default async function Root() {
  const cookieStore= cookies();
  let isTokenSet=false;
  let streetUrlFound = null;
  try{
    const decryptedCookie=await decrypt(cookieStore.get('session')?.value);
    const userInfo= await fetchUserInfo();
    const {userDetails:{token}} = decryptedCookie;
    if(userInfo?.streetUrl) streetUrlFound= userInfo?.streetUrl;
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
