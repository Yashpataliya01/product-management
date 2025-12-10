import React from "react";
import { motion } from "framer-motion";
import { FiCpu } from "react-icons/fi";

const cardStyle =
  "backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6 flex flex-col";

const OverviewCards = ({ products, aiInsights }) => {
  const totalCategories = new Set(products?.map((p) => p.category)).size;

  // Meaningful AI Overview Text
  let aiPreview = "AI not available";
  if (aiInsights) {
    aiPreview = `Top: ${aiInsights.topProduct}  Improve: ${aiInsights.improvement}`;
  }

  const cards = [
    { label: "Total Products", value: products.length },
    { label: "Categories", value: totalCategories },
    { label: "Recently Added", value: products.slice(-5).length },
    {
      label: "AI Insights",
      value: aiPreview,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={cardStyle}
        >
          <p className="text-white/70 text-sm flex items-center gap-2">
            {c.label}
          </p>

          <h2 className={`mt-2 text-lg font-semibold text-white`}>{c.value}</h2>
        </motion.div>
      ))}
    </div>
  );
};

export default OverviewCards;
