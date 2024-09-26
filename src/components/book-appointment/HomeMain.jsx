import { useTranslations } from 'next-intl'
import React from 'react'

const searchImage = "search.svg";
const serviceOfficeIcon = "diamond.svg";

const HomeMain = ({userName}) => {
    const homeT=useTranslations('HomePage')
  return (
    <>
    {/* WELCOME */}
    <div className="flex flex-col mt-[20px] py-[9px] px-[16px]">
    <span className="text-title3 font-semiBold text-title-3">
      {`${homeT('good-morning')} ${userName ?? 'Andrew'} `}
    </span>
    <span className="text-text-secondary font-normal text-header-description">
      {homeT('all-in-one')}
    </span>
  </div>

  {/* SEARCH */}
  <div className="flex flex-col p-[16px]">
    <div className="relative flex items-center w-[100%]">
      <img
        className="absolute left-3 text-gray-500"
        src={searchImage}
        alt="search-image"
      />
      <input
        type="text"
        className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-border-color"
        placeholder={homeT('search-placeholder')}
      />
    </div>
  </div>

  {/* FUNCTIONAL UNIT SERVICE */}
  <div className="flex flex-col px-[16px] bg-bg-secondary">
    <span className="text-title3 font-semiBold text-title-large mt-[24px]">
      {homeT('functional-unit')}
    </span>
    <div className="grid grid-cols-2 mt-[12px] gap-[10px]">
      <div className="flex flex-col p-[16px] bg-white rounded-xl">
        <img className="size-10" src={serviceOfficeIcon} alt="bg-image" />
        <span className="text-title3 font-semiBold text-title-tight mt-[16px]">
        {homeT('service-office')}
        </span>
      </div>
      {/* <div className="flex flex-col p-[16px] bg-white rounded-xl">
        <img className="size-10" src={registryOfficeIcon} alt="bg-image" />
        <span className="text-title3 font-semiBold text-title-tight mt-[16px]">
          Registry Office
        </span>
      </div> */}
    </div>
  </div>
</>
  )
}

export default HomeMain