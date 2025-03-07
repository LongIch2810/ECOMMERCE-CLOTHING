import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOrderDetail } from "@/store/features/order/orderThunk";
import OrderDetailCard from "@/components/card/OrderDetailCard";
import Loading from "@/components/loading/Loading";
import Layout from "@/layout/Layout";

const OrderDetail = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { orderDetail, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (orderId) {
      dispatch(fetchOrderDetail(orderId));
    }
  }, [dispatch, orderId]);

  return (
    <>
      {!loading && orderDetail ? (
        <Layout>
          <section>
            <div className="container p-4 mx-auto">
              <h1 className="mb-4 text-2xl font-bold">Chi tiết đơn hàng</h1>
              {orderDetail && <OrderDetailCard order={orderDetail} />}
            </div>
          </section>
        </Layout>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default OrderDetail;
