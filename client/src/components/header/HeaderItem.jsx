import React from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderItem = ({ children, to = "", onClick = () => {} }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `text-lg font-semibold cursor-pointer p-2 hover:text-orange-500 ${
          isActive
            ? "border-b-2 border-primary"
            : " border-b-2 border-gray-300 md:border-b-0"
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default HeaderItem;
