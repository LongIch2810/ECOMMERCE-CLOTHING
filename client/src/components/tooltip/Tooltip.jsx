import React, { Fragment } from "react";

const Tooltip = ({ children, className = "", onClick = () => {} }) => {
  return (
    <div onClick={onClick} className="hidden lg:block">
      <div className="absolute hidden p-3 rotate-45 bg-primary left-3/4 -translate-x-3/4 top-full group-hover:block"></div>
      <div
        className={`absolute hidden ${className}  p-2 rounded shadow-2xl bg-primary top-full left-3/4 -translate-x-3/4 group-hover:block`}
      >
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
