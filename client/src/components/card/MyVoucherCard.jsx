import { isExpire } from "@/utils/check";
import { formatCurrency, formatDate } from "@/utils/format";
import React from "react";
import IconVoucher from "../icons/IconVoucher";
import Button from "../button/Button";

const MyVoucherCard = ({
  item,
  isUse = false,
  onClickUseVoucher = () => {},
}) => {
  return (
    <div
      className={`flex items-center justify-between p-2  rounded-lg shadow-md ${
        isExpire(item?.end_date) ? "bg-gray-300 opacity-60" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-x-3">
        <div className="p-2 rounded-full bg-secondary">
          <IconVoucher className="size-6 text-main"></IconVoucher>
        </div>
        <div className="flex flex-col">
          <h3
            className={`text-lg font-semibold 
              "text-secondary" 
            `}
          >
            {item.title}
          </h3>
          <p className="text-sm text-gray-600">
            Code: <span className="text-secondary">{item.code}</span>
          </p>
          <p className="text-sm text-gray-600">
            Giảm tối đa:{" "}
            <span className="text-primary">
              {formatCurrency(item.max_discount)}
            </span>
          </p>
          <p className="text-sm text-gray-600">
            Đơn hàng tối thiểu:{" "}
            <span className="text-primary">
              {formatCurrency(item.min_order_price)}
            </span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Hạn sử dụng:{" "}
            <span className="text-foreign">{formatDate(item.end_date)}</span>
          </p>
        </div>
      </div>
      <Button
        onClick={onClickUseVoucher}
        className={`md:px-4 px-2 md:py-2 py-1 text-xs md:text-sm font-medium rounded-md ${
          isExpire(item.end_date) || isUse
            ? "bg-gray-400 cursor-not-allowed text-primary"
            : "bg-primary text-main"
        }`}
        disabled={isUse || isExpire(item.end_date)}
      >
        {isExpire(item.end_date) ? "Hết hạn" : "Sử dụng"}
      </Button>
    </div>
  );
};

export default MyVoucherCard;
