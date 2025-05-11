
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Watch } from "@/types";

interface WatchCardProps {
  watch: Watch;
  onClick?: () => void;
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
};

const WatchCard = ({ watch, onClick }: WatchCardProps) => {
  return (
    <Card 
      className="overflow-hidden transition-all hover:shadow-xl cursor-pointer h-full flex flex-col bg-[#1E1E1E] border-[#333] hover:border-[#555] group"
      onClick={onClick}
    >
      <div className="relative pb-[100%] overflow-hidden">
        <img
          src={watch.images[0]}
          alt={`${watch.brand} ${watch.model}`}
          className="absolute h-full w-full object-cover transition-transform group-hover:scale-105 duration-500"
        />
        {watch.originalPrice && (
          <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            SALE
          </div>
        )}
        {!watch.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-white font-bold text-lg tracking-wider">SOLD OUT</span>
          </div>
        )}
      </div>
      <CardContent className="flex-grow pt-6">
        <div className="text-xs text-gray-400 uppercase font-medium tracking-wider">
          {watch.brand}
        </div>
        <h3 className="font-semibold text-base mt-1 text-white">{watch.model}</h3>
        <div className="text-xs text-gray-400 mt-2">
          {watch.condition} • Ref. {watch.reference}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 pb-6">
        <div>
          <div className="font-bold text-white">{formatPrice(watch.price)}</div>
          {watch.originalPrice && (
            <div className="text-xs text-gray-400 line-through">
              {formatPrice(watch.originalPrice)}
            </div>
          )}
        </div>
        <div className={`text-xs font-medium px-3 py-1 rounded-full ${
          watch.inStock 
            ? "bg-green-900/40 text-green-400 border border-green-800" 
            : "bg-gray-800/40 text-gray-400 border border-gray-700"
        }`}>
          {watch.inStock ? "In Stock" : "Sold Out"}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WatchCard;
