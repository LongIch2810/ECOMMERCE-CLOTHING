import React from "react";

const Banner = ({ className = "", src = "" }) => {
  return (
    <img src={src} alt="" className={`${className} object-cover rounded-md`} />
  );
};

export default Banner;
