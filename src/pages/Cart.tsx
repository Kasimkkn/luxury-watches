
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShoppingCart, X, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { Watch } from "@/types";

// Sample data - in real app would come from user's cart
const mockCart: (Watch & { quantity: number })[] = [
  {
    id: "1",
    title: "Rolex Submariner",
    brand: "rolex",
    price: 12500,
    originalPrice: 13500,
    images: ["/placeholder.svg"],
    description: "Iconic diving watch with unidirectional rotatable bezel",
    specifications: {
      reference: "126610LN",
      movement: "Automatic",
      case: "Stainless Steel",
      bracelet: "Oyster",
      dial: "Black",
      bezel: "Ceramic"
    },
    inStock: true,
    isNew: true,
    discount: 7,
    quantity: 1
  }
];

const Cart = () => {
  // Calculate totals
  const subtotal = mockCart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.12; // 12% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-white font-playfair mb-8">Shopping Cart</h1>
          
          {mockCart.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 bg-[#242424] hidden md:grid">
                    <div className="col-span-6">
                      <h3 className="text-white font-medium">Product</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="text-white font-medium">Price</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="text-white font-medium">Quantity</h3>
                    </div>
                    <div className="col-span-2 text-center">
                      <h3 className="text-white font-medium">Total</h3>
                    </div>
                  </div>
                  
                  {/* Cart Items */}
                  {mockCart.map(item => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-800">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex gap-4">
                        <div className="w-20 h-20 bg-gray-800 flex items-center justify-center rounded">
                          <img src={item.images[0]} alt={item.title} className="h-16 object-contain" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold font-playfair">{item.title}</h3>
                          <p className="text-gray-400 text-sm">Ref: {item.specifications?.reference}</p>
                          <button className="text-red-500 hover:text-red-400 transition-colors text-sm flex items-center mt-2">
                            <X className="h-4 w-4 mr-1" /> Remove
                          </button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-white md:hidden">Price:</span>
                        <span className="text-white">${item.price.toLocaleString()}</span>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-white md:hidden">Quantity:</span>
                        <div className="flex items-center">
                          <button className="text-gray-400 hover:text-white">
                            <MinusCircle className="h-5 w-5" />
                          </button>
                          <span className="mx-2 text-white w-6 text-center">{item.quantity}</span>
                          <button className="text-gray-400 hover:text-white">
                            <PlusCircle className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center">
                        <span className="text-white md:hidden">Total:</span>
                        <span className="text-primary font-bold">
                          ${(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-between items-center">
                  <Link 
                    to="/watches" 
                    className="flex items-center text-white hover:text-primary transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Continue Shopping
                  </Link>
                </div>
              </div>
              
              {/* Order Summary */}
              <div>
                <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
                  <h2 className="text-xl font-bold text-white font-playfair mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-white">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tax (12%)</span>
                      <span className="text-white">${tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t border-gray-800 pt-3 flex justify-between">
                      <span className="text-white font-medium">Total</span>
                      <span className="text-primary font-bold">${total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary text-black py-3 rounded font-bold hover:bg-primary/90 transition-colors mb-4">
                    Proceed to Checkout
                  </button>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Secure checkout with crypto or credit card. Insured shipping and 24-month warranty.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h2 className="text-2xl font-bold text-white font-playfair mb-4">Your Cart is Empty</h2>
              <p className="text-gray-400 mb-8">Add some exceptional timepieces to your cart</p>
              <Link 
                to="/watches" 
                className="bg-primary text-black px-6 py-3 rounded font-bold hover:bg-primary/90 transition-colors"
              >
                Shop Now
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
