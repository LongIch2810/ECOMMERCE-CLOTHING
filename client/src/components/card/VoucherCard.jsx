import React from "react";
import Button from "../button/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import IconVoucher from "../icons/IconVoucher";
import { useDispatch } from "react-redux";
import { saveVoucher } from "@/store/features/user/userThunk";
import { isExpire } from "@/utils/check";

const VoucherCard = ({ item, isSave = false }) => {
  const dispatch = useDispatch();
  const handleSaveVoucher = ({ voucher_id }) => {
    dispatch(saveVoucher({ voucher_id }));
  };
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
               text-primary
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
          <p className="text-sm text-gray-600">
            Số lượng: <span className="text-primary">{item.number_of_use}</span>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Hạn sử dụng:{" "}
            <span className="text-foreign">{formatDate(item.end_date)}</span>
          </p>
        </div>
      </div>
      <Button
        className={`px-4 py-2 text-sm font-medium rounded-md ${
          isExpire(item.end_date) || isSave
            ? "bg-gray-400 cursor-not-allowed text-primary"
            : "bg-primary text-main"
        }`}
        onClick={() => handleSaveVoucher({ voucher_id: item._id })}
        disabled={isSave || isExpire(item.end_date)}
      >
        {isExpire(item.end_date) ? "Hết hạn" : isSave ? "Đã lưu" : "Lưu"}
      </Button>
    </div>
  );
};

export default VoucherCard;
