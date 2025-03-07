import React, { useEffect } from "react";
import Layout from "../layout/Layout";
import LayoutInfo from "../layout/LayoutInfo";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "@/store/features/order/orderThunk";
import OrderDetailCard from "@/components/card/OrderDetailCard";
import OrderCard from "@/components/card/OrderCard";

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrdersByUserId());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <Layout>
      <LayoutInfo content="Đơn hàng của bạn">
        <div className="flex flex-col gap-y-5 max-h-[500px] overflow-y-auto scroll-smooth">
          {orders?.length > 0 ? (
            orders.map((item) => <OrderCard key={item._id} order={item} />)
          ) : (
            <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
              <p className="mb-4 text-lg text-gray-700">
                Hiện tại bạn không có đơn hàng nào.
              </p>
            </div>
          )}
        </div>
      </LayoutInfo>
    </Layout>
  );
};

export default Order;
