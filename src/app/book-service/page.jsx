import React from 'react'
import MultiStepForm from '../../components/services-details/MultiStepForm';

const page = async ({ searchParams }) => {
  return (
    <MultiStepForm
      serviceId={searchParams['serviceId']}
      serviceName={searchParams['serviceName']}
      serviceCategory={searchParams['serviceCategory']} />
  )
}

export default page