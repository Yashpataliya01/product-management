import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const GraphReviewDistribution = ({ products }) => {
  const ratingCounts = { 1:0, 2:0, 3:0, 4:0, 5:0 };

  products.forEach((p) => {
    ratingCounts[p.review] = (ratingCounts[p.review] || 0) + 1;
  });

  const data = Object.keys(ratingCounts).map((r) => ({
    rating: `${r} ★`,
    count: ratingCounts[r],
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg"
    >
      <h2 className="text-white text-xl font-semibold mb-4">Review Breakdown</h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={data}>
            <XAxis dataKey="rating" stroke="#eee" />
            <YAxis stroke="#eee" />
            <Tooltip />
            <Bar dataKey="count" fill="gold" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default GraphReviewDistribution;
