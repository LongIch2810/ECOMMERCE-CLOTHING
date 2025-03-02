import React from "react";
import { useController } from "react-hook-form";

const Textarea = ({
  control,
  name = "",
  errors = {},
  className = "",
  ...rest
}) => {
  const hasError = errors?.[name];
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <textarea
      id={name}
      name={name}
      className={`w-full p-2 border rounded-md shadow-lg outline-none ${
        hasError ? "border-red-500" : "border-gray-300"
      }`}
      {...field}
      {...rest}
    />
  );
};

export default Textarea;
