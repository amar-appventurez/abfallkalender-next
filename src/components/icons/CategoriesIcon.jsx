import React from "react";

const CategoriesIcon = ({ color = "#CDCDD6" }) => {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 6H21.5M8.5 12H21.5M8.5 18H21.5M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CategoriesIcon;
