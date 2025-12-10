import Product from "../models/Product.model.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, description, totalSales, review } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ message: "Name, price & category are required" });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      category,
      description,
      totalSales: Number(totalSales) || 0,
      review: Number(review) || 5,
      owner: req.user._id,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });

  } catch (error) {
    console.error("Error in createProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("owner", "name email");
    res.json(products);
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("owner", "name email");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);

  } catch (error) {
    console.error("Error in getProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to update this product" });
    }

    // Update fields safely
    if (req.body.name !== undefined) product.name = req.body.name;
    if (req.body.price !== undefined) product.price = Number(req.body.price);
    if (req.body.category !== undefined) product.category = req.body.category;
    if (req.body.description !== undefined) product.description = req.body.description;

    if (req.body.totalSales !== undefined) {
      product.totalSales = Number(req.body.totalSales);
    }

    if (req.body.review !== undefined) {
      product.review = Number(req.body.review);
    }

    const updatedProduct = await product.save();

    res.json({
      message: "Product updated successfully",
      updatedProduct,
    });

  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed to delete this product" });
    }

    await product.deleteOne();

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ message: "Server error" });
  }
};
