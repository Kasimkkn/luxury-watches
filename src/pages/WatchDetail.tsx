
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { watches } from "@/data/watches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, ShoppingCart, Share2, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import WatchCard from "@/components/WatchCard";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const WatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const watch = watches.find((w) => w.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!watch) {
    return (
      <div className="bg-[#121212] text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4 font-playfair">Watch Not Found</h1>
          <p className="mb-8">The watch you're looking for does not exist or has been removed.</p>
          <Button onClick={() => navigate("/watches")}>View All Watches</Button>
        </div>
        <Footer />
      </div>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === watch.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? watch.images.length - 1 : prev - 1
    );
  };
  
  const addToCart = () => {
    toast({
      title: "Added to cart",
      description: `${watch.brand} ${watch.model} has been added to your cart.`,
      duration: 3000,
    });
  };
  
  const addToWishlist = () => {
    toast({
      title: "Added to wishlist",
      description: `${watch.brand} ${watch.model} has been added to your wishlist.`,
      duration: 3000,
    });
  };
  
  const similarWatches = watches.filter(
    (w) => w.brand === watch.brand && w.id !== watch.id
  ).slice(0, 3);

  return (
    <div className="bg-[#121212] text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8 text-sm">
          <a href="/" className="hover:text-primary">Home</a>
          <span>/</span>
          <a href="/watches" className="hover:text-primary">Watches</a>
          <span>/</span>
          <a href={`/brands/${watch.brand.toLowerCase()}`} className="hover:text-primary">{watch.brand}</a>
          <span>/</span>
          <span className="text-muted-foreground">{watch.model}</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Watch Images */}
          <div className="relative">
            <div className="overflow-hidden rounded-lg aspect-square mb-4">
              <img
                src={watch.images[currentImageIndex]}
                alt={`${watch.brand} ${watch.model}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            {watch.images.length > 1 && (
              <div className="flex justify-between">
                <button 
                  onClick={prevImage} 
                  className="bg-[#1e1e1e] rounded-full p-2 shadow-md hover:bg-gray-800 text-white"
                  aria-label="Previous image"
                >
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="bg-[#1e1e1e] rounded-full p-2 shadow-md hover:bg-gray-800 text-white"
                  aria-label="Next image"
                >
                  <ArrowRight size={20} />
                </button>
              </div>
            )}
            
            {watch.images.length > 1 && (
              <div className="flex gap-2 mt-4">
                {watch.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 border-2 rounded-md overflow-hidden ${
                      currentImageIndex === index ? 'border-primary' : 'border-gray-700'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${watch.brand} ${watch.model} thumbnail`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Watch Details */}
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-1 font-playfair">{watch.brand} {watch.model}</h1>
              <p className="text-muted-foreground">Reference: {watch.reference}</p>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">{formatPrice(watch.price)}</span>
                {watch.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(watch.originalPrice)}
                  </span>
                )}
              </div>
              {watch.inStock ? (
                <div className="flex items-center gap-2 text-green-500 mt-2">
                  <Check size={16} />
                  <span>In Stock</span>
                </div>
              ) : (
                <div className="text-red-500 mt-2">Out of Stock</div>
              )}
            </div>
            
            <Separator className="my-6 bg-gray-700" />
            
            <div className="mb-6">
              <h2 className="font-semibold mb-3 font-playfair">Description</h2>
              <p className="text-gray-300">{watch.description}</p>
            </div>
            
            <div className="mb-6">
              <h2 className="font-semibold mb-3 font-playfair">Key Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Condition</span>
                  <span>{watch.condition}</span>
                </div>
                {watch.year && (
                  <div className="flex flex-col">
                    <span className="text-sm text-muted-foreground">Year</span>
                    <span>{watch.year}</span>
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Box & Papers</span>
                  <span>
                    {watch.specifications.box ? 'Box' : 'No box'}
                    {' & '}
                    {watch.specifications.papers ? 'Papers' : 'No papers'}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground">Diameter</span>
                  <span>{watch.specifications.diameter}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="flex-1 bg-white text-black hover:bg-gray-200"
                size="lg"
                disabled={!watch.inStock}
                onClick={addToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              
              <Button 
                variant="outline"
                className="flex-1 border-white text-white hover:bg-gray-800"
                size="lg"
                onClick={addToWishlist}
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
            
            <Separator className="my-6 bg-gray-700" />
            
            <div className="mb-6">
              <h2 className="font-semibold mb-3 font-playfair">Share</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="border-white text-white hover:bg-gray-800">
                  <Share2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Accordion Section */}
        <div className="mb-16">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="specifications" className="border-b border-gray-700">
              <AccordionTrigger className="text-white font-playfair">Specifications</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                  <div>
                    <h3 className="font-semibold mb-3 font-playfair">Watch Details</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Brand</span>
                        <span>{watch.brand}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Model</span>
                        <span>{watch.model}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Reference</span>
                        <span>{watch.reference}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Year</span>
                        <span>{watch.year}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Condition</span>
                        <span>{watch.condition}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3 font-playfair">Technical Details</h3>
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Case</span>
                        <span>{watch.specifications.case}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Movement</span>
                        <span>{watch.specifications.movement}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Bracelet</span>
                        <span>{watch.specifications.bracelet}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Dial</span>
                        <span>{watch.specifications.dial}</span>
                      </div>
                      <div className="grid grid-cols-2 border-b border-gray-700 pb-1">
                        <span className="text-muted-foreground">Diameter</span>
                        <span>{watch.specifications.diameter}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="delivery" className="border-b border-gray-700">
              <AccordionTrigger className="text-white font-playfair">Shipping & Delivery</AccordionTrigger>
              <AccordionContent>
                <div className="py-4">
                  <h3 className="font-semibold mb-3 font-playfair">Shipping Information</h3>
                  <p className="mb-4 text-gray-300">
                    We offer secure, insured shipping nationwide with special handling for our luxury timepieces.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>Free shipping on all orders above ₹2,00,000</li>
                    <li>All watches are fully insured during transit</li>
                    <li>Standard delivery: 3-5 working days</li>
                    <li>Express delivery: 1-2 working days (additional charges apply)</li>
                    <li>All orders require signature upon delivery</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="warranty" className="border-b border-gray-700">
              <AccordionTrigger className="text-white font-playfair">Warranty</AccordionTrigger>
              <AccordionContent>
                <div className="py-4">
                  <h3 className="font-semibold mb-3 font-playfair">Warranty Details</h3>
                  <p className="mb-4 text-gray-300">
                    All our watches come with a 24-month warranty covering manufacturing defects.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                    <li>24-month warranty against manufacturing defects</li>
                    <li>In-house service for routine maintenance and repairs</li>
                    <li>30-day money-back guarantee if you're not satisfied with your purchase</li>
                    <li>Warranty does not cover damage due to misuse or unauthorized repairs</li>
                    <li>Original purchase receipt required for warranty claims</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Similar Watches */}
        {similarWatches.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 font-playfair">Similar Watches</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarWatches.map((similarWatch) => (
                <WatchCard 
                  key={similarWatch.id} 
                  watch={similarWatch}
                  onClick={() => navigate(`/watches/${similarWatch.id}`)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default WatchDetail;
