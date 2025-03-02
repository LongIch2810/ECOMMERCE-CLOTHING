import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Tháng 1", doanhThu: 4000, loiNhuan: 2400 },
  { name: "Tháng 2", doanhThu: 3000, loiNhuan: 1398 },
  { name: "Tháng 3", doanhThu: 2000, loiNhuan: 9800 },
  { name: "Tháng 4", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 5", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 6", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 7", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 8", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 9", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 10", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 11", doanhThu: 2780, loiNhuan: 3908 },
  { name: "Tháng 12", doanhThu: 2780, loiNhuan: 3908 },
];
const BarChartComponent = ({ data, COLOR, title }) => {
  return (
    <div className="text-center">
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            animationDuration={500}
            dataKey={Object.keys(data[0])[2]}
            fill={COLOR}
          />
        </BarChart>
      </ResponsiveContainer>
      <h2 className="mb-4 text-xl italic font-medium text-gray-400">{title}</h2>
    </div>
  );
};

export default BarChartComponent;
