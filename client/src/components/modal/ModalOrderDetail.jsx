import React, { useEffect } from "react";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "@/store/features/order/orderThunk";
import { formatCurrency } from "@/utils/format";
import Loading from "../loading/Loading";
import { textColorStatusOrder } from "@/utils/constant";

const ModalOrderDetail = ({ orderId, setIsOpen }) => {
  if (!orderId) return null;
  const dispatch = useDispatch();
  const { orderDetail, loading } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(fetchOrderDetail(orderId));
  }, [orderId]);

  console.log(orderDetail);

  return (
    <>
      {!loading && orderDetail ? (
        <Modal setIsOpen={setIsOpen}>
          <h2 className="mb-3 text-lg font-bold text-center">
            Chi tiết đơn hàng
          </h2>

          {/* Trạng thái đơn hàng */}
          <p className="text-sm font-semibold">
            Trạng thái:{" "}
            <span className={`${textColorStatusOrder[orderDetail.status]}`}>
              {orderDetail.status}
            </span>
          </p>

          {/* Danh sách sản phẩm */}
          <div className="mt-4 space-y-2">
            {orderDetail?.products.map((item, index) => (
              <div key={index} className="p-2 border rounded-lg">
                <p className="font-medium">Sản phẩm: {item.product.name}</p>
                <p>Màu sắc: {item.color.name}</p>
                <p>Kích thước: {item.size}</p>
                <p>Số lượng: {item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Tổng tiền, thanh toán */}
          <p>Phương thức thanh toán: {orderDetail.payment_method}</p>
          <p>Trạng thái thanh toán: {orderDetail.payment_status}</p>

          {/* Địa chỉ giao hàng */}
          <p className="mt-4 font-semibold">Địa chỉ giao hàng:</p>
          <p>{orderDetail.address.addressDetail}</p>

          {/* Phí vận chuyển */}
          <p className="mt-2 font-semibold text-secondary">
            Phí vận chuyển:{" "}
            {formatCurrency(orderDetail.shipping.shipping_price)}
          </p>
          <p className="mt-4 font-semibold text-secondary">
            Tổng tiền: {formatCurrency(orderDetail.total_price)}
          </p>
        </Modal>
      ) : (
        <div className="flex items-center justify-center">
          <Loading></Loading>
        </div>
      )}
    </>
  );
};

export default ModalOrderDetail;
