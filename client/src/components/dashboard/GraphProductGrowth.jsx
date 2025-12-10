import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const GraphProductGrowth = ({ products }) => {
  // Group products by day
  const dateCounts = {};

  products.forEach((p) => {
    const day = new Date(p.createdAt).toLocaleDateString();
    dateCounts[day] = (dateCounts[day] || 0) + 1;
  });

  const data = Object.keys(dateCounts).map((date) => ({
    date,
    count: dateCounts[date],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-white text-xl font-semibold mb-4">
        Product Growth Over Time
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#eee" />
            <YAxis stroke="#eee" />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#ffffff" strokeWidth={2}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraphProductGrowth;
