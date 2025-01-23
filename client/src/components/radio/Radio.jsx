import React from "react";

const Radio = ({ children, checked = false, onClick = () => {} }) => {
  return (
    <div
      className={`flex items-center p-2 border border-primary rounded-lg cursor-pointer gap-x-3`}
      onClick={onClick}
    >
      <div className="inline-flex items-center justify-center w-5 h-5 border rounded-full border-primary">
        {checked && <div className="w-3 h-3 rounded-full bg-primary"></div>}
      </div>
      <div className="flex flex-col gap-y-3">{children}</div>
    </div>
  );
};

export default Radio;
