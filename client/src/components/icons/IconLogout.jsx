import React from "react";

const IconLogout = ({ className = "size-6" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      id="logout"
      className={className}
    >
      <path
        fill="#222"
        d="M32 52.72a20.43 20.43 0 0 1-14.13-35.17 1 1 0 0 1 1.42 0 1 1 0 0 1 0 1.41 18.42 18.42 0 1 0 25.48 0 1 1 0 0 1 0-1.41 1 1 0 0 1 1.42 0A20.43 20.43 0 0 1 32 52.72Z"
      />
      <path
        fill="#222"
        d="M32 34a1 1 0 0 1-1-1V12.28a1 1 0 0 1 2 0V33a1 1 0 0 1-1 1Z"
      />
    </svg>
  );
};

export default IconLogout;
