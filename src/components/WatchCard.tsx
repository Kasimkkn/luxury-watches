
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
      className="overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <div className="relative pb-[70%] overflow-hidden">
        <img
          src={watch.images[0]}
          alt={`${watch.brand} ${watch.model}`}
          className="absolute h-full w-full object-cover transition-transform hover:scale-105 duration-500"
        />
        {watch.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
            SALE
          </div>
        )}
        {!watch.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
            SOLD OUT
          </div>
        )}
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="text-xs text-muted-foreground uppercase font-medium">
          {watch.brand}
        </div>
        <h3 className="font-semibold text-base mt-1">{watch.model}</h3>
        <div className="text-xs text-muted-foreground mt-2">
          {watch.condition} • Ref. {watch.reference}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 pb-4">
        <div>
          <div className="font-bold">{formatPrice(watch.price)}</div>
          {watch.originalPrice && (
            <div className="text-xs text-muted-foreground line-through">
              {formatPrice(watch.originalPrice)}
            </div>
          )}
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded ${
          watch.inStock 
            ? "bg-green-100 text-green-800" 
            : "bg-gray-100 text-gray-800"
        }`}>
          {watch.inStock ? "In Stock" : "Sold Out"}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WatchCard;
