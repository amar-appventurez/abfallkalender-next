
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
    //redirect OIDC flow for address
    //redirect OIDC flow for consent page
   const consentGiven=true;
   const searchTerm="ef"
   const searchResult = [{id: '23829382938.2389238',name: 'Dietrich-Bonhoeffer-Straße'}]    // find from scrapping
   //consent given

   //add missing case for when search term does not have any result

   if(consentGiven && searchResult.length!==0 )
    redirect(`https://www.ebwo.de/de/abfallkalender/2024/?sTerm=${searchTerm}`)

  

   redirect('https://www.ebwo.de/de/abfallkalender/2024')
}
