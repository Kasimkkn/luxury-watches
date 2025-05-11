
export interface Watch {
  id: string;
  brand: string;
  model: string;
  price: number;
  originalPrice?: number;
  condition: 'New' | 'Excellent' | 'Good' | 'Fair';
  year?: number;
  reference?: string;
  images: string[];
  description: string;
  inStock: boolean;
  featured?: boolean;
  specifications: {
    case: string;
    movement: string;
    bracelet: string;
    dial: string;
    box?: boolean;
    papers?: boolean;
    diameter?: string;
  };
}

export interface WatchFilters {
  brand?: string[];
  priceRange?: [number, number];
  condition?: ('New' | 'Excellent' | 'Good' | 'Fair')[];
  inStock?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  country: string;
  founded: string;
}
