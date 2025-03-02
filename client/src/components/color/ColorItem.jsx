import React from "react";

const ColorItem = ({
  hexCode,
  isChecked = false,
  onClick = () => {},
  className = "",
  disabled = false,
}) => {
  return (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{ backgroundColor: hexCode }}
      className={`${className} w-6 h-6 rounded-full border-4 transition-all 
        ${disabled ? "cursor-not-allowed border-0" : "cursor-pointer"}
        ${isChecked && !disabled ? "border-delivered" : "border-0"}
      `}
    ></div>
  );
};

export default ColorItem;
