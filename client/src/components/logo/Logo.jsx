import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ onClick = () => {} }) => {
  return (
    <Link to="/">
      <img
        src="https://res.cloudinary.com/dbfat0hl6/image/upload/v1735714133/logo/ipbtk8kjhzkeeqianoin.avif"
        className="md:w-[70px] w-[50px] cursor-pointer rounded-lg"
        onClick={onClick}
      ></img>
    </Link>
  );
};

export default Logo;
