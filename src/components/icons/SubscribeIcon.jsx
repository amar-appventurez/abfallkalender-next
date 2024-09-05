import React from "react";

const SubscribeIcon = ({ color = "#CDCDD6" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.83325 17L5.83325 19L9.83325 15M13.8333 6H21.8333M13.8333 12H21.8333M13.8333 18H21.8333M4.83325 5H8.83325C9.38554 5 9.83325 5.44772 9.83325 6V10C9.83325 10.5523 9.38554 11 8.83325 11H4.83325C4.28097 11 3.83325 10.5523 3.83325 10V6C3.83325 5.44772 4.28097 5 4.83325 5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SubscribeIcon;
