import React from "react";

const IconMenu = ({ className = "size-6" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      id="menu"
      className={className}
    >
      <g>
        <g>
          <rect width={18} height={2} x={3} y={11} rx=".95" ry=".95" />
          <rect width={18} height={2} x={3} y={16} rx=".95" ry=".95" />
          <rect width={18} height={2} x={3} y={6} rx=".95" ry=".95" />
        </g>
      </g>
    </svg>
  );
};

export default IconMenu;
