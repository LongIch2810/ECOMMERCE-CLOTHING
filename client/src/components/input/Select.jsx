import React from "react";
import { useController } from "react-hook-form";

const Select = ({ name, control, className = "", errors = {}, children }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  const hasError = errors?.[name];
  return (
    <select
      className={`w-full p-2 border rounded-md shadow-lg outline-none ${
        hasError ? "border-red-500" : "border-gray-300"
      }`}
      {...field}
    >
      {children}
    </select>
  );
};

export default Select;
