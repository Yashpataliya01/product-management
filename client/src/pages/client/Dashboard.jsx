import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux actions
import { fetchProducts } from "../../redux/actions/productActions";
import { fetchAiInsights } from "../../redux/actions/aiActions";

// importing dashboard components
import OverviewCards from "../../components/dashboard/OverviewCards";
import GraphCategoryDistribution from "../../components/dashboard/GraphCategoryDistribution";
import GraphPriceRange from "../../components/dashboard/GraphPriceRange";
import RecentProductsTable from "../../components/dashboard/RecentProductsTable";
import GraphProductGrowth from "../../components/dashboard/GraphProductGrowth";
import GraphTopSellers from "../../components/dashboard/GraphTopSellers";
import GraphReviewDistribution from "../../components/dashboard/GraphReviewDistribution";
import AiInsightsCard from "../../components/dashboard/AiInsightsCard";

const DashboardHome = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const aiInsights = useSelector((state) => state.ai.insights);
  console.log("AI Insights in Dashboard:", aiInsights);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAiInsights());
  }, []);

  return (
    <div className="w-full min-h-screen md:p-10 p-4 bg-gradient-to-br from-[#1e3c72] to-[#2a5298]">
      <h1 className="text-4xl font-bold text-white mb-2">
        Welcome back, {user?.name}
      </h1>
      <p className="text-white/70 mb-8">Your product analytics overview</p>

      <OverviewCards products={products} aiInsights={aiInsights} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <GraphProductGrowth products={products} />
        <GraphCategoryDistribution products={products} />
        <GraphReviewDistribution products={products} />
        <GraphPriceRange products={products} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <GraphTopSellers products={products} />
        <AiInsightsCard insights={aiInsights} />
      </div>

      <div className="mt-10">
        <RecentProductsTable products={products} />
      </div>
    </div>
  );
};

export default DashboardHome;
