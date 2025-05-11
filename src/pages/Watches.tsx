
import React, { useState } from "react";
import { watches, brands, conditions, priceRanges } from "@/data/watches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WatchCard from "@/components/WatchCard";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { WatchFilters } from "@/types";

const Watches = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<WatchFilters>({
    brand: [],
    priceRange: [0, 5000000],
    condition: [],
    inStock: true
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleBrandFilter = (brand: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      brand: checked 
        ? [...(prev.brand || []), brand]
        : (prev.brand || []).filter(b => b !== brand)
    }));
  };

  const handleConditionFilter = (condition: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      condition: checked 
        ? [...(prev.condition || []), condition as any] 
        : (prev.condition || []).filter(c => c !== condition)
    }));
  };

  const handleInStockFilter = (checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      inStock: checked
    }));
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }));
  };

  const filteredWatches = watches.filter(watch => {
    // Filter by search query
    if (searchQuery && !`${watch.brand} ${watch.model}`.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by brand
    if (filters.brand && filters.brand.length > 0 && !filters.brand.includes(watch.brand)) {
      return false;
    }
    
    // Filter by condition
    if (filters.condition && filters.condition.length > 0 && !filters.condition.includes(watch.condition)) {
      return false;
    }
    
    // Filter by price range
    if (
      filters.priceRange && 
      (watch.price < filters.priceRange[0] || watch.price > filters.priceRange[1])
    ) {
      return false;
    }
    
    // Filter by in stock
    if (filters.inStock && !watch.inStock) {
      return false;
    }
    
    return true;
  });

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">Luxury Watches Collection</h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters */}
            <div className="w-full lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                
                <div className="mb-6">
                  <Input
                    placeholder="Search watches..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Brand</h3>
                  <div className="space-y-2">
                    {brands.slice(0, 8).map((brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox 
                          id={`brand-${brand}`} 
                          checked={filters.brand?.includes(brand)}
                          onCheckedChange={(checked) => 
                            handleBrandFilter(brand, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`brand-${brand}`} 
                          className="ml-2 text-sm"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 5000000]}
                      max={5000000}
                      step={100000}
                      value={filters.priceRange}
                      onValueChange={handlePriceRangeChange}
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">
                      ₹{filters.priceRange?.[0].toLocaleString()}
                    </span>
                    <span className="text-sm">
                      ₹{filters.priceRange?.[1].toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Condition</h3>
                  <div className="space-y-2">
                    {conditions.map((condition) => (
                      <div key={condition} className="flex items-center">
                        <Checkbox 
                          id={`condition-${condition}`} 
                          checked={filters.condition?.includes(condition)}
                          onCheckedChange={(checked) => 
                            handleConditionFilter(condition, checked as boolean)
                          }
                        />
                        <label 
                          htmlFor={`condition-${condition}`} 
                          className="ml-2 text-sm"
                        >
                          {condition}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <div className="flex items-center">
                    <Checkbox 
                      id="in-stock" 
                      checked={filters.inStock}
                      onCheckedChange={(checked) => 
                        handleInStockFilter(checked as boolean)
                      }
                    />
                    <label htmlFor="in-stock" className="ml-2 text-sm">
                      In Stock Only
                    </label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Watch Grid */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="flex justify-between items-center">
                  <span>{filteredWatches.length} watches found</span>
                  <div className="flex gap-2">
                    <select className="border rounded px-3 py-1 text-sm">
                      <option>Sort by: Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {filteredWatches.length === 0 ? (
                <div className="bg-white p-12 rounded-lg shadow text-center">
                  <h3 className="text-xl font-medium mb-2">No watches found</h3>
                  <p className="text-gray-600">Try adjusting your filters to find more watches.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWatches.map((watch) => (
                    <WatchCard 
                      key={watch.id} 
                      watch={watch}
                      onClick={() => navigate(`/watches/${watch.id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Watches;
