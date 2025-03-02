import React from "react";
import { NavLink } from "react-router-dom";

const InfoItem = ({ icon, text, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${
          isActive ? "border-l-2 border-secondary text-secondary" : ""
        } flex items-center p-2 gap-x-3 hover:border-l-2 hover:border-secondary hover:text-secondary transition-all`
      }
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
};

export default InfoItem;
