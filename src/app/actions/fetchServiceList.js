"use server"
import { headers } from "next/headers";
import {Endpoints} from "../../constants/Endpoint"
import { getUserSession } from "../../session";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import { redirect } from "next/dist/server/api-utils";
export const fetchServiceList = async (page=1) => {
    const result=(await (await fetchWithAuth(`${Endpoints.baseUrl}service/list?page=${page}&size=4`,{})).json());

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const serviceDetails = [
        { id: 1, name: 'Required Documents', description: ['Proof of identity (initial application: birth certificate).', 'Biometric photograph (Not older than 6 months) - photo can be taken in the main office.', 'Proof of identity (initial application: birth certificate).'] },
        { id: 2, name: 'Peculiarities', description: ['For application of identity for a person under 18 years, presence in office is a prerequisite.', 'For application of identity for a person under 18 years, presence in office is a prerequisite.', 'Proof of identity (initial application: birth certificate).'] },
        { id: 3, name: 'Fees', description: ['Proof of identity (initial application: birth certificate).', 'Proof of identity (initial application: birth certificate).'] },
      ];
      resolve(serviceDetails);
    }, 5000);
  });
};




export async function fetchCategoryFilters() {
  
      const params = new URLSearchParams({
        page: 1,
        // size: 4,
      });
    
      const url = `${Endpoints.baseUrl}/service/categories?${params}`;
      const token=(await getUserSession())?.userDetails?.token ?? Endpoints.token;
      try {
        const response = await fetchWithAuth(url, {
          method: 'GET', // Ensure this matches Postman method
          cache: 'force-cache', // Adjust based on need
        });
        
        if (response.redirect) {
          // Perform the redirection
          redirect('/'); // Redirect to the home page
      }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
     
        return data.result.rows;
      } catch (error) {
        console.error('Fetch error:', error);
        return [
          { id: 0, name: "All" },
          { id: 1, name: "Passport"},
          { id: 2, name: "Certificates"},
          { id: 3, name: "Registration of Certificates"},
        ];
      }
      
    };
     
      
  
  export async function fetchCategoriesData() {


    const params = new URLSearchParams({
      page: 1,
      size: 10,
    });
  
    const url = `${Endpoints.baseUrl}/service/list?${params}`;
    const token=(await getUserSession())?.userDetails?.token ?? Endpoints.token;
    try {
      const response = await fetch(url, {
        method: 'GET', // Ensure this matches Postman method
        headers: {
          'Authorization': `Bearer ${token}`, // Ensure the token is correct
          'Content-Type': 'application/json', // Include if necessary
        },
        // cache: 'force-cache', // Adjust based on need
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      
      return data.result.rows;
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }
  

