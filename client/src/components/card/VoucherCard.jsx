import React from "react";
import IconVoucher from "../icons/IconVoucher";
import Button from "../button/Button";
import Logo from "../logo/Logo";

const VoucherCard = ({ value, type, discount_max, min_order_price }) => {
  return (
    <div className="flex justify-between px-6 py-3 border-2 rounded-lg gap-x-5 border-primary">
      <div>
        <IconVoucher width={64} height={64}></IconVoucher>
        <img src="./logo.png" className="w-6 rounded-lg"></img>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-sm font-medium">
          Giảm giá{" "}
          <strong>
            {value}
            {type}
          </strong>
        </h1>
        <span className="text-sm">
          Giảm tối đa <strong>{discount_max}K</strong>
        </span>
        <span className="text-sm">
          Đơn tối thiểu <strong>{min_order_price}K</strong>
        </span>
        <Button className="p-1 bg-primary">Lưu</Button>
      </div>
    </div>
  );
};

export default VoucherCard;
