
import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-black to-gray-900 text-white">
        <div className="container mx-auto px-4 py-24 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Exceptional Timepieces for Extraordinary Individuals
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Discover our curated collection of luxury watches from the world's most prestigious brands.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/watches")}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md font-medium"
              >
                Explore Collection
              </button>
              <button
                onClick={() => navigate("/sell")}
                className="bg-transparent hover:bg-white/10 border border-white text-white px-6 py-3 rounded-md font-medium"
              >
                Sell Your Watch
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square max-w-lg mx-auto">
              <img
                src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"
                alt="Luxury Watch"
                className="h-full w-full object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl">
                <p className="text-black font-bold">Premium Collection</p>
                <p className="text-gray-600 text-sm">Authenticity Guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
