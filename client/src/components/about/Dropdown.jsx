import React, { useState } from "react";

const Dropdown = ({ text = "", children, className = "" }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`w-full`}>
      <div className="mb-3 cursor-pointer" onClick={() => setVisible(!visible)}>
        <span className="block w-full p-3 border rounded-lg">{text}</span>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out transform overflow-hidden ${
          visible ? "opacity-100 max-h-[500px] p-3" : "opacity-0 max-h-0 p-0"
        } flex flex-col w-full border rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
