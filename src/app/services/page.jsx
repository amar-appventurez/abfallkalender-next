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
    // <CategoryProvider initialFilters={filters} initialCategoriesData={categoriesData}>
    //   {/* <div className="p-4">
    //   <h1 className="text-2xl font-bold mb-4">Service Listings</h1>
    //   <div className="flex">
    //     <CategoryFilters filtersData={filters}/>
    //     <Listing />
    //   </div>
    // </div> */}

    //   <div className="flex flex-col w-full bg-white">
    //     {/* HEADER */}
    //     <div className="flex flex-row items-center py-[15px] px-[16px]">
    //       <div className="flex flex-grow justify-center">
    //         <span>Service Categories</span>
    //       </div>
    //       <img src="search copy.svg" alt="header" />
    //     </div>
    //     <div className="flex flex-col flex-grow bg-bg-secondary">
    //       <CategoryFilters filtersData={filters} />
    //       <Listing />
    //     </div>

    //   </div>
    // </CategoryProvider>
  )
}

export default page