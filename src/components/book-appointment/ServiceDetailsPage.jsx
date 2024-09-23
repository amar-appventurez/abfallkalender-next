import React from "react";
import Header from "../services-details/Header";
import ServiceDetails from "../services-details/ServiceDetails";
import { fetchServiceDetails } from "../../actions/fetchServiceDetails";


const ServiceDetailsPage = async ({ serviceId }) => {
  const fetchedDetails = await fetchServiceDetails(serviceId);
  // setServiceName(fetchedDetails['name']);
  // setServiceCategory(fetchedDetails['category']);
  const transformFeesDetails = {
    ...fetchedDetails["Fees"]?.reduce((acc, curr) => { acc.fee.push(curr.fee); acc.description.push(curr.description); return acc }, { fee: [], description: [] })
    , name: "Fees"
  }
  const transformedServiceDetails = fetchedDetails["ServiceDetails"]?.map((ele) => {
    return {
      name: ele.type,
      description: ele.description
    }
  });

  transformedServiceDetails?.push(transformFeesDetails)
  return (
    <div className="flex flex-col">
      {/* <div className="flex flex-row items-center py-[15px] px-[16px] bg-white">
            <img className="cursor-pointer" src='chevron-left.svg' alt="back" onClick={() => { router.push('/services') }} />
            <div className="flex flex-grow justify-center">
                <span>Service Details</span>
            </div>
            <img src="search copy.svg" alt="header" />
        </div>
        <div className='px-[16px] py-[20px] bg-white'>
            <div className='flex flex-col gap-[12px]'>
            <img className="cursor-pointer w-[24px]" src='square-user-round.svg' alt="back" onClick={() => { router.push('/services') }} />
            <span className='text-large-none-semibold text-semibold'>Apply for an identity card</span>
            <span className='text-bg-booking-blue text-title-5 py-[2px] px-[8px] bg-custom-blue-100 rounded-md w-fit-content'>Passport/registration system</span>
            </div>
        </div> */}
      <Header name={fetchedDetails.name} category={fetchedDetails.category} />
      <ServiceDetails serviceDetails={transformedServiceDetails} serviceId={serviceId} serviceName={fetchedDetails.name} serviceCategory={fetchedDetails.category} />
      <></>
    </div>
  );
};

export default ServiceDetailsPage;
