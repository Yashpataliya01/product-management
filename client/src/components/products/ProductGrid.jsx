import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {products.length === 0 && (
        <p className="text-white/80 text-center col-span-full mt-8">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductGrid;
