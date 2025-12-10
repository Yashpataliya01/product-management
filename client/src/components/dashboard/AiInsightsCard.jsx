import React from "react";
import { motion } from "framer-motion";
import {
  FiCpu,
  FiTrendingUp,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";

const AiInsightsCard = ({ insights }) => {
  console.log("AI Insights:", insights);
  if (!insights) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        backdrop-blur-2xl bg-white/10 border border-white/20 
        shadow-xl rounded-2xl p-6 text-white 
        relative overflow-hidden
      "
    >
      {/* AI Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-600/10 pointer-events-none" />

      {/* Header */}
      <div className="relative flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
          <FiCpu className="text-white text-xl" />
        </div>
        <h2 className="text-xl font-semibold">AI Insights</h2>
      </div>

      {/* Summary */}
      <p className="relative text-white/90 text-sm leading-relaxed mb-4">
        <FiAlertCircle className="inline text-yellow-300 mr-2" />
        <span className="font-medium text-white">{insights.summary}</span>
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 my-4" />

      {/* Top Product */}
      <div className="relative mb-4">
        <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
          Top Product
        </p>
        <p className="text-lg font-semibold flex items-center gap-2">
          <FiTrendingUp className="text-green-300" />
          {insights.topProduct}
        </p>
      </div>

      {/* Needs Improvement */}
      <div className="relative mb-4">
        <p className="text-white/60 text-xs uppercase tracking-wide mb-1">
          Needs Improvement
        </p>
        <p className="text-lg font-semibold text-red-300 flex items-center gap-2">
          <FiAlertCircle />
          {insights.improvement}
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 my-4" />

      {/* Suggestions */}
      <div className="relative">
        <p className="text-white/60 text-xs uppercase tracking-wide mb-2">
          Suggestions
        </p>

        <ul className="space-y-2">
          {insights.suggestions.map((s, index) => (
            <li
              key={index}
              className="
                flex items-start gap-3 text-sm text-white/90 
                bg-white/10 p-3 rounded-xl hover:bg-white/20 
                transition backdrop-blur-md border border-white/10
              "
            >
              <FiCheckCircle className="text-blue-300 mt-0.5" /> {s}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default AiInsightsCard;
