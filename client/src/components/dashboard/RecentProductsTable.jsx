import React from "react";
import { motion } from "framer-motion";

const RecentProductsTable = ({ products }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="backdrop-blur-xl bg-white/20 border border-white/30 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-white text-xl font-semibold mb-4">Recent Products</h2>

      <table className="w-full text-white/90 text-sm">
        <thead>
          <tr className="border-b border-white/20">
            <th className="py-3 text-left">Name</th>
            <th className="text-left">Category</th>
            <th className="text-left">Price</th>
            <th className="text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {products.slice(-5).reverse().map((p) => (
            <tr key={p._id} className="border-b border-white/10">
              <td className="py-3">{p.name}</td>
              <td>{p.category}</td>
              <td>₹{p.price}</td>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {products.length === 0 && (
        <p className="text-white/70 mt-3">No products found.</p>
      )}
    </motion.div>
  );
};

export default RecentProductsTable;
