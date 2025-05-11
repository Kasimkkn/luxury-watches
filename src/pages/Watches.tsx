
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { watches, brands } from "@/data/watches";
import { Watch, WatchFilters, Brand } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import WatchCard from "@/components/WatchCard";

const Watches = () => {
  const [filters, setFilters] = useState<WatchFilters>({
    brand: [],
    priceRange: [0, 100000],
    condition: [],
    inStock: false,
  });
  const [sortBy, setSortBy] = useState<string>("newest");

  // Handle brand filter change
  const handleBrandChange = (brand: string) => {
    setFilters((prevFilters) => {
      const currentBrands = prevFilters.brand || [];
      if (currentBrands.includes(brand)) {
        return {
          ...prevFilters,
          brand: currentBrands.filter((b) => b !== brand),
        };
      } else {
        return {
          ...prevFilters,
          brand: [...currentBrands, brand],
        };
      }
    });
  };

  // Handle condition filter change
  const handleConditionChange = (
    condition: "New" | "Excellent" | "Good" | "Fair"
  ) => {
    setFilters((prevFilters) => {
      const currentConditions = prevFilters.condition || [];
      if (currentConditions.includes(condition)) {
        return {
          ...prevFilters,
          condition: currentConditions.filter((c) => c !== condition),
        };
      } else {
        return {
          ...prevFilters,
          condition: [...currentConditions, condition],
        };
      }
    });
  };

  // Handle price range change
  const handlePriceRangeChange = (values: number[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: [values[0], values[1]],
    }));
  };

  // Handle in stock filter change
  const handleInStockChange = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      inStock: !prevFilters.inStock,
    }));
  };

  // Filter watches based on selected filters
  const filteredWatches = watches.filter((watch) => {
    // Filter by brand if any brand is selected
    if (
      filters.brand &&
      filters.brand.length > 0 &&
      !filters.brand.includes(watch.brand)
    ) {
      return false;
    }

    // Filter by condition if any condition is selected
    if (
      filters.condition &&
      filters.condition.length > 0 &&
      !filters.condition.includes(watch.condition)
    ) {
      return false;
    }

    // Filter by price range
    if (
      filters.priceRange &&
      (watch.price < filters.priceRange[0] ||
        watch.price > filters.priceRange[1])
    ) {
      return false;
    }

    // Filter by in stock
    if (filters.inStock && !watch.inStock) {
      return false;
    }

    return true;
  });

  // Sort filtered watches
  const sortedWatches = [...filteredWatches].sort((a, b) => {
    switch (sortBy) {
      case "priceAsc":
        return a.price - b.price;
      case "priceDesc":
        return b.price - a.price;
      case "newest":
        return (b.year || 0) - (a.year || 0);
      default:
        return 0;
    }
  });

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      brand: [],
      priceRange: [0, 100000],
      condition: [],
      inStock: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white font-playfair">
          Luxury Watches Collection
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-white font-playfair">
                  Filters
                </h2>
                <Button
                  variant="link"
                  className="text-primary p-0"
                  onClick={resetFilters}
                >
                  Reset All
                </Button>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">Brands</h3>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div key={brand.id} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand.id}`}
                        checked={filters.brand?.includes(brand.name)}
                        onCheckedChange={() => handleBrandChange(brand.name)}
                        className="mr-2"
                      />
                      <label
                        htmlFor={`brand-${brand.id}`}
                        className="text-gray-300 cursor-pointer"
                      >
                        {brand.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Price Range
                </h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 100000]}
                    max={100000}
                    step={1000}
                    value={filters.priceRange}
                    onValueChange={handlePriceRangeChange}
                    className="mb-4"
                  />
                  <div className="flex justify-between">
                    <span className="text-gray-300">
                      ${filters.priceRange?.[0].toLocaleString()}
                    </span>
                    <span className="text-gray-300">
                      ${filters.priceRange?.[1].toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Condition
                </h3>
                <div className="space-y-2">
                  {["New", "Excellent", "Good", "Fair"].map((condition) => (
                    <div key={condition} className="flex items-center">
                      <Checkbox
                        id={`condition-${condition}`}
                        checked={filters.condition?.includes(
                          condition as "New" | "Excellent" | "Good" | "Fair"
                        )}
                        onCheckedChange={() =>
                          handleConditionChange(
                            condition as "New" | "Excellent" | "Good" | "Fair"
                          )
                        }
                        className="mr-2"
                      />
                      <label
                        htmlFor={`condition-${condition}`}
                        className="text-gray-300 cursor-pointer"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Stock Filter */}
              <div>
                <div className="flex items-center">
                  <Checkbox
                    id="in-stock"
                    checked={filters.inStock}
                    onCheckedChange={handleInStockChange}
                    className="mr-2"
                  />
                  <label
                    htmlFor="in-stock"
                    className="text-gray-300 cursor-pointer"
                  >
                    In Stock Only
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-white">
                Showing {sortedWatches.length} watches
              </p>
              <div className="w-48">
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                    <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {sortedWatches.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400 text-center">
                <div>
                  <p className="text-xl mb-2">No watches found</p>
                  <p>Try adjusting your filters</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedWatches.map((watch: Watch) => (
                  <WatchCard key={watch.id} watch={watch} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Watches;
