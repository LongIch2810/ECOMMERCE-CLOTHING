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
      <h2 className="mb-4 text-xl italic font-medium">{title}</h2>
    </div>
  );
};

export default BarChartComponent;
