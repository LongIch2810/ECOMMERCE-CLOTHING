import React from "react";

const Input = ({
  name = "",
  type = "text",
  className = "",
  classNameContainer = "",
  ...rest
}) => {
  return (
    <div className={classNameContainer}>
      <input
        type={type}
        id={name}
        name={name}
        className={`${className} text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm outline-primary`}
        {...rest}
      />
    </div>
  );
};

export default Input;
