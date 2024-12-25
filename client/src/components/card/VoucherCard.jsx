import React from "react";
import IconVoucher from "../icons/IconVoucher";
import Button from "../button/Button";
import Logo from "../logo/Logo";

const VoucherCard = ({ value, type, discount_max, min_order_price }) => {
  return (
    // <div className="flex justify-between px-6 py-3 border-2 rounded-lg gap-x-5 border-primary">
    //   <div>
    //     <IconVoucher width={64} height={64}></IconVoucher>
    //     <img src="./logo.png" className="w-6 rounded-lg"></img>
    //   </div>
    //   <div className="flex flex-col gap-y-2">
    //     <h1 className="text-sm font-medium">
    //       Giảm giá
    //       <strong>
    //         {value}
    //         {type}
    //       </strong>
    //     </h1>
    //     <span className="text-sm">
    //       Giảm tối đa <strong>{discount_max}K</strong>
    //     </span>
    //     <span className="text-sm">
    //       Đơn tối thiểu <strong>{min_order_price}K</strong>
    //     </span>
    //     <Button className="p-1 bg-primary text-main">Lưu</Button>
    //   </div>
    // </div>

    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <div>
          <IconVoucher></IconVoucher>
        </div>
        <div>
          <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            {`Giảm giá ${value}${type}`}
          </h5>
        </div>
        <div className="flex flex-col mb-3 font-normal text-gray-500 dark:text-gray-400">
          <span className="text-sm">
            Giảm tối đa{" "}
            <strong className="text-secondary">{discount_max}K</strong>
          </span>
          <span className="text-sm">
            Đơn tối thiểu{" "}
            <strong className="text-secondary">{min_order_price}K</strong>
          </span>
        </div>
        <Button className="font-medium bg-primary text-main px-5 py-1.5">
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default VoucherCard;
