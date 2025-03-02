import React from "react";

import { calculateTotalDiscount } from "@/utils/calculate";
import { formatCurrency } from "@/utils/format";

const Bill = ({ products, totalPrice, voucher, shippingFee }) => {
  // Tính tổng giá trị sản phẩm
  const subTotal = products.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-lg font-semibold">Chi tiết hóa đơn</h2>
      <div className="flex justify-between mb-2">
        <span>Tổng tiền sản phẩm:</span>
        <span className="text-secondary">{formatCurrency(subTotal)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Phí vận chuyển:</span>
        <span className="text-secondary">{formatCurrency(shippingFee)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Giảm giá:</span>
        <span className="text-secondary">
          {formatCurrency(
            calculateTotalDiscount(
              subTotal,
              voucher?.max_discount,
              voucher?.value,
              voucher?.unit,
              shippingFee
            )
          ) > 0
            ? `-${formatCurrency(
                calculateTotalDiscount(
                  subTotal,
                  voucher?.max_discount,
                  voucher?.value,
                  voucher?.unit,
                  shippingFee
                )
              )}`
            : formatCurrency(
                calculateTotalDiscount(
                  subTotal,
                  voucher?.max_discount,
                  voucher?.value,
                  voucher?.unit,
                  shippingFee
                )
              )}
        </span>
      </div>
      <hr className="my-2" />
      <div className="flex justify-between text-lg font-semibold">
        <span>Tổng thanh toán:</span>
        <span className="text-secondary">{formatCurrency(totalPrice)}</span>
      </div>
    </div>
  );
};

export default Bill;
