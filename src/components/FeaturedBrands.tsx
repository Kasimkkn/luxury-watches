
import React from "react";
import { useNavigate } from "react-router-dom";
import { brands } from "@/data/watches";
import { Brand } from "@/types";

const FeaturedBrands = () => {
  const navigate = useNavigate();
  const featuredBrands = brands.slice(0, 6);
  
  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white font-playfair mb-8 text-center">Featured Brands</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {featuredBrands.map((brand: Brand) => (
            <div 
              key={brand.id}
              onClick={() => navigate(`/brands/${brand.id}`)}
              className="bg-[#1a1a1a] rounded-lg p-6 flex flex-col items-center justify-center border border-gray-800 hover:border-primary cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-3">
                <span className="text-primary text-xl font-bold">{brand.name.charAt(0)}</span>
              </div>
              <h3 className="text-white font-bold text-center font-playfair">{brand.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button 
            onClick={() => navigate('/brands')}
            className="bg-[#1a1a1a] text-white px-6 py-3 rounded-md hover:bg-[#2a2a2a] transition-colors border border-gray-800"
          >
            View All Brands
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;
