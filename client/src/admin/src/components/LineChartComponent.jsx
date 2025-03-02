import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data, COLOR, title }) => {
  return (
    <div className="text-center">
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            animationDuration={500}
            type="monotone"
            dataKey={Object.keys(data[0])[2]}
            stroke={COLOR}
          />
        </LineChart>
      </ResponsiveContainer>
      <h2 className="mb-4 text-xl italic font-medium text-gray-400">{title}</h2>
    </div>
  );
};

export default LineChartComponent;
