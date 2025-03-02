import React from "react";

const Th = ({ children }) => {
  return (
    <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
      {children}
    </th>
  );
};

export default Th;
