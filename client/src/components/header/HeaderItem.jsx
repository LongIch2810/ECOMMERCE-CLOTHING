import React from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";

const HeaderItem = ({
  children,
  to = "",
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) => {
  const [searchParams] = useSearchParams();
  const currentTypeProduct = searchParams.get("typeProduct");

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`text-lg cursor-pointer p-2 hover:text-orange-500`}
    >
      {children}
    </NavLink>
  );
};

export default HeaderItem;
