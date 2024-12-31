import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ onClick = () => {} }) => {
  return (
    <Link to="/">
      <img
        src="/public/logo.png"
        className="md:w-[200px] w-[100px] cursor-pointer rounded-lg"
        onClick={onClick}
      ></img>
    </Link>
  );
};

export default Logo;
