import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { motion } from "framer-motion";

const GraphTopSellers = ({ products }) => {
  const sorted = [...products]
    .sort((a, b) => b.totalSales - a.totalSales)
    .slice(0, 5);

  const data = sorted.map((p) => ({
    name: p.name,
    sales: p.totalSales,
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.length) {
      return (
        <div className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-lg px-4 py-2 rounded-xl">
          <p className="text-sm font-semibold text-black">
            {payload[0].payload.name}
          </p>
          <p className="text-xs text-black/70">Sales: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-white text-xl font-semibold mb-4">
        Top Selling Products
      </h2>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ left: 70, right: 20, top: 10, bottom: 10 }}
            barGap={15}
          >
            <XAxis type="number" stroke="#ddd" />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#ddd"
              width={120}
              tick={{ fill: "#fff", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />

            <Bar
              dataKey="sales"
              fill="url(#topSalesGradient)"
              radius={[6, 6, 6, 6]}
            >
              {/* Sales count at end of bar */}
              <LabelList
                dataKey="sales"
                position="right"
                fill="#fff"
                fontSize={12}
              />
            </Bar>

            {/* Gradient definition */}
            <defs>
              <linearGradient id="topSalesGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="1" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraphTopSellers;
