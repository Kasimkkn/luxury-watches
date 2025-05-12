
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { Watch } from "@/types";

const mockCartItems: (Watch & { quantity: number })[] = [
  {
    id: "1",
    brand: "Rolex",
    model: "Submariner",
    price: 1250000,
    quantity: 1,
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"],
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
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems(cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white font-playfair mb-8">Your Cart</h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-grow">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-[#1a1a1a] rounded-lg p-4 mb-4 border border-gray-800">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-44 h-56 sm:h-full rounded flex items-center justify-center">
                        <img
                          src={item.images[0]}
                          alt={`${item.brand} ${item.model}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-white font-bold text-lg font-playfair">{item.brand} {item.model}</h3>
                        <p className="text-gray-400 text-sm">{item.description || "N/A"}</p>


                      </div>

                      <div className="flex flex-row sm:flex-col justify-between items-center">
                        <div className="flex items-center border border-gray-700 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-1 text-gray-400 hover:text-white"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 text-gray-400 hover:text-white"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="text-right">
                          <p className="text-primary font-bold">₹{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:w-1/3">
                <div className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800 sticky top-4">
                  <h2 className="text-white text-xl font-bold mb-4 font-playfair">Order Summary</h2>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">GST (18%)</span>
                      <span className="text-white">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-700 my-2 pt-2"></div>
                    <div className="flex justify-between">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-primary font-bold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout" className="w-full bg-primary text-black font-bold py-3 rounded hover:bg-primary/90 transition-colors">
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="h-16 w-16 mx-auto text-gray-600 mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-white font-playfair mb-4">Your Cart is Empty</h2>
              <p className="text-gray-400 mb-8">Start adding some luxury timepieces to your cart</p>
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

export default Cart;
