import React from "react";

const MyBooking = ({ color = "#CDCDD6" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.83325 2V6M16.8333 2V6M21.8333 14V6C21.8333 5.46957 21.6225 4.96086 21.2475 4.58579C20.8724 4.21071 20.3637 4 19.8333 4H5.83325C5.30282 4 4.79411 4.21071 4.41904 4.58579C4.04397 4.96086 3.83325 5.46957 3.83325 6V20C3.83325 20.5304 4.04397 21.0391 4.41904 21.4142C4.79411 21.7893 5.30282 22 5.83325 22H13.8333M3.83325 10H21.8333M16.8333 20L18.8333 22L22.8333 18"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MyBooking;
