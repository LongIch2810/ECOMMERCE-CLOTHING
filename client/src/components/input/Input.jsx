import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  control,
  name = "",
  type = "text",
  className = "",
  classNameContainer = "",
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className={classNameContainer}>
      <input
        type={type}
        id={name}
        name={name}
        className={`${className} text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-lg outline-primary`}
        {...rest}
        {...field}
      />
    </div>
  );
};

export default Input;
