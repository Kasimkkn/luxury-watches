
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { brands } from "@/data/watches";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brand, Watch } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// Mock watches data for this brand
const brandWatches: Watch[] = [
  {
    id: "1",
    brand: "Rolex",
    model: "Submariner",
    price: 1250000,
    originalPrice: 1300000,
    condition: "Excellent",
    year: 2022,
    reference: "REF1234",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"],
    description: "Iconic diving watch with unidirectional rotatable bezel",
    inStock: true,
    featured: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Oyster",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "41mm"
    }
  },
  {
    id: "2",
    brand: "Rolex",
    model: "Daytona",
    price: 1950000,
    condition: "New",
    year: 2023,
    reference: "REF2345",
    images: ["https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=1080"],
    description: "Prestigious chronograph designed for professional racing drivers",
    inStock: true,
    specifications: {
      case: "Yellow Gold",
      movement: "Automatic",
      bracelet: "Oyster",
      dial: "Champagne",
      box: true,
      papers: true,
      diameter: "40mm"
    }
  },
  {
    id: "3",
    brand: "Rolex",
    model: "DateJust",
    price: 890000,
    condition: "Good",
    year: 2019,
    reference: "REF3456",
    images: ["https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=1080"],
    description: "Classic timepiece with date function",
    inStock: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Jubilee",
      dial: "Silver",
      box: false,
      papers: true,
      diameter: "36mm"
    }
  },
  {
    id: "4",
    brand: "Rolex",
    model: "GMT-Master II",
    price: 1450000,
    condition: "Excellent",
    year: 2021,
    reference: "REF4567",
    images: ["https://images.unsplash.com/photo-1627293509201-cd0c4174452c?q=80&w=1080"],
    description: "Designed for international travelers with dual time zone function",
    inStock: false,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic",
      bracelet: "Oyster",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "40mm"
    }
  }
];

const BrandDetail = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [watches, setWatches] = useState<Watch[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [conditions, setConditions] = useState<string[]>([]);

  // Filter states
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    // Find brand details from our mock data
    const foundBrand = brands.find(b => b.id === brandId);
    if (foundBrand) {
      setBrand(foundBrand);
      
      // For demonstration purposes, we'll use the mock watches data
      // In a real app, you would fetch watches for this specific brand from an API
      setWatches(brandWatches);
    }
  }, [brandId]);

  // Filter watches based on selected filters
  const filteredWatches = watches.filter(watch => {
    // Price range filter
    const priceMatch = watch.price >= priceRange[0] && watch.price <= priceRange[1];
    
    // Condition filter
    const conditionMatch = conditions.length === 0 || conditions.includes(watch.condition);
    
    // In stock filter
    const stockMatch = !inStockOnly || watch.inStock;
    
    return priceMatch && conditionMatch && stockMatch;
  });

  // Sort watches based on selected sort option
  const sortedWatches = [...filteredWatches].sort((a, b) => {
    switch(sortOption) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "newest":
        return (b.year || 0) - (a.year || 0);
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col bg-[#121212]">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-white text-xl">Brand not found</div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto">
          {/* Brand Hero Section */}
          <section className="mb-12">
            <div className="bg-[#1a1a1a] rounded-lg overflow-hidden border border-gray-800 p-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-4">{brand.name}</h1>
              <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
                <div>
                  <span className="text-gray-500 mr-2">Country:</span>
                  {brand.country}
                </div>
                <div>
                  <span className="text-gray-500 mr-2">Founded:</span>
                  {brand.founded}
                </div>
              </div>
              <p className="text-gray-400 max-w-3xl">
                {brand.name} is renowned for its exceptional craftsmanship and timeless designs. 
                Established in {brand.founded}, the brand has become synonymous with luxury and precision in watchmaking.
              </p>
            </div>
          </section>
          
          {/* Filters and Products Section */}
          <section className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-72 shrink-0">
              <Card className="bg-[#1a1a1a] border-gray-800 text-white sticky top-4">
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg mb-4">Filters</h3>
                  
                  {/* Price Range Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3 text-gray-300">Price Range</h4>
                    <Slider
                      defaultValue={[0, 3000000]}
                      max={3000000}
                      step={50000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-6"
                    />
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div>₹{priceRange[0].toLocaleString()}</div>
                      <div>₹{priceRange[1].toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <Separator className="my-4 bg-gray-800" />
                  
                  {/* Condition Filter */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-3 text-gray-300">Condition</h4>
                    <div className="space-y-2">
                      {["New", "Excellent", "Good", "Fair"].map(condition => (
                        <label key={condition} className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={conditions.includes(condition)}
                            onChange={() => {
                              if (conditions.includes(condition)) {
                                setConditions(conditions.filter(c => c !== condition));
                              } else {
                                setConditions([...conditions, condition]);
                              }
                            }}
                            className="rounded border-gray-700 text-primary h-4 w-4 focus:ring-primary/50"
                          />
                          {condition}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-4 bg-gray-800" />
                  
                  {/* In Stock Filter */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-300 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                        className="rounded border-gray-700 text-primary h-4 w-4 focus:ring-primary/50"
                      />
                      In Stock Only
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Products Grid */}
            <div className="flex-grow">
              {/* Sorting and Results Count */}
              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                <div className="text-white">
                  <p>{sortedWatches.length} results</p>
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-full sm:w-48 bg-[#1a1a1a] border-gray-800 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-gray-800 text-white">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Watches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedWatches.map(watch => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
              
              {sortedWatches.length === 0 && (
                <EmptyState 
                  title="No watches found"
                  description="No watches match your current filter criteria. Try adjusting your filters."
                  icon="⌚"
                />
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BrandDetail;
