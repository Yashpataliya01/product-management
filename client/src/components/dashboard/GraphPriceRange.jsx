import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const GraphPriceRange = ({ products }) => {
  const ranges = {
    "0–500": 0,
    "500–1000": 0,
    "1000–2000": 0,
    "2000+": 0,
  };

  products.forEach((p) => {
    if (p.price < 500) ranges["0–500"]++;
    else if (p.price < 1000) ranges["500–1000"]++;
    else if (p.price < 2000) ranges["1000–2000"]++;
    else ranges["2000+"]++;
  });

  const data = Object.keys(ranges).map((key) => ({
    range: key,
    count: ranges[key],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-white text-xl font-semibold mb-4">
        Price Range Distribution
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <XAxis dataKey="range" stroke="#eee" />
            <YAxis stroke="#eee" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="count"
              fill="rgba(255,255,255,0.3)"
              stroke="#fff"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraphPriceRange;
