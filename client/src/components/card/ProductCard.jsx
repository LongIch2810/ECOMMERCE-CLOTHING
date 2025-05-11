import React, { useState } from "react";
import Button from "../button/Button";
import { formatCurrency } from "@/utils/format";
import IconCart from "../icons/IconCart";
import ModalProductDetail from "../modal/ModalProductDetail";
import StarRating from "../star/StarRating";

const ProductCard = ({
  item,
  onClick = () => {},
  className = "",
  isDisplayButton = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        onClick={onClick}
        className={`w-full h-full flex cursor-pointer flex-col max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}
      >
        <div className="relative overflow-hidden rounded-t-lg group">
          <img
            className="object-cover w-full h-full transition-transform duration-500 ease-out group-hover:scale-105 group-hover:opacity-80"
            src={item.images[0]}
            alt="product image"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 p-5 gap-y-5">
          <div className="flex flex-col gap-y-3">
            <span className="text-sm text-gray-400">
              {item.type_product.name}
            </span>
            <span className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </span>
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
              <div className="flex items-center">
                <StarRating rating={item.averageReview}></StarRating>
                <span className="ml-3 text-gray-600">{item.averageReview}</span>
              </div>
            </div>
            <span className="text-lg font-bold text-secondary dark:text-white">
              {formatCurrency(item.price)}
            </span>
          </div>
          {isDisplayButton && (
            <Button
              className="flex items-center justify-center w-full px-3 py-2 bg-gray-900 text-main"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(true);
              }}
            >
              <span>Thêm giỏ hàng</span>
              <span>
                <IconCart></IconCart>
              </span>
            </Button>
          )}
        </div>
      </div>
      {isOpen && (
        <ModalProductDetail
          setIsOpen={setIsOpen}
          id={item._id}
        ></ModalProductDetail>
      )}
    </>
  );
};

export default ProductCard;
