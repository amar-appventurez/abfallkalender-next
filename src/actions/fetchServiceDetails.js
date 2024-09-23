"server only"
import {Endpoints} from "../constants/Endpoint"

export const fetchServiceDetails = async (serviceId) => {


  const params = new URLSearchParams({
    serviceId,
  });

  const url = `${Endpoints.baseUrl}/service?${params}`;

  try {
    const response = await fetch(url, {
      method: 'GET', 
      headers: {
        'Authorization': `Bearer ${Endpoints.token}`, // Ensure the token is correct
        'Content-Type': 'application/json', // Include if necessary
      },
      cache: 'force-cache', // Adjust based on need
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
   
    return data.result.rows[0];
  } catch (error) {
    console.error('Fetch error:', error);
    return {
          "id": 1,
          "name": "Apply for an identity card",
          "ServiceDetails": [
              {
                  "id": 1,
                  "type": "Required documents",
                  "description": [
                      "Proof of identity (initial application:birth certificate)",
                      "Biometric photograph (not older than 6 months) - photo can be taken at the main office",
                      "Proof of identity (initial application:birth certificate)"
                  ],
                  "service_id": 1
              },
              {
                  "id": 2,
                  "type": "Particularities",
                  "description": [
                      "For applying for identity documents for under 18 years old, the personal presence of the minor is a prerequisite",
                      "For applying for identity documents for under 18 years old, the personal presence of the minor is a prerequisite",
                      "Proof of identity (initial application:birth certificate)"
                  ],
                  "service_id": 1
              }
          ],
          "Fees": [
              {
                  "id": 21,
                  "description": "Identity card for applicants over 24 years",
                  "fee": "37.50",
                  "service_id": 1
              },
              {
                  "id": 22,
                  "description": "Identity card for applicants up to 24 years",
                  "fee": "22.80",
                  "service_id": 1
              },
              {
                  "id": 23,
                  "description": "Provisional identitiy card",
                  "fee": "10.00",
                  "service_id": 1
              },
              {
                  "id": 24,
                  "description": "Self-service terminal usage fee",
                  "fee": "6.50",
                  "service_id": 1
              }
          ],
          "category": "Passport/Registration System"
      };
  
  }

};
