import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProductModal = ({ open, onClose, onSubmit, editingProduct }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    totalSales: "",
    review: 0,
  });

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        category: editingProduct.category,
        description: editingProduct.description,
        totalSales: editingProduct.totalSales || 0,
        review: editingProduct.review || 5,
      });
    }
  }, [editingProduct]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/20 border border-white/30 rounded-2xl p-8 w-[90%] max-w-lg shadow-xl"
      >
        <h2 className="text-2xl font-semibold text-white mb-6">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        {/* FORM */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1">Product Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-white/20 p-3 rounded-xl text-white outline-none placeholder-white/60"
              placeholder="Enter product name"
            />
          </div>

          {/* PRICE + CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-white/80 mb-1">Price</label>
              <input
                type="number"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="bg-white/20 p-3 rounded-xl text-white outline-none placeholder-white/60"
                placeholder="₹ Price"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-white/80 mb-1">Category</label>
              <input
                type="text"
                required
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="bg-white/20 p-3 rounded-xl text-white outline-none placeholder-white/60"
                placeholder="Category"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="flex flex-col">
            <label className="text-white/80 mb-1">Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-white/20 p-3 rounded-xl text-white outline-none placeholder-white/60 resize-none"
              placeholder="Write product description..."
            />
          </div>

          {/* TOTAL SALES + REVIEW */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Sales */}
            <div className="flex flex-col">
              <label className="text-white/80 mb-1">Total Sales</label>
              <input
                type="number"
                required
                value={form.totalSales}
                onChange={(e) =>
                  setForm({ ...form, totalSales: e.target.value })
                }
                className="bg-white/20 p-3 rounded-xl text-white outline-none placeholder-white/60"
                placeholder="0"
              />
            </div>

            {/* ⭐ Review */}
            <div className="flex flex-col">
              <label className="text-white/80 mb-1">Review (Out of 5)</label>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setForm({ ...form, review: star })}
                    className={`cursor-pointer text-2xl transition 
                      ${form.review >= star ? "text-yellow-300" : "text-white/40"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white p-3 rounded-xl hover:bg-blue-600 transition"
          >
            {editingProduct ? "Save Changes" : "Add Product"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="mt-4 text-white/70 hover:text-white transition block mx-auto"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default ProductModal;
