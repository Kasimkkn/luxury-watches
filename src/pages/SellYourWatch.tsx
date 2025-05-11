
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Upload, 
  Camera, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  BarChart4
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const SellYourWatch = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          {/* Hero section */}
          <div className="py-16 md:py-24 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white font-playfair mb-6">
              Sell Your Luxury Watch
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Get the best value for your timepiece with our transparent and secure selling process.
              Our experts will authenticate and evaluate your watch to ensure you receive a fair price.
            </p>
          </div>
          
          {/* Selling Process */}
          <div className="py-12 bg-[#1a1a1a] rounded-xl mb-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white font-playfair mb-8 text-center">
                Our Selling Process
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Upload Watch Details */}
                <div className="bg-[#242424] p-8 rounded-lg border border-gray-800">
                  <div className="flex items-center mb-4">
                    <Upload className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-white font-playfair">
                      Submit Your Watch
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Fill out our detailed form with your watch information and upload high-quality images. 
                    The more information you provide, the more accurate our initial quote will be.
                  </p>
                  <div className="mt-6 flex gap-2 flex-wrap">
                    <div className="bg-[#333] text-white text-sm px-3 py-1 rounded">Model</div>
                    <div className="bg-[#333] text-white text-sm px-3 py-1 rounded">Reference Number</div>
                    <div className="bg-[#333] text-white text-sm px-3 py-1 rounded">Year</div>
                    <div className="bg-[#333] text-white text-sm px-3 py-1 rounded">Box & Papers</div>
                    <div className="bg-[#333] text-white text-sm px-3 py-1 rounded">Condition</div>
                  </div>
                </div>
                
                {/* Authentication */}
                <div className="bg-[#242424] p-8 rounded-lg border border-gray-800">
                  <div className="flex items-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-white font-playfair">
                      Authentication & Valuation
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    Our expert watchmakers and authentication team will carefully evaluate your timepiece.
                    We assess the condition, authenticity, and market value to provide you with a fair offer.
                  </p>
                  <div className="mt-6">
                    <div className="flex items-center mb-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-white ml-2">90%</span>
                    </div>
                    <p className="text-xs text-gray-400">Authentication Rate</p>
                  </div>
                </div>
                
                {/* Communication */}
                <div className="bg-[#242424] p-8 rounded-lg border border-gray-800">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-white font-playfair">
                      Communication & Offer
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    We maintain open communication throughout the process. Once we've evaluated your watch, 
                    we'll provide you with a competitive offer based on current market conditions.
                  </p>
                  <div className="mt-6 flex gap-3">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-primary mr-1" />
                      <span className="text-white text-sm">Chat</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-primary mr-1" />
                      <span className="text-white text-sm">Call</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Comparison */}
                <div className="bg-[#242424] p-8 rounded-lg border border-gray-800">
                  <div className="flex items-center mb-4">
                    <BarChart4 className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-white font-playfair">
                      Market Comparison
                    </h3>
                  </div>
                  <p className="text-gray-300">
                    We provide transparent market data so you can see how our offer compares to current trends.
                    Our pricing is competitive and fair, based on actual market sales and demand.
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-400">Market Low:</div>
                    <div className="text-white text-right">$X,XXX</div>
                    <div className="text-gray-400">Market Average:</div>
                    <div className="text-white text-right">$X,XXX</div>
                    <div className="text-gray-400">Market High:</div>
                    <div className="text-white text-right">$X,XXX</div>
                    <div className="text-gray-400 font-bold">Our Offer:</div>
                    <div className="text-primary font-bold text-right">Competitive</div>
                  </div>
                </div>
              </div>
              
              {/* Upload Form */}
              <div className="bg-[#1e1e1e] p-8 rounded-lg border border-gray-800 max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-white font-playfair mb-6 text-center">
                  Submit Your Watch Details
                </h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white mb-2">Brand</label>
                      <select className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md">
                        <option value="">Select Brand</option>
                        <option value="rolex">Rolex</option>
                        <option value="omega">Omega</option>
                        <option value="patek">Patek Philippe</option>
                        <option value="audemars">Audemars Piguet</option>
                        <option value="cartier">Cartier</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Model</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md" 
                        placeholder="e.g. Submariner, Speedmaster"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Reference Number</label>
                      <input 
                        type="text" 
                        className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md" 
                        placeholder="e.g. 116610LN"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Year</label>
                      <input 
                        type="number" 
                        className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md" 
                        placeholder="e.g. 2018"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Condition</label>
                      <select className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md">
                        <option value="">Select Condition</option>
                        <option value="new">New/Unworn</option>
                        <option value="excellent">Excellent</option>
                        <option value="very-good">Very Good</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Box & Papers</label>
                      <select className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md">
                        <option value="">Select Option</option>
                        <option value="both">Box and Papers</option>
                        <option value="box">Box Only</option>
                        <option value="papers">Papers Only</option>
                        <option value="none">Neither</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Description</label>
                    <textarea 
                      className="w-full bg-[#333] border border-gray-700 text-white py-2 px-3 rounded-md h-32" 
                      placeholder="Provide any additional details about your watch..."
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-white mb-2">Upload Images</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-md p-6 text-center">
                      <Camera className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-300">Drag and drop files here, or click to select files</p>
                      <p className="text-gray-400 text-sm mt-1">Upload high-quality images (front, back, details)</p>
                      <input type="file" className="hidden" multiple />
                      <button className="mt-4 px-4 py-2 bg-[#333] text-white rounded-md hover:bg-gray-700 transition-colors">
                        Upload Photos
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="px-8 py-3 bg-primary text-black font-bold rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Submit Your Watch
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellYourWatch;
