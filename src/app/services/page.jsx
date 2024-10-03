import Services from '../../components/services/Services'
import React from 'react'
import CategoryFilters from '../../components/services/CategoryFilters';
import Listing from '../../components/services/Listing';
import { CategoryProvider } from '../../components/services/CategoryContext';
import { fetchCategoryFilters, fetchCategoriesData } from "../actions/fetchServiceList"
const page = async () => {

  const [filters, servicesData] = await Promise.all([
    fetchCategoryFilters(),
    fetchCategoriesData(),
  ]);

 

  return (
    <Services filtersData={filters} servicesData={servicesData}></Services>
    
  )
}

export default page