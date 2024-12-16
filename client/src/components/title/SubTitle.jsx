import React from "react";

const SubTitle = ({ icon = "", text = "" }) => {
  return (
    <div className="flex items-center font-medium gap-x-3">
      <span>{icon}</span>
      <span>{text}</span>
      <span className="w-10 h-0.5 bg-black"></span>
    </div>
  );
};

export default SubTitle;
