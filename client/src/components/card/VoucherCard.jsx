import React from "react";
import IconVoucher from "../icons/IconVoucher";
import Button from "../button/Button";
import Logo from "../logo/Logo";

const VoucherCard = ({ value, type, discount_max, min_order_price }) => {
  return (
    <div className="inline-flex justify-between px-6 py-3 border-2 rounded-lg gap-x-5 border-primary">
      <div>
        <IconVoucher width={64} height={64}></IconVoucher>
        <img
          src="./logo.png"
          className="md:w-[100px] w-[70px] rounded-lg"
        ></img>
      </div>
      <div className="flex flex-col gap-y-1">
        <h1 className="font-medium">
          Giảm giá {value}
          {type}
        </h1>
        <span>Giảm tối đa {discount_max}K</span>
        <span>Đơn tối thiểu {min_order_price}K</span>
        <Button className="p-1 bg-primary">Lưu</Button>
      </div>
    </div>
  );
};

export default VoucherCard;
