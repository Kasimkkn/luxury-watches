import React from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate();
  return <div className="relative">
    <div className="text-white">
      <div className="container mx-auto px-4 md:py-24 py-12 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 md:space-y-6 space-y-4">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Exceptional Timepieces for Extraordinary Individuals
          </h1>
          <p className="text-sm md:text-lg text-gray-300 max-w-lg">
            Discover our curated collection of luxury watches from the world's most prestigious brands.
          </p>
          <div className="flex max-md:flex-col max-md:gap-2 gap-4">
            <button onClick={() => navigate("/watches")} className="bg-primary hover:bg-primary/90 px-6 md:py-3 py-2 rounded-md max-md:text-sm font-medium text-gray-950">
              Explore Collection
            </button>
            <button onClick={() => navigate("/sell")} className="bg-transparent hover:bg-white/10 border border-white text-white px-6 md:py-3 py-2 max-md:text-sm rounded-md font-medium">
              Sell Your Watch
            </button>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative aspect-square max-w-lg mx-auto">
            <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080" alt="Luxury Watch" className="h-full w-full object-cover rounded-lg shadow-2xl" />
            <div className="absolute md:-bottom-6 -top-8 left-0 md:-right-6 bg-gradient-to-tr from-black via-[#121212] to-[#121212] p-4 w-max h-max rounded-lg shadow-xl">
              <p className="text-white font-bold">Premium Collection</p>
              <p className="text-gray-600 text-sm">Authenticity Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
};
export default Hero;