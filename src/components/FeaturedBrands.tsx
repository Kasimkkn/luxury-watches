import React from "react";
import { useNavigate } from "react-router-dom";
import { brands } from "@/data/watches";
const FeaturedBrands = () => {
  const navigate = useNavigate();
  const featuredBrands = brands.slice(0, 6);
  return <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Brands</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {featuredBrands.map((brand, index) => <div key={index} onClick={() => navigate(`/brands/${brand.toLowerCase()}`)} className="aspect-square flex items-center justify-center p-6 border border-gray-200 rounded-lg bg-[#121212] hover:border-primary/50 hover:shadow-md transition-all cursor-pointer">
              <span className="text-xl font-bold text-center">{brand}</span>
            </div>)}
        </div>
        <div className="text-center mt-8">
          <button onClick={() => navigate("/brands")} className="bg-transparent hover:bg-primary/10 border border-primary text-primary px-6 py-3 rounded-md font-medium transition-colors">
            View All Brands
          </button>
        </div>
      </div>
    </section>;
};
export default FeaturedBrands;