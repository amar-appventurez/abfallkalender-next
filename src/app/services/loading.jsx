import { useTranslations } from 'next-intl';
import React from 'react'

const Loading = () => {
  const serviceT= useTranslations('Services')
  return (
    <div className="flex flex-col w-full bg-white">
    {/* HEADER */}
    <div className="flex flex-row items-center py-[15px] px-[16px]">
      <div className="flex flex-grow justify-center">
        <span>{serviceT('service-categories')}</span>
      </div>
      <img src="search copy.svg" alt="header" />
    </div>

    {/* TAB VIEW */}
      {/* <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          display: "flex",
          borderBottom: "1px solid #e0e0e0", // Bottom border color for the tabs container
        }}
      >
        {/* <Tab
          label="Service Office"
          {...a11yProps(0)}
          sx={{
            flexGrow: 1,
            color: "#8D8D95", // Default label color
            borderColor: "#014899",
            fontFamily: "figtree",
            "&.Mui-selected": {
              color: "#1F1F25", // Selected label color
            },
            "&:hover": {
              color: "#1F1F25", // Hover label color
            },
          }}
        /> */}
        {/* <Tab
          label="Registry Office"
          {...a11yProps(1)}
          sx={{
            flexGrow: 1,
            color: "#8D8D95",
            borderColor: "#014899",
            fontFamily: "figtree",
            "&.Mui-selected": {
              color: "#1F1F25",
            },
            "&:hover": {
              color: "#1F1F25",
            },
          }}
        /> */}
      {/* </Tabs>  */}
      {/* <CustomTabPanel value={value} index={0}> */}
        <div className="flex flex-col flex-grow bg-bg-secondary">
          {/* Filter Section */}
          <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto pb-[10px]">
            {Array.from({length:5}).map((item, index) => (
              <div
                key={index}
                className={`animate-pulse flex flex-row felx-grow py-[4px] px-[14px] whitespace-nowrap font-normal text-title-tight rounded-2xl cursor-pointer ${
                  item?.isActive
                    ? "border-[1px] border-primary bg-custom-blue-100"
                    : "text-title3 bg-white"
                }`}
              >
                {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</>}
              </div>
            ))}
          </div>

          <div className="flex flex-col px-[16px]">
            <span className="text-title3 font-semiBold text-header-description">
             {serviceT('pass-register')}
            </span>

            {Array.from({length:4}).map((item, index) => (
              <div key={index} className="animate-pulse flex flex-row mt-[14px] p-[16px] bg-white rounded-xl gap-[12px] cursor-pointer">
                <div className="flex flex-row flex-grow items-center gap-[12px]">
                  <img src={item?.image} alt="header" />
                  <div className="flex flex-col gap-[4px]">
                    <span className="text-title3 font-bold-500 text-title-tight">
                      {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;</>}
                    </span>
                    <span className="self-start text-bg-booking-blue font-bold-500 text-title-5 px-[8px] bg-custom-blue-100 rounded-md">
                      {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;</>}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center gap-[4px]">
                  <span className="text-text-inactive font-normal text-title-7">
                    {serviceT('fee')}
                  </span>
                  <span className="text-bg-booking-blue font-semiBold text-title-7 text-end">
                    {<>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</>}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      {/* </CustomTabPanel> */}
      {/* <CustomTabPanel value={value} index={1}>
        <div className="flex felx-col flex-grow bg-bg-secondary">
          <span>Registry Office</span>
        </div>
      </CustomTabPanel> */}
    </div>
  
);
}

export default Loading