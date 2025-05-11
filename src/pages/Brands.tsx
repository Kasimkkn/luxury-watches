
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { brands } from "@/data/watches";
import { Link } from "react-router-dom";

const Brands = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white font-playfair">Luxury Watch Brands</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Link 
                key={brand.id} 
                to={`/brands/${brand.id}`} 
                className="bg-[#1a1a1a] rounded-lg overflow-hidden transition-transform hover:scale-105 border border-gray-800"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-white font-playfair mb-2">{brand.name}</h2>
                  <p className="text-gray-400 mb-4">{brand.country}</p>
                  <p className="text-gray-300">Founded: {brand.founded}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Brands;
