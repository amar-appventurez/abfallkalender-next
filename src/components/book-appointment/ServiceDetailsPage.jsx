import React from "react";
import Header from "../services-details/Header";
import ServiceDetails from "../services-details/ServiceDetails";
import { fetchServiceDetails } from "../../app/actions/fetchServiceDetails";


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
      <Header name={fetchedDetails.name} category={fetchedDetails.category} />
      <ServiceDetails serviceDetails={transformedServiceDetails} serviceId={serviceId} serviceName={fetchedDetails.name} serviceCategory={fetchedDetails.category} />
      <></>
    </div>
  );
};

export default ServiceDetailsPage;
