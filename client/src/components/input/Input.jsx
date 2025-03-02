import React from "react";
import { useController } from "react-hook-form";

const Input = ({
  control,
  name = "",
  errors = {},
  type = "text",
  className = "",
  classNameContainer = "",
  ...rest
}) => {
  const hasError = errors?.[name];
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <div className={classNameContainer}>
      <input
        id={name}
        type={type}
        name={name}
        className={`w-full p-2 border rounded-md shadow-lg outline-none ${
          hasError ? "border-red-500" : "border-gray-300"
        }`}
        {...field}
        {...rest}
      />
    </div>
  );
};

export default Input;
