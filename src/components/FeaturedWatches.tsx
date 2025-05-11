
import React from "react";
import WatchCard from "./WatchCard";
import { Watch } from "@/types";
import { useNavigate } from "react-router-dom";

interface FeaturedWatchesProps {
  watches: Watch[];
}

const FeaturedWatches = ({ watches }: FeaturedWatchesProps) => {
  const navigate = useNavigate();
  
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Timepieces</h2>
          <button 
            onClick={() => navigate("/watches")}
            className="text-primary font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {watches.filter(watch => watch.featured).map((watch) => (
            <div key={watch.id}>
              <WatchCard 
                watch={watch} 
                onClick={() => navigate(`/watches/${watch.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWatches;
