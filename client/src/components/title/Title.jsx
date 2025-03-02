import React from "react";

const Title = ({ text = "", className = "", icon = "" }) => {
  return (
    <div className="flex items-center justify-center mb-10 gap-x-3">
      <div className="h-[2px] w-10 bg-black"></div>
      <span className={`font-semibold uppercase ${className}`}>{text}</span>
      <span>{icon}</span>
      <div className="h-[2px] w-10 bg-black"></div>
    </div>
  );
};

export default Title;
