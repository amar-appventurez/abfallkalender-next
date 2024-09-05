"use client"

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./style.css";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

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

const Services = () => {
  // const navigate = useNavigate();
  const router= useRouter();
  const [value, setValue] = useState(0);

  const [filters, setFilters] = useState([
    { id: 0, name: "All", isActive: true },
    { id: 1, name: "Passport", isActive: false },
    { id: 2, name: "Certificates", isActive: false },
    { id: 3, name: "Registration of Certificates", isActive: false },
  ]);

  const categoriesData = [
    {
      id: 0,
      title: "Apply for an identity card",
      type: "Passport/registration system",
      image: 'user.svg',
      fees: "€6.50 - €37",
    },
    {
      id: 1,
      title: "Apply for a passport",
      type: "Passport/registration system",
      image: 'aeroplane.svg',
      fees: "€6.50 - €102",
    },
    {
      id: 2,
      title: "Reporting loss of identity card / passport",
      type: "Passport/registration system",
      image: 'shield.svg',
      fees: "Free",
    },
    {
      id: 3,
      title:
        "Setting a new PIN for your ID card/activating the online function",
      type: "Passport/registration system",
      image: 'paper_key.svg',
      fees: "Free",
    },
    {
      id: 4,
      title:
        "Registration, deregistration and change of residence from within the country",
      type: "Passport/registration system",
      image: 'add_user.svg',
      fees: "Free",
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilterChange = (index) => {
    console.log(index, filters);
    setFilters((prevFilters) =>
      prevFilters.map((filter, i) => ({
        ...filter,
        isActive: i === index,
      }))
    );
  };

  useEffect(() => {}, [filters]);

  return (
    <div className="flex flex-col w-full bg-white">
      {/* HEADER */}
      <div className="flex flex-row items-center py-[15px] px-[16px]">
        <div className="flex flex-grow justify-center">
          <span>Service Categories</span>
        </div>
        <img src="search copy.svg" alt="header" />
      </div>

      {/* TAB VIEW */}
      <div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            display: "flex",
            borderBottom: "1px solid #e0e0e0", // Bottom border color for the tabs container
          }}
        >
          <Tab
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
          />
          <Tab
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
          />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-col flex-grow bg-bg-secondary">
            {/* Filter Section */}
            <div className="flex flex-row ml-[16px] my-[16px] gap-[8px] overflow-x-auto pb-[10px]">
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
                Passport/registration System
              </span>

              {categoriesData.map((item, index) => (
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
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="flex felx-col flex-grow bg-bg-secondary">
            <span>Registry Office</span>
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default Services;
