
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Watch } from "@/types";

// Sample data - in real app would come from user's saved wishlist
const mockWishlist: Watch[] = [
  {
    id: "1",
    brand: "Rolex",
    model: "Submariner",
    price: 1250000,
    originalPrice: 1350000,
    images: ["/placeholder.svg"],
    description: "Iconic diving watch with unidirectional rotatable bezel",
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Oyster",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "41mm"
    },
    inStock: true,
    condition: "New"
  },
  {
    id: "2",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    price: 3200000,
    images: ["/placeholder.svg"],
    description: "Luxury sports watch with iconic octagonal bezel",
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Stainless Steel",
      dial: "Blue",
      box: true,
      papers: true,
      diameter: "41mm"
    },
    inStock: true,
    condition: "Excellent"
  }
];

const Wishlist = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white font-playfair">Your Wishlist</h1>
            <span className="text-white bg-[#1a1a1a] px-3 py-1 rounded-full">
              {mockWishlist.length} Items
            </span>
          </div>
          
          {mockWishlist.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockWishlist.map((watch) => (
                <div key={watch.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 relative">
                  <button className="absolute top-4 right-4 text-red-500 hover:text-red-400 transition-colors">
                    <Heart className="h-6 w-6 fill-current" />
                  </button>
                  
                  <Link to={`/watches/${watch.id}`}>
                    <div className="p-4">
                      <div className="h-48 bg-gray-800 flex items-center justify-center rounded mb-4">
                        <img 
                          src={watch.images[0]} 
                          alt={`${watch.brand} ${watch.model}`} 
                          className="max-h-full object-contain"
                        />
                      </div>
                      <h2 className="text-xl font-bold text-white font-playfair mb-2">{watch.brand} {watch.model}</h2>
                      <p className="text-gray-400 mb-2">Ref: {watch.reference || "N/A"}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-primary font-bold text-xl">₹{watch.price.toLocaleString()}</p>
                          {watch.originalPrice && watch.originalPrice > watch.price && (
                            <p className="text-gray-400 text-sm line-through">
                              ₹{watch.originalPrice.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-gray-300">
                            {watch.inStock ? "In Stock" : "Out of Stock"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="border-t border-gray-800 p-4">
                    <button className="w-full bg-primary text-black py-2 rounded font-bold hover:bg-primary/90 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Heart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold text-white font-playfair mb-4">Your Wishlist is Empty</h2>
              <p className="text-gray-400 mb-8">Browse our collection and heart your favorite pieces</p>
              <Link 
                to="/watches" 
                className="bg-primary text-black px-6 py-3 rounded font-bold hover:bg-primary/90 transition-colors"
              >
                Discover Watches
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
