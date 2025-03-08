import { bgColorStatusOrder, textColorStatusOrder } from "@/utils/constant";
import { formatCurrency, formatDate } from "@/utils/format";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";

const OrderCard = ({ order }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/order/${order._id}`);
  };

  return (
    <div className="p-4 transition-all border rounded-lg shadow-md cursor-pointer hover:shadow-lg">
      <h3 className="text-lg font-semibold">Order #{order._id}</h3>
      <p className="text-gray-600">
        Ngày đặt hàng: {formatDate(order.createdAt)}
      </p>
      <p className="text-gray-600">Tổng sản phẩm: {order?.products?.length}</p>
      <p className="text-secondary">
        Tổng tiền: {formatCurrency(order.total_price)}
      </p>
      <div className={`flex items-center gap-x-1`}>
        <span
          className={`p-1 rounded-full ${bgColorStatusOrder[order.status]}`}
        ></span>
        <span className={`${textColorStatusOrder[order.status]}`}>
          {order.status}
        </span>
      </div>
      <div className="mt-3">
        <Button
          onClick={handleClick}
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default OrderCard;
