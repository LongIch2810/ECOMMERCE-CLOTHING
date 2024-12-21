import React, { useState } from "react";
import IconCart from "../icons/IconCart";
import Button from "../button/Button";

const ProductCard = ({ item }) => {
  const [hover, setHover] = useState(false);
  return (
    <div className="inline-block w-full overflow-hidden rounded-lg shadow-xl cursor-pointer group">
      <div
        className="relative w-full h-64 sm:h-72"
        onMouseLeave={() => setHover(false)}
        onMouseOver={() => setHover(true)}
      >
        <img
          src={item.images[0]}
          alt=""
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ease-out ${
            hover ? "opacity-0" : "opacity-100"
          }`}
        />
        <img
          src={item.images[1]}
          alt=""
          className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-1000 ease-out ${
            hover ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative p-6 bg-white border border-gray-100">
        <p className="font-semibold text-secondary">{item.price}</p>

        <h3 className="mt-1.5 text-lg font-medium text-gray-900">
          {item.name}
        </h3>

        <div className="mt-4">
          <Button className="flex items-center justify-center w-full p-2 rounded bg-primary">
            <span>Add to cart</span>
            <IconCart></IconCart>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
