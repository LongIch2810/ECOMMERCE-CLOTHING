import Title from "@/components/title/Title";
import BarChartComponent from "./BarChartComponent";
import LineChartComponent from "./LineChartComponent";
import PieChartComponent from "./PieChartComponent";
import Stat from "./Stat";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  statisticalRevenueMonth,
  statisticalRevenueYear,
  statisticalStatusOrderDate,
  statisticalStatusOrderMonth,
  statisticalStatusOrderYear,
} from "@/store/features/statistical/statisticalThunk";
import { COLORS, COLOR_REVENUE } from "@/utils/constant";
import Button from "@/components/button/Button";
import {
  setEndDate,
  setMonthRevenue,
  setMonthStatusOrder,
  setStartDate,
  setYearRevenue,
  setYearStatusOrder,
} from "@/store/features/statistical/statisticalSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    dataStatisticalStatusOrder,
    dataStatisticalRevenueYear,
    dataStatisticalRevenueMonth,
    yearStatusOrder,
    yearRevenue,
    monthRevenue,
    monthStatusOrder,
    endDate,
    startDate,
  } = useSelector((state) => state.statistical);

  const [optionStatusOrder, setOptionStatusOrder] = useState("year");

  useEffect(() => {
    dispatch(statisticalStatusOrderYear({ year: yearStatusOrder }));
    dispatch(statisticalRevenueYear({ year: yearRevenue }));
    dispatch(
      statisticalRevenueMonth({
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
      })
    );
  }, []);

  const handleFilterStatisticalStatusOrder = () => {
    if (optionStatusOrder === "year") {
      dispatch(statisticalStatusOrderYear({ year: yearStatusOrder }));
    } else if (optionStatusOrder === "month") {
      const date = new Date(monthStatusOrder);
      dispatch(
        statisticalStatusOrderMonth({
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        })
      );
    } else if (optionStatusOrder === "date") {
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

      dispatch(statisticalStatusOrderDate({ startDate, endDate }));
    }
  };

  const handleChangeYearRevenue = () => {
    dispatch(statisticalRevenueYear({ year: yearRevenue }));
  };

  const handleChangeMonthRevenue = () => {
    console.log(">>> monthRevenue: ", monthRevenue);
    const date = new Date(monthRevenue);
    console.log(">>> date: ", date);
    dispatch(
      statisticalRevenueMonth({
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      })
    );
  };

  return (
    <div className="p-6">
      <Title text="Thống kê" className="text-2xl"></Title>
      <Stat></Stat>
      <div className="mb-10">
        <div className="inline-flex flex-col justify-center mb-3 gap-y-3">
          <div className="flex items-center gap-x-3">
            <span>Loại thống kê:</span>
            <select
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              onChange={(e) => setOptionStatusOrder(e.target.value)}
            >
              <option value="year">Năm</option>
              <option value="month">Tháng</option>
              <option value="date">Ngày</option>
            </select>
          </div>
          <div className="flex flex-col gap-y-3">
            {optionStatusOrder === "year" && (
              <input
                type="number"
                min="1990"
                max={new Date().getFullYear()}
                onChange={(e) =>
                  dispatch(setYearStatusOrder(Number(e.target.value)))
                }
                value={yearStatusOrder}
                className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
            )}
            {optionStatusOrder === "month" && (
              <input
                type="month"
                value={monthStatusOrder}
                onChange={(e) => dispatch(setMonthStatusOrder(e.target.value))}
                className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
              />
            )}
            {optionStatusOrder === "date" && (
              <div className="flex gap-4">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => dispatch(setStartDate(e.target.value))}
                  className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
                <span className="self-center">đến</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => dispatch(setEndDate(e.target.value))}
                  className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
                />
              </div>
            )}
            <Button
              className="p-2 bg-foreign text-main"
              onClick={handleFilterStatisticalStatusOrder}
            >
              Lọc
            </Button>
          </div>
        </div>

        {dataStatisticalStatusOrder?.length > 0 ? (
          <PieChartComponent
            data={dataStatisticalStatusOrder}
            COLORS={COLORS}
            title={"Biểu đồ thống kê trạng thái đơn hàng"}
          ></PieChartComponent>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-700">Không có dữ liệu.</p>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="inline-flex flex-col justify-center mb-3 gap-y-3">
          <div className="flex items-center gap-x-3">
            <span>Chọn năm:</span>
            <input
              type="number"
              min="1990"
              max={new Date().getFullYear()}
              value={yearRevenue}
              onChange={(e) => dispatch(setYearRevenue(e.target.value))}
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Button
              className="p-2 bg-foreign text-main"
              onClick={handleChangeYearRevenue}
            >
              Lọc
            </Button>
          </div>
        </div>

        {dataStatisticalRevenueYear?.length > 0 ? (
          <LineChartComponent
            data={dataStatisticalRevenueYear}
            COLOR={COLOR_REVENUE}
            title="Biểu đồ thống kê doanh thu từng tháng trong năm"
          ></LineChartComponent>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-700">Không có dữ liệu.</p>
          </div>
        )}
      </div>

      <div className="mb-10">
        <div className="inline-flex flex-col justify-center mb-3 gap-y-3">
          <div className="flex items-center gap-x-3">
            <span>Chọn tháng:</span>
            <input
              type="month"
              value={monthRevenue}
              onChange={(e) => dispatch(setMonthRevenue(e.target.value))}
              className="p-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <Button
              className="p-2 bg-foreign text-main"
              onClick={handleChangeMonthRevenue}
            >
              Lọc
            </Button>
          </div>
        </div>

        {dataStatisticalRevenueMonth?.length > 0 ? (
          <BarChartComponent
            data={dataStatisticalRevenueMonth}
            COLOR={COLOR_REVENUE}
            title="Biểu đồ thống kê doanh thu từng ngày trong tháng"
          ></BarChartComponent>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 p-6 bg-gray-100 rounded-lg shadow-md">
            <p className="mb-4 text-lg text-gray-700">Không có dữ liệu.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
