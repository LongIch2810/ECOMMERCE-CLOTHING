import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ content = "" }) => {
  return (
    <span className="p-3 text-xl font-semibold uppercase transition duration-500 ease-in-out border-b-2 cursor-pointer border-b-white hover:border-b-black">
      {content}
    </span>
  );
};

export default CategoryItem;
