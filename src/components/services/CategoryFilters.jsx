"use client";

import React, { useEffect, useState } from 'react';
import { useCategory } from './CategoryContext';

const CategoryFilters = ({filtersData}) => {
  const { selectedCategory, setSelectedCategory} = useCategory();
  const [filters, setFilters] = useState();

  useEffect(()=>{
    if(filtersData){
        setFilters(filtersData);
    }
  },[filtersData])

  const handleFilterChange = (index) => {
    setFilters(filters.map((item, idx) =>
      ({ ...item, isActive: idx === index })
    ));
    setSelectedCategory(index === 0 ? 'All' : filters[index].name);
  };

  return (
      <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto pb-[10px]">
        {filters?.map((item, index) => (
          <div
            key={index}
            onClick={() => handleFilterChange(index)}
            className={`flex flex-row flex-grow py-[4px] px-[14px] whitespace-nowrap font-normal text-title-tight rounded-2xl cursor-pointer ${
              item.isActive
                ? "border-[1px] border-primary bg-custom-blue-100"
                : "text-title3 bg-white"
            }`}
          >
            {item.name}
          </div>
        ))}
      </div>
  );
};

export default CategoryFilters;
