import { getOrders } from "@/store/features/order/orderThunk";
import { getFilterProducts } from "@/store/features/product/productThunk";
import { getUsers } from "@/store/features/user/userThunk";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Stat = () => {
  const dispatch = useDispatch();
  const { total_users } = useSelector((state) => state.user);
  const { total_products } = useSelector((state) => state.product);
  const { total_orders } = useSelector((state) => state.order);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getFilterProducts());
    dispatch(getOrders());
  }, [dispatch]);
  return (
    <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <dl className="grid grid-cols-1 gap-4 mt-6 sm:mt-8 sm:grid-cols-1 lg:grid-cols-3">
        <div className="flex flex-col px-4 py-8 text-center border border-gray-400 border-dashed rounded-lg">
          <dt className="order-last text-lg font-medium text-gray-500">
            Người dùng
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {total_users}
          </dd>
        </div>

        <div className="flex flex-col px-4 py-8 text-center border border-gray-400 border-dashed rounded-lg">
          <dt className="order-last text-lg font-medium text-gray-500">
            Sản phẩm
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {total_products}
          </dd>
        </div>

        <div className="flex flex-col px-4 py-8 text-center border border-gray-400 border-dashed rounded-lg">
          <dt className="order-last text-lg font-medium text-gray-500">
            Đơn hàng
          </dt>

          <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
            {total_orders}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default Stat;
