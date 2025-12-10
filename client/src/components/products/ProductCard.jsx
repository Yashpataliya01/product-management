import React from "react";
import { motion } from "framer-motion";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        backdrop-blur-xl bg-white/20 border border-white/30
        rounded-2xl p-5 shadow-lg flex flex-col gap-3
      "
    >
      {/* Product Name */}
      <h2 className="text-xl font-semibold text-white">{product.name}</h2>
      <p className="text-white/70 text-sm">{product.description || "No description"}</p>

      {/* Category + Price */}
      <div className="flex justify-between text-white/80 text-sm mt-2">
        <span>📦 {product.category}</span>
        <span>₹ {product.price}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => onEdit(product)}
          className="p-2 rounded-xl bg-white/20 hover:bg-white/30 transition text-white"
        >
          <FiEdit2 />
        </button>

        <button
          onClick={() => onDelete(product._id)}
          className="p-2 rounded-xl bg-red-400/40 hover:bg-red-500/50 transition text-white"
        >
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
