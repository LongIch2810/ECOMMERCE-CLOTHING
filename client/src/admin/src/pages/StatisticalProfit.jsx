import Button from "@/components/button/Button";
import {
  statisticalProfitDate,
  statisticalProfitMonth,
  statisticalProfitYear,
  statisticalRevenueDateDetail,
  statisticalRevenueMonthDetail,
  statisticalRevenueYearDetail,
} from "@/store/features/statistical/statisticalThunk";
import { formatCurrency, formatDate } from "@/utils/format";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Td from "../components/Td";
import { toast } from "react-toastify";
import { setTotalRevenue } from "@/store/features/statistical/statisticalSlice";

const StatisticalProfit = () => {
  const { orders, totalRevenue, totalCost, totalProfit, loading } = useSelector(
    (state) => state.statistical
  );
  const dispatch = useDispatch();

  const [option, setOption] = useState("year");

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7));
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    dispatch(setTotalRevenue(0));
    dispatch(statisticalProfitYear({ year }));
  }, []);

  const handleFilterStatisticalProfit = () => {
    if (option === "year") {
      dispatch(statisticalProfitYear({ year }));
    } else if (option === "month") {
      const date = new Date(month);
      dispatch(
        statisticalProfitMonth({
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

      dispatch(statisticalProfitDate({ startDate, endDate }));
    }
  };

  return (
    <div>
      <div className="inline-flex flex-col justify-center mb-5 gap-y-3">
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
            onClick={handleFilterStatisticalProfit}
          >
            {loading ? "Đang xử lý ..." : "Lọc"}
          </Button>
        </div>
      </div>

      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">
          📊 Báo Cáo Lợi Nhuận
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {/* Tổng doanh thu */}
          <div className="p-4 bg-blue-100 rounded-lg shadow">
            <p className="text-lg text-gray-700">📈 Tổng Doanh Thu</p>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(totalRevenue)}
            </p>
          </div>

          {/* Tổng giá nhập */}
          <div className="p-4 bg-red-100 rounded-lg shadow">
            <p className="text-lg text-gray-700">💰 Tổng Giá Nhập</p>
            <p className="text-2xl font-bold text-red-500">
              {formatCurrency(totalCost)}
            </p>
          </div>

          {/* Lợi nhuận */}
          <div className="p-4 bg-green-100 rounded-lg shadow">
            <p className="text-lg text-gray-700">🚀 Lợi Nhuận</p>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalProfit)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticalProfit;
