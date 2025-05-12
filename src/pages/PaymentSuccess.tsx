
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = "ORD-" + Date.now().toString().substring(6);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="container mx-auto max-w-lg text-center">
          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-8">
            <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="text-green-500" size={40} />
            </div>
            
            <h1 className="text-3xl font-bold text-white font-playfair mb-4">Payment Successful!</h1>
            <p className="text-gray-400 mb-6">
              Thank you for your purchase. Your order has been successfully placed and is being processed.
            </p>
            
            <div className="bg-[#232323] rounded-lg p-4 mb-6 text-left">
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Order Number:</span>
                <span className="text-primary font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Order Date:</span>
                <span className="text-white">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                onClick={() => navigate('/orders')}
                className="w-full bg-primary text-black font-bold hover:bg-primary/90"
              >
                View Order
              </Button>
              
              <Button 
                onClick={() => navigate('/watches')}
                variant="outline"
                className="w-full border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
