import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const GraphCategoryDistribution = ({ products }) => {
  const categoryData = {};

  products.forEach((p) => {
    categoryData[p.category] = (categoryData[p.category] || 0) + 1;
  });

  const formatted = Object.keys(categoryData).map((k) => ({
    name: k,
    value: categoryData[k],
  }));

  const colors = ["#A78BFA", "#60A5FA", "#34D399", "#FCD34D", "#F87171"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-white text-xl font-semibold mb-4">
        Category Distribution
      </h2>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={formatted}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={90}
            >
              {formatted.map((entry, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </motion.div>
  );
};

export default GraphCategoryDistribution;
