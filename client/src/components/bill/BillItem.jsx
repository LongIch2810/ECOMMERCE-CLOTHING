import React from "react";

const BillItem = ({ title = "", price = 0 }) => {
  return (
    <div className="flex justify-between !text-base font-medium">
      <span className="text-lg font-medium">{title}</span>
      <span className="text-lg font-medium text-secondary">{price}</span>
    </div>
  );
};

export default BillItem;
