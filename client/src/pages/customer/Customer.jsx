import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/actions/productActions";
import { motion } from "framer-motion";

const CustomerPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // UNIQUE category list
  const categories = ["all", ...new Set(products.map((p) => p.category))];

  // Filtered products
  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      filteredCategory === "all" || p.category === filteredCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      
      {/* ================= HERO SECTION ================= */}
      <div className="pt-20 pb-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-extrabold text-white drop-shadow-lg"
        >
          Explore Quality Products
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/80 mt-3 text-lg max-w-2xl mx-auto px-4"
        >
          Discover items from trusted clients. Beautifully curated. Carefully categorized.
        </motion.p>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-xl mx-auto mt-8 backdrop-blur-xl bg-white/20 border border-white/30 p-4 rounded-2xl shadow-lg"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products..."
            className="w-full bg-transparent outline-none text-white placeholder-white/70 text-lg"
          />
        </motion.div>

        {/* CATEGORY FILTER */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilteredCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  filteredCategory === cat
                    ? "bg-white text-[#1e3c72] shadow-md"
                    : "bg-white/20 text-white hover:bg-white/30"
                }
              `}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ================= PRODUCT GRID ================= */}
      <div className="px-6 md:px-12 pb-20">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filtered.map((p) => (
            <motion.div
              key={p._id}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="backdrop-blur-xl bg-white/10 border border-white/20 p-6 rounded-2xl shadow-xl hover:bg-white/20 hover:border-white/30 transition cursor-pointer"
            >
              {/* PRODUCT NAME */}
              <h2 className="text-2xl font-semibold text-white">
                {p.name}
              </h2>

              {/* CATEGORY */}
              <p className="text-white/70 text-sm mt-1">{p.category}</p>

              {/* PRICE */}
              <p className="text-white text-2xl font-bold mt-3">₹{p.price}</p>

              {/* DESCRIPTION */}
              <p className="text-white/70 text-sm mt-2 line-clamp-3">
                {p.description}
              </p>

              {/* REVIEW */}
              <div className="flex gap-1 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-xl ${
                      star <= p.review ? "text-yellow-300" : "text-white/30"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* DATE */}
              <p className="text-white/40 text-xs mt-5">
                Added on {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <p className="text-white text-center col-span-full text-lg">
              No products found.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerPage;
