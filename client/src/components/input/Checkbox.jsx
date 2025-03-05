import React from "react";

const Checkbox = ({
  arr,
  value,
  content,
  setArr = () => {},
  checked = false,
}) => {
  const handleChangeCheckbox = (e) => {
    if (e.target.checked && !arr.includes(e.target.value)) {
      setArr((prev) => [...prev, e.target.value]);
    } else {
      setArr((prev) => prev.filter((i) => i !== e.target.value));
    }
    console.log(e.target.value);
  };
  return (
    <label htmlFor="Option3" className="flex items-start gap-4 cursor-pointer">
      <div className="flex items-center">
        ​
        <input
          type="checkbox"
          className="border-gray-300 rounded-sm size-4"
          value={value}
          checked={checked}
          onChange={handleChangeCheckbox}
        />
      </div>
      <div>{content}</div>
    </label>
  );
};

export default Checkbox;
