import React from "react";

const Td = ({ className = "", children }) => {
  return (
    <td
      className={`px-4 py-2 text-center text-gray-900 whitespace-nowrap ${className}`}
    >
      {children}
    </td>
  );
};

export default Td;
