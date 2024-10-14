"use client"; // Ensure this component is rendered on the client side

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import { Button } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const ServiceDetails = ({ serviceDetails, serviceId, serviceName, serviceCategory, forDisplay = false }) => {
  // const [serviceDetails, setServiceDetails] = useState([]);

  // const [loading, setLoading] = useState(true);
  const router = useRouter(); // Initialize useRouter hook
  // const [serviceName, setServiceName]= useState();
  // const [serviceCategory, setServiceCategory]= useState();
  const searchParams = useSearchParams();
  const serviceDTrans= useTranslations('ServiceDetails')

  // useEffect(() => {
  //   const getServiceDetails = async () => {
  //     try {

  //       const fetchedDetails = await fetchServiceDetails(serviceId);
  //       console.log("Fetched details", Object.keys(fetchedDetails))
  //       const keys=Object.keys(fetchedDetails)
  //       setServiceName(fetchedDetails['name']);
  //       setServiceCategory(fetchedDetails['category']);
  //       const transformFeesDetails= { ...fetchedDetails["Fees"].reduce((acc,curr)=>{acc.fee.push(curr.fee); acc.description.push(curr.description); return acc},{ fee:[], description:[]}) 
  //       , name: "Fees"}
  //       const transformedServiceDetails=fetchedDetails["ServiceDetails"]?.map((ele)=>{
  //         return {
  //           name: ele.type,
  //           description: ele.description
  //         }
  //       })

  //       transformedServiceDetails.push(transformFeesDetails)

  //       console.log("Transformed details from api",transformedServiceDetails);
  //       setServiceDetails( transformedServiceDetails ?? []);
  //     } catch (error) {
  //       console.error("Error fetching service details:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getServiceDetails();
  // }, []);

  // if (loading) {
  //   const serviceDetailsSkeleton=[{},{}]
  //   return (
  //     <div className="container mx-auto px-4 py-8  bg-bg-secondary h-[500px]">
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //         {serviceDetailsSkeleton.map((service) => (
  //           <div key={service.id} className="col-span-1">
  //             <p className="font-bold-500 text-header-description m-0 p-4 w-[100px] h-[22px]">{""}</p>
  //             <div className="bg-white shadow-md rounded-lg p-4 w-[343px] animate-pulse h-[200px]">
  //             </div>
  //           </div>
  //         ))}
  //       </div>


  //       <div className="text-center mt-8">


  //         <button class="flex items-center justify-center px-4 py-2 bg-worms-blue text-white border-none rounded-xl cursor-pointer relative w-bottom-nav-button h-bottom-nav-button">
  //           <span class="flex-1 text-center text-white"> Select Location</span>
  //           <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
  //         </button>
  //       </div>

  //     </div>);
  // }

  if (serviceDetails?.length === 0) {
    return <>{serviceDTrans('no-service')}</>; // Handle the case where there are no service details available
  }

  // Handler function for button click
  const handleSelectLocation = () => {
    router.push(`/book-service?serviceId=${serviceId}&serviceName=${serviceName}&serviceCategory=${serviceCategory}`); // Replace '/your-target-route' with your desired route
  };

  return (
    <div className="container mx-auto px-4 py-8  bg-bg-secondary pb-[75px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {serviceDetails?.map((service, index) => (
          <div key={index} className="col-span-1">
            <p className="font-bold-500 text-header-description-1 m-0 p-4">{service.name}</p>
            <div className="bg-white shadow-md rounded-lg p-4">
              <ul className="list-disc">
                {service.description.map((item, index) => (
                  <li key={index} className='ml-4'>
                    <p className="font-normal text-small-tight-regular ">{item}{service.name === "Fees" && <>{" "}<span className='font-bold-900'>{`€${service?.fee[index]}`}</span></>}</p>
                    {index !== service.description.length - 1 && <hr className="my-[5px] text-border-color width-[311px]" />}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Select Location Button */}
      {!forDisplay && <div className="text-center mt-8">

        <button className="flex items-center justify-center px-4 py-2 bg-worms-blue text-white border-none rounded-xl cursor-pointer relative w-[100%] h-bottom-nav-button"
          onClick={handleSelectLocation}>
          <span className="flex-1 text-center text-white">{serviceDTrans('select-location')}</span>
          <img className="cursor-pointer" src='chevron-right.svg' alt="back" />
        </button>
      </div>}


    </div>
  );
};

export default ServiceDetails;