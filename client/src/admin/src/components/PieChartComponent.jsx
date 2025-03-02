import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const PieChartComponent = ({ data, COLORS, title }) => {
  return (
    <div className="text-center">
      <ResponsiveContainer width="100%" height={500}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            animationDuration={500}
            label={({ percent }) =>
              percent > 0 ? `${(percent * 100).toFixed(0)}%` : ""
            }
            outerRadius={200}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2 className="mb-4 text-xl italic font-medium text-gray-400">{title}</h2>
    </div>
  );
};

export default PieChartComponent;
