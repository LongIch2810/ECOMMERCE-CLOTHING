import React from "react";

const Radio = ({ children, checked = false, onClick = () => {} }) => {
  return (
    <div
      className={`flex items-center p-1.5 md:p-2 border ${
        checked ? "border-delivered" : "border-primary"
      } rounded-lg cursor-pointer gap-x-3 overflow-hidden truncate whitespace-normal`}
      onClick={onClick}
    >
      <div
        className={`inline-flex items-center justify-center w-3 h-3 border rounded-full md:w-5 md:h-5 ${
          checked ? "border-delivered" : "border-primary"
        }`}
      >
        {checked && (
          <div className="w-2 h-2 rounded-full md:w-3 md:h-3 bg-delivered"></div>
        )}
      </div>
      {children}
    </div>
  );
};

export default Radio;
