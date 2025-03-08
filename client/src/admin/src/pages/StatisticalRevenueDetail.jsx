import Button from "@/components/button/Button";
import {
  statisticalRevenueDateDetail,
  statisticalRevenueMonthDetail,
  statisticalRevenueYearDetail,
} from "@/store/features/statistical/statisticalThunk";
import { formatCurrency, formatDate } from "@/utils/format";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Td from "../components/Td";
import { toast } from "react-toastify";

const StatisticalRevenueDetail = () => {
  const { orders, totalRevenue, loading } = useSelector(
    (state) => state.statistical
  );
  const dispatch = useDispatch();

  const [option, setOption] = useState("year");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  const handleFilterStatisticalStatusOrder = () => {
    if (option === "year") {
      dispatch(statisticalRevenueYearDetail({ year }));
    } else if (option === "month") {
      const date = new Date(month);
      dispatch(
        statisticalRevenueMonthDetail({
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        })
      );
    } else if (option === "date") {
      if (!startDate) {
        toast.error("Vui lòng chọn ngày bắt đầu !");
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      if (start > end) {
        toast.error("Ngày bắt đầu phải bé hơn ngày kết thúc !");
        return;
      }

      dispatch(statisticalRevenueDateDetail({ startDate, endDate }));
    }
  };

  return (
    <div>
      <div className="inline-flex flex-col justify-center mb-3 gap-y-3">
        <div className="flex items-center gap-x-3">
          <span>Loại thống kê:</span>
          <select
            className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="year">Năm</option>
            <option value="month">Tháng</option>
            <option value="date">Ngày</option>
          </select>
        </div>
        <div className="flex flex-col gap-y-3">
          {option === "year" && (
            <input
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              onChange={(e) => setYear(Number(e.target.value))}
              value={year}
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          )}
          {option === "month" && (
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          )}
          {option === "date" && (
            <div className="flex gap-4">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
              <span className="self-center">đến</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
            </div>
          )}
          <Button
            className={`p-2 ${
              loading
                ? "bg-gray-400 opacity-60 cursor-not-allowed text-black"
                : "bg-foreign text-main"
            }`}
            onClick={handleFilterStatisticalStatusOrder}
          >
            {loading ? "Đang xử lý ..." : "Lọc"}
          </Button>
        </div>
      </div>

      <div className="mb-20">
        {orders?.length > 0 ? (
          <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-4 py-2">STT</th>
                {Object.keys(orders[0]).map((item, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item}
                  </th>
                ))}

                <th className="px-4 py-2"></th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {orders.map((item, index) => (
                <tr key={item._id}>
                  <Td>{index + 1}</Td>
                  <Td>{item._id}</Td>
                  <Td className="text-secondary">
                    {formatCurrency(item.total_price)}
                  </Td>
                  <Td>{formatDate(item.createdAt)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-700">Không có kết quả nào.</p>
          </div>
        )}
        <div className="p-5 mt-4 text-lg font-bold text-right border-t-2 border-gray-300">
          Tổng doanh thu:{" "}
          <span className="text-secondary">{formatCurrency(totalRevenue)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticalRevenueDetail;
