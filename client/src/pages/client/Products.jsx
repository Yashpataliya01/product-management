import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/actions/productActions";

import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // FILTER + SEARCH + SORT
  let filtered = [...products];

  if (search.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "low-high") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high-low") filtered.sort((a, b) => b.price - a.price);

  // SUBMIT ADD/EDIT
  const handleSubmit = (form) => {
    if (editingProduct) {
      dispatch(updateProduct(editingProduct._id, form));
    } else {
      dispatch(createProduct(form));
    }
    setOpenModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="w-full min-h-screen p-6 md:p-10 bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">

      {/* Page Title */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-white">Products</h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-500 px-5 py-3 rounded-xl text-white hover:bg-blue-600 transition"
        >
          ➕ Add Product
        </button>
      </div>

      {/* Filters */}
      <ProductFilters
        products={products}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      {/* Products Grid */}
      <div className="mt-8">
        <ProductGrid
          products={filtered}
          onEdit={(p) => {
            setEditingProduct(p);
            setOpenModal(true);
          }}
          onDelete={(id) => dispatch(deleteProduct(id))}
        />
      </div>

      {/* Add/Edit Modal */}
      <ProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
      />
    </div>
  );
};

export default Products;
