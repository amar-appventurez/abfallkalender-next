"use client"

import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "../book-appointment/style.css";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Services = ({servicesData, filtersData}) => {
  const serviceT=useTranslations('Services')
  // const navigate = useNavigate();
  const router= useRouter();
  const [value, setValue] = useState(0);

  const finalCategoryData = useMemo(()=>{ return [
    {
      id: 0,
      // name: servicePageTransalation('all'),
      name: serviceT('all'),
    },
    ...filtersData,
  ]},[filtersData])

  let filteredCategoryData = useMemo(()=>finalCategoryData.map((item, index) => {
    return { ...item, isActive: index === 0 ? true : false };
  }),[finalCategoryData]);

  const [filters, setFilters] = useState(filteredCategoryData);
  useEffect(()=>{
    setFilters(filteredCategoryData)
  },[filteredCategoryData])


  const servicesDataWithImage=useMemo(()=>{const array = ['user.svg', 'add_user.svg',  'aeroplane.svg', 'shield.svg','paper_key.svg',];
    return servicesData.map((ele)=>{return {...ele, image: array[Math.floor(Math.random() * array.length)]}})
  }
  ,[servicesData])
  

  const [servicesList,setServicesList] = useState(servicesDataWithImage);
  // useEffect(()=>{
  //   setServicesList(servicesDataWithImage)
  // },[servicesDataWithImage])

    //on filter change update the displayed category list
    useEffect(() => {
      const wordToMatch=filters.reduce((acc,curr)=>{if(curr.isActive){ acc+=curr.name;} return acc;},"").toLowerCase();
      if(wordToMatch == serviceT('all-lowercase')) {setServicesList(servicesDataWithImage); return}
      const regex = new RegExp(`\\b${wordToMatch}\\b`, 'i');
      const filteredServiceList= servicesDataWithImage.filter((ele)=>{ return regex.test(ele.category.toLowerCase())})
      setServicesList(filteredServiceList)
    }, [filters, servicesDataWithImage]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterChange = (index) => {
    // console.log(index, filters);
    setFilters((prevFilters) =>
      prevFilters.map((filter, i) => ({
        ...filter,
        isActive: i === index,
      }))
    );
  };



  return (
    <div className="flex flex-col w-full bg-white">
      {/* HEADER */}
      <div className="flex flex-row items-center py-[12px] px-[16px] w-[100vw] fixed justify-around bg-white">
        <div className="flex flex-grow justify-center">
          <span>{serviceT('service-categories')}</span>
        </div>
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
            <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto pb-[10px] mb-[60px]">
              {filters.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleFilterChange(index)}
                  className={`flex flex-row felx-grow py-[4px] px-[14px] whitespace-nowrap font-normal text-title-tight rounded-2xl cursor-pointer ${
                    item.isActive
                      ? "border-[1px] border-primary bg-custom-blue-100"
                      : "text-title3 bg-white"
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </div>

            <div className="flex flex-col px-[16px]">
              <span className="text-title3 font-semiBold text-header-description">
               {serviceT('pass-register')}
              </span>

              {servicesList.map((item, index) => (
                <div key={index} className="flex flex-row mt-[14px] p-[16px] bg-white rounded-xl gap-[12px] cursor-pointer" onClick={() => { router.push(`/service-details/?serviceId=${item.id}`)}}>
                  <div className="flex flex-row flex-grow items-center gap-[12px]">
                    <img src={item?.image} alt="header" />
                    <div className="flex flex-col gap-[4px]">
                      <span className="text-title3 font-bold-500 text-title-tight">
                        {item?.name}
                      </span>
                      <span className="self-start text-bg-booking-blue font-bold-500 text-title-5 px-[8px] bg-custom-blue-100 rounded-md">
                        {item?.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center gap-[4px]">
                    <span className="text-text-inactive font-normal text-title-7">
                      {serviceT('fee')}
                    </span>
                    <span className="text-bg-booking-blue font-semiBold text-title-7 text-end">
                      {item?.fee}
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
};

export default Services;
