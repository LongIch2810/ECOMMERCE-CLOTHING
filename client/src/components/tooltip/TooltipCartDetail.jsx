import React from "react";
import Tooltip from "./Tooltip";
import { formatCurrency } from "@/utils/format";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";

const TooltipCartDetail = ({ products }) => {
  const navigate = useNavigate();
  return (
    <Tooltip className="w-[300px]" onClick={(e) => e.stopPropagation()}>
      {products?.length >= 0 && (
        <>
          <ul>
            {products.slice(0, 3).map((item) => (
              <li
                key={item.product?._id}
                className="flex items-center justify-between p-2 text-sm font-bold border-b border-main"
                onClick={() => navigate(`/product-detail/${item.product?._id}`)}
              >
                <img
                  src={item.product?.images[0]}
                  className="w-[35px] rounded object-cover"
                />
                <span className="overflow-hidden text-xs truncate whitespace-nowrap text-gray-500 hover:text-[#1ac5ae]">
                  {item.product?.name}
                </span>
                <span className="text-xs text-secondary">
                  {formatCurrency(item.product?.price)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-main">
              {`${
                products.length > 0 ? products.length : 0
              } sản phẩm trong giỏ`}
            </span>
            <Button
              className="p-2 text-xs text-main bg-secondary"
              onClick={() => navigate("/cart")}
            >
              Xem giỏ hàng của bạn
            </Button>
          </div>
        </>
      )}
    </Tooltip>
  );
};

export default TooltipCartDetail;
