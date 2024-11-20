
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
import {decrypt, getUserSession} from '../session';
import { cookies } from "next/headers";
export default async function Root() {
  const cookieStore= cookies();
  let isTokenSet=false;
  try{
    const {userDetails:{token}} =await decrypt(cookieStore.get('session')?.value);
    if(token) isTokenSet=true
  }
  catch{
    isTokenSet=false;
  }
  
 
  if(!isTokenSet){  
    console.log("Redirecting to oauth server");
    redirect(`${Endpoints.baseUrl}/auth/login`);
  }
 
   const searchResult = [{id: '23829382938.2389238',name: 'Dietrich-Bonhoeffer-Straße'}]    // find from scrapping
   //consent given

   //add missing case for when search term does not have any result

  redirect('/home')

  

   
}
