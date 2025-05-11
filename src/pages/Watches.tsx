
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
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Filter, ChevronDown, ChevronUp, Search, TagIcon, ClockIcon } from "lucide-react";

const Watches = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<WatchFilters>({
    brand: [],
    priceRange: [0, 5000000],
    condition: [],
    inStock: true
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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

  const handleSort = (option: string) => {
    setSortOption(option);
  };

  let sortedWatches = [...watches];
  
  // Sort watches based on selected option
  if (sortOption === "price-low") {
    sortedWatches.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    sortedWatches.sort((a, b) => b.price - a.price);
  }

  const filteredWatches = sortedWatches.filter(watch => {
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
    <div className="bg-[#121212] text-white min-h-screen">
      <Navbar />
      <div className="py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 font-playfair">Luxury Timepieces</h1>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input 
                placeholder="Search watches..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1E1E1E] border-[#333] text-white" 
              />
            </div>
            
            <div className="flex gap-3">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" className="flex gap-2 bg-[#1E1E1E] border-[#333] hover:bg-[#2A2A2A] text-white">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="bg-[#1A1A1A] text-white border-t border-[#333]">
                  <div className="p-6 max-h-[80vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Brand Filters */}
                      <div>
                        <h3 className="font-medium mb-4 text-lg flex items-center gap-2">
                          <TagIcon className="h-4 w-4" />
                          Brand
                        </h3>
                        <div className="space-y-3">
                          {brands.map((brand) => (
                            <div key={brand} className="flex items-center">
                              <Checkbox 
                                id={`brand-${brand}`} 
                                checked={filters.brand?.includes(brand)}
                                onCheckedChange={(checked) => 
                                  handleBrandFilter(brand, checked as boolean)
                                }
                                className="border-[#555]"
                              />
                              <label 
                                htmlFor={`brand-${brand}`} 
                                className="ml-3 text-sm text-gray-300"
                              >
                                {brand}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Condition Filters */}
                      <div>
                        <h3 className="font-medium mb-4 text-lg flex items-center gap-2">
                          <ClockIcon className="h-4 w-4" />
                          Condition
                        </h3>
                        <div className="space-y-3">
                          {conditions.map((condition) => (
                            <div key={condition} className="flex items-center">
                              <Checkbox 
                                id={`condition-${condition}`} 
                                checked={filters.condition?.includes(condition)}
                                onCheckedChange={(checked) => 
                                  handleConditionFilter(condition, checked as boolean)
                                }
                                className="border-[#555]"
                              />
                              <label 
                                htmlFor={`condition-${condition}`} 
                                className="ml-3 text-sm text-gray-300"
                              >
                                {condition}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Price Range */}
                      <div>
                        <h3 className="font-medium mb-4 text-lg">Price Range</h3>
                        <div className="px-2">
                          <Slider
                            defaultValue={[0, 5000000]}
                            max={5000000}
                            step={100000}
                            value={filters.priceRange}
                            onValueChange={handlePriceRangeChange}
                          />
                        </div>
                        <div className="flex justify-between mt-4">
                          <span className="text-sm text-gray-300">
                            ₹{filters.priceRange?.[0].toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-300">
                            ₹{filters.priceRange?.[1].toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* In Stock Filter */}
                    <div className="mt-8">
                      <div className="flex items-center">
                        <Checkbox 
                          id="in-stock" 
                          checked={filters.inStock}
                          onCheckedChange={(checked) => 
                            handleInStockFilter(checked as boolean)
                          }
                          className="border-[#555]"
                        />
                        <label htmlFor="in-stock" className="ml-3 text-sm text-gray-300">
                          In Stock Only
                        </label>
                      </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <DrawerClose asChild>
                        <Button className="bg-white text-black hover:bg-gray-200">
                          Apply Filters
                        </Button>
                      </DrawerClose>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  className="bg-[#1E1E1E] border border-[#333] text-white rounded-md p-2 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-gray-500"
                  value={sortOption}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </div>
          </div>
          
          {/* Results Count */}
          <div className="mb-6">
            <span className="text-gray-400">{filteredWatches.length} watches found</span>
          </div>
          
          {/* Watch Grid */}
          {filteredWatches.length === 0 ? (
            <div className="bg-[#1E1E1E] p-12 rounded-lg border border-[#333] text-center">
              <h3 className="text-xl font-medium mb-2">No watches found</h3>
              <p className="text-gray-400">Try adjusting your filters to find more watches.</p>
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
      <Footer />
    </div>
  );
};

export default Watches;
