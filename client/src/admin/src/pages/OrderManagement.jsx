import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import Title from "@/components/title/Title";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, getOrders } from "@/store/features/order/orderThunk";
import { setCurrentPage } from "@/store/features/order/orderSlice";
import IconSearch from "@/components/icons/IconSearch";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Button from "@/components/button/Button";
import { formatCurrency, formatDate } from "@/utils/format";
import { orderStatus } from "@/utils/constant";
import { bgColorStatusOrder } from "@/utils/constant";

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, total_orders, current_page } = useSelector(
    (state) => state.order
  );

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(getOrders({ page: current_page, status, order_id: search }));
  }, [current_page, status, search]);

  const handleSearch = (e) => {
    dispatch(setCurrentPage(1));
    setSearch(e.target.value);
  };

  const handleChangeStatus = ({ order_id, status }) => {
    const index = orderStatus.findIndex((item) => item.status === status);
    dispatch(changeStatus({ order_id, status: orderStatus[index + 1].status }));
  };

  const handleFilterStatus = (e) => {
    dispatch(setCurrentPage(1));
    setStatus(e.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-center my-8">
        <div className="relative w-full md:w-3/4">
          <input
            type="text"
            placeholder="Nhập mã đơn hàng ..."
            onChange={handleSearch}
            className="w-full p-2 pr-10 border-2 border-gray-300 rounded-md shadow-xs outline-none text-primary"
          />
          <span className="absolute inset-y-0 grid w-10 end-0 place-content-center">
            <IconSearch></IconSearch>
          </span>
        </div>
      </div>
      <Title text="Danh sách đơn hàng" className="text-2xl"></Title>
      <div className="mb-10">
        <select
          onClick={handleFilterStatus}
          className="p-3 border-2 border-gray-300 rounded-lg"
        >
          <option value="">Trạng thái đơn hàng</option>
          {orderStatus.map((item, index) => (
            <option key={index} value={item.status}>
              {item.status}
            </option>
          ))}
        </select>
      </div>
      {orders?.length > 0 ? (
        <Table
          ths={Object.keys(orders[0])}
          total_items={total_orders}
          currentPage={current_page}
          setCurrentPage={setCurrentPage}
        >
          {orders.map((item) => (
            <Tr key={item._id}>
              <Td>{item._id}</Td>
              <Td>{formatCurrency(item.total_price)}</Td>
              <Td>{item.status}</Td>
              <Td>{item.payment_method}</Td>
              <Td>{item.shipping.shipping_method}</Td>
              <Td>{formatDate(item.createdAt)}</Td>
              <Td>
                <div className="flex items-center justify-center gap-x-3">
                  <Button className="p-2 bg-foreign text-main">Detail</Button>
                  {orderStatus.filter(
                    (statusItem) => statusItem.status === item.status
                  )[0].adminButton && (
                    <Button
                      onClick={() =>
                        handleChangeStatus({
                          order_id: item._id,
                          status: item.status,
                        })
                      }
                      className={`p-2 text-main ${
                        bgColorStatusOrder[item.status]
                      }`}
                    >
                      {
                        orderStatus.filter(
                          (statusItem) => statusItem.status === item.status
                        )[0].adminButton
                      }
                    </Button>
                  )}
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
          <p className="mb-4 text-lg text-gray-700">Không có đơn hàng nào.</p>
        </div>
      )}
    </div>
  );
};

export { OrderList };
