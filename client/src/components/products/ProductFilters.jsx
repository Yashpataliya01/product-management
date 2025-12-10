import React from "react";

const ProductFilters = ({
  products,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  
  // ⭐ GET UNIQUE CATEGORIES FROM DATABASE
  const dynamicCategories = [...new Set(products.map((p) => p.category))];

  return (
    <div
      className="
        backdrop-blur-xl bg-white/20 border border-white/30
        p-5 rounded-2xl shadow-lg flex flex-wrap gap-4 items-center
      "
    >
      {/* SEARCH */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products..."
        className="
          p-3 rounded-xl bg-white/20 text-white placeholder-white/70
          outline-none flex-1
        "
      />

      {/* CATEGORY FILTER */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="
          p-3 rounded-xl bg-white/20 text-white outline-none
        "
      >
        <option className="text-black" value="">All Categories</option>

        {dynamicCategories.map((cat) => (
          <option key={cat} value={cat} className="text-black">
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </option>
        ))}
      </select>

      {/* SORT */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="
          p-3 rounded-xl bg-white/20 text-white outline-none
        "
      >
        <option className="text-black" value="">Sort By</option>
        <option className="text-black" value="low-high">Price: Low → High</option>
        <option className="text-black" value="high-low">Price: High → Low</option>
      </select>
    </div>
  );
};

export default ProductFilters;
