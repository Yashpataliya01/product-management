import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    description: {
      type: String,
      default: "",
    },

    // which client created the product
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // optional — useful for AI analytics
    totalSales: {
      type: Number,
      default: 0,
    },
    review: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
