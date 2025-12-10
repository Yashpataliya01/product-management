import Product from "../models/Product.model.js";

export const getAiInsights = async (req, res) => {
  try {
    const products = await Product.find({ owner: req.user._id });

    if (products.length === 0) {
      return res.json({
        summary: "No products found. Add products to get insights.",
        topProduct: "N/A",
        improvement: "Add more categories to diversify your store.",
        suggestions: "Start by adding at least 5–10 products.",
      });
    }

    // --------- TOP SELLING PRODUCT ---------
    const topProduct = [...products].sort(
      (a, b) => b.totalSales - a.totalSales
    )[0];

    // --------- LOW SELLING CATEGORY ---------
    let categoryCount = {};
    products.forEach((p) => {
      categoryCount[p.category] = (categoryCount[p.category] || 0) + p.totalSales;
    });

    const improvementCategory = Object.keys(categoryCount).sort(
      (a, b) => categoryCount[a] - categoryCount[b]
    )[0];

    // --------- AVG REVIEW ---------
    const avgReview =
      products.reduce((sum, p) => sum + p.review, 0) / products.length;

    // --------- AUTO SUMMARY ---------
    const summary = 
      avgReview > 4
        ? "Your product quality is excellent! Customers are satisfied overall."
        : "Customer experience needs improvement based on average reviews.";

    // --------- SUGGESTIONS ---------
    const suggestions = [
      `Promote your top product: ${topProduct.name}.`,
      `Improve visibility or discounts for category: ${improvementCategory}.`,
      `Try adding bundle offers for better cross-selling.`,
    ];

    res.json({
      summary,
      topProduct: topProduct.name,
      improvement: improvementCategory,
      suggestions,
    });

  } catch (error) {
    console.error("AI Insights Error:", error);
    res.status(500).json({ message: "Failed to generate insights" });
  }
};
