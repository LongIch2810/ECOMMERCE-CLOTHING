import React from "react";
import Label from "../label/Label";

const Radio = ({
  name = "",
  text1 = "",
  text2 = "",
  text3 = "",
  value = "",
  checked = false,
  onChange,
}) => {
  return (
    <Label
      htmlFor={value}
      className={`flex items-start p-2 border rounded-lg cursor-pointer gap-x-3 ${
        checked ? "border-primary" : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name={name}
        id={value}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div className="inline-flex items-center justify-center w-5 h-5 border rounded-full border-primary">
        {checked && <div className="w-3 h-3 rounded-full bg-primary"></div>}
      </div>
      <div className="flex flex-col font-medium text-gray-500 gap-y-3">
        <span>{text1}</span>
        <span>{text2}</span>
        <span>{text3}</span>
      </div>
    </Label>
  );
};

export default Radio;
