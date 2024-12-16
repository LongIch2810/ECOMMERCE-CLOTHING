import React from "react";
import { Link, NavLink } from "react-router-dom";

const HeaderItem = ({ children, to = "" }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-lg font-semibold cursor-pointer p-2 ${
          isActive ? "border-b-2 border-primary" : ""
        }`
      }
    >
      {children}
    </NavLink>
  );
};

export default HeaderItem;
