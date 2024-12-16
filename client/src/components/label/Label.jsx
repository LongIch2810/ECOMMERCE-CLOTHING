import React from "react";

const Label = ({ htmlFor = "", className = "", children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${className} block text-sm font-medium text-gray-700`}
    >
      {children}
    </label>
  );
};

export default Label;
