"use client";

import React from 'react';
import { useCategory } from './CategoryContext';
import { useRouter } from 'next/navigation';

const Listing = () => {
  const { selectedCategory, categoriesData } = useCategory();
  const router = useRouter();

  const filteredCategories = selectedCategory === 'All'
    ? categoriesData
    : categoriesData?.filter(item => item.type === selectedCategory);

  return (
    <div className="flex flex-col px-[16px]">
              <span className="text-title3 font-semiBold text-header-description">
                Passport/registration System
              </span>

              {categoriesData?.map((item, index) => (
                <div key={index} className="flex flex-row mt-[14px] p-[16px] bg-white rounded-xl gap-[12px] cursor-pointer" onClick={() => { router.push('/service-details')}}>
                  <div className="flex flex-row flex-grow items-center gap-[12px]">
                    <img src={item?.image} alt="header" />
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-title3 font-bold-500 text-title-tight">
                        {item?.title}
                      </span>
                      <span className="self-start text-bg-booking-blue font-bold-500 text-title-5 px-[8px] bg-custom-blue-100 rounded-md">
                        {item?.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-[4px]">
                    <span className="text-text-inactive font-normal text-title-7">
                      Fees
                    </span>
                    <span className="text-bg-booking-blue font-semiBold text-title-7">
                      {item?.fees}
                    </span>
                  </div>
                </div>
              ))}
            </div>
  );
};

export default Listing;
