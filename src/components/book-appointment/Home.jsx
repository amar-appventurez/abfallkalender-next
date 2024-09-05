import React from "react";
import Badge from "@mui/material/Badge";

const image = "logo.svg";
const searchImage = "search.svg";
const serviceOfficeIcon = "diamond.svg";
const registryOfficeIcon = "paper.svg";
const bookingIcon = "user.svg";
const calenderClockIcon = "calendar-clock.svg";
const mapPinIcon = "map-pin.svg";
const sendIcon = "send.svg";

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-white">
      {/* HEADER */}
      <div className="flex flex-row py-[8px] px-[16px] items-center justify-between">
        <img src={image} alt="header" />
        <Badge color="primary" variant="dot">
        </Badge>
      </div>

      {/* WELCOME */}
      <div className="flex flex-col mt-[20px] py-[9px] px-[16px]">
        <span className="text-title3 font-semiBold text-title-3">
          Good Morning, Andrew
        </span>
        <span className="text-text-secondary font-normal text-header-description">
          All-in-one online service of Worms city administration
        </span>
      </div>

      {/* SEARCH */}
      <div className="flex flex-col p-[16px]">
        <div className="relative flex items-center w-full">
          <img
            className="absolute left-3 text-gray-500"
            src={searchImage}
            alt="search-image"
          />
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 border rounded-full focus:outline-none focus:ring-2 focus:ring-border-color"
            placeholder="Search Service here..."
          />
        </div>
      </div>

      {/* FUNCTIONAL UNIT SERVICE */}
      <div className="flex flex-col px-[16px] bg-bg-secondary">
        <span className="text-title3 font-semiBold text-title-large mt-[24px]">
          Functional Unit Service
        </span>
        <div className="grid grid-cols-2 mt-[12px] gap-[10px]">
          <div className="flex flex-col p-[16px] bg-white rounded-xl">
            <img className="size-10" src={serviceOfficeIcon} alt="bg-image" />
            <span className="text-title3 font-semiBold text-title-tight mt-[16px]">
              Service Office
            </span>
          </div>
          <div className="flex flex-col p-[16px] bg-white rounded-xl">
            <img className="size-10" src={registryOfficeIcon} alt="bg-image" />
            <span className="text-title3 font-semiBold text-title-tight mt-[16px]">
              Registry Office
            </span>
          </div>
        </div>
      </div>

      {/* MY BOOKING */}
      <div className="flex flex-col px-[16px] bg-bg-secondary">
        <div className="flex flex-row items-center justify-between mt-[24px]">
          <span className="text-title3 font-semiBold text-title-large">
            My Booking
          </span>
          <span className="text-primary font-bold-500 text-title-small">
            see all
          </span>
        </div>
        <div className="flex flex-col p-[16px] bg-white rounded-xl mt-[20px]">
          <div className="flex flex-row items-center gap-[12px]">
            <img className="size-10" src={bookingIcon} alt="bg-image" />
            <div className="flex flex-col gap-[4px]">
              <span className="text-title3 font-bold-500 text-title-tight">
                Apply for identity card
              </span>
              <span className="py-[2px] px-[8px] bg-custom-blue-100 text-bg-booking-blue font-bold-500 text-title-5 rounded-md">
                Passport/registration system
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-bg-secondary mt-[16px] p-[12px] rounded-lg gap-[12px]">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[8px]">
                <img
                  className="size-[18px]"
                  src={calenderClockIcon}
                  alt="calender-clock"
                />
                <div className="flex flex-col gap-[4px]">
                  <span className="text-title3 font-bold-500 text-title-6">
                    Wed, 31 July 2024
                  </span>
                  <span className="text-text-secondary font-normal text-title-7">
                    13:00
                  </span>
                </div>
              </div>
              <div className="bg-bg-upcoming py-[2px] px-[8px] rounded-md text-bg-booking-blue font-bold-500 text-title-5 flex items-center justify-center">
                Upcoming
              </div>
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[8px]">
                <img className="size-[18px]" src={mapPinIcon} alt="map-pin" />
                <div className="flex flex-col gap-[4px]">
                  <span className="text-title3 font-bold-500 text-title-6">
                    Office of the Mayor Horchheim
                  </span>
                  <span className="text-text-secondary font-normal text-title-7">
                    Old Market Square 1, 67551 Worms
                  </span>
                </div>
              </div>
              <img className="size-[18px]" src={sendIcon} alt="send" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
