import React from "react";

const Banner = ({ className = "" }) => {
  return (
    <img src="./banner.webp" alt="" className={`${className} rounded-md`} />
  );
};

export default Banner;
