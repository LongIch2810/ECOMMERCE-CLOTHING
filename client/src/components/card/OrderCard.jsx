import { formatCurrency, formatDate } from "@/utils/format";
import React from "react";
import Button from "../button/Button";
import { bgColorStatusOrder, textColorStatusOrder } from "@/utils/constant";
import { useDispatch } from "react-redux";
import {
  cancelOrder,
  changeStatusSuccessfully,
} from "@/store/features/order/orderThunk";

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();

  const handleReceived = (order_id) => {
    dispatch(
      changeStatusSuccessfully({ order_id, status: "Giao hàng thành công" })
    );
  };

  const handleCancel = (order_id) => {
    dispatch(cancelOrder({ order_id }));
  };

  console.log(order);

  return (
    <>
      {order && (
        <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-xl">
          <div className="flex flex-col justify-between mb-3 lg:flex-row lg:items-center">
            <h2 className="text-lg font-semibold">Order #{order._id}</h2>
            <div className={`flex items-center gap-x-1`}>
              <span
                className={`p-1 rounded-full ${
                  bgColorStatusOrder[order.status]
                }`}
              ></span>
              <span className={`${textColorStatusOrder[order.status]}`}>
                {order.status}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Ngày đặt hàng: {formatDate(order.createdAt)}
          </p>
          <p className="text-sm text-gray-500">
            Địa chỉ: {order.address?.addressDetail}
          </p>
          {order.voucher && (
            <p className="text-sm text-gray-500">
              Mã giảm giá: {order.voucher.code}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Phí giao hàng: {formatCurrency(order.shipping.shipping_price)}
          </p>
          <div className="mt-3 space-y-3">
            {order?.products.map((item) => (
              <div key={item.product._id} className="flex items-center gap-4">
                <img
                  src={item.product.images[0]}
                  className="object-cover w-16 h-16 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Size: {item.size}</p>
                  <p className="text-xs text-gray-500">
                    Màu: {item.color?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    Số lượng: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-secondary">
                  {formatCurrency(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 mt-4 mb-10 border-t">
            <p className="text-base font-semibold">Tổng cộng:</p>
            <p className="text-lg font-bold text-secondary">
              {formatCurrency(order.total_price)}
            </p>
          </div>
          <div className="flex items-center gap-x-3">
            <Button
              onClick={() => handleReceived(order._id)}
              className={`p-2 text-main ${
                order.status !== "Đang giao hàng"
                  ? "bg-gray-300 cursor-not-allowed"
                  : `${bgColorStatusOrder["Giao hàng thành công"]}`
              }`}
              disabled={order.status !== "Đang giao hàng"}
            >
              Đã nhận hàng
            </Button>
            <Button
              onClick={() => handleCancel(order._id)}
              className={`p-2 text-main ${
                order.status === "Chờ xác nhận"
                  ? `${bgColorStatusOrder["Hủy bỏ"]}`
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={order.status !== "Chờ xác nhận"}
            >
              Hủy
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
