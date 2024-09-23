import ServiceDetailsPage from '../../components/book-appointment/ServiceDetailsPage'

import Header from '../../components/services-details/Header'
import React from 'react'

const page = async({params,searchParams}) => {

    return (
        <ServiceDetailsPage serviceId={parseInt(searchParams['serviceId'])}/>
    )
}

export default page