import { Watch } from "@/types";

export const watches: Watch[] = [
  {
    id: "1",
    brand: "Rolex",
    model: "Submariner Date",
    price: 950000,
    condition: "New",
    year: 2023,
    reference: "126610LN",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600",
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?q=80&w=600"
    ],
    description: "The Rolex Submariner Date in stainless steel with a black ceramic bezel and black dial. This iconic diving watch features a 41mm case and is powered by the Rolex caliber 3235 movement.",
    inStock: true,
    featured: true,
    specifications: {
      case: "Oystersteel",
      movement: "Automatic, Caliber 3235",
      bracelet: "Oystersteel",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "41mm"
    }
  },
  {
    id: "2",
    brand: "Patek Philippe",
    model: "Nautilus",
    price: 3500000,
    condition: "Excellent",
    year: 2022,
    reference: "5711/1A-010",
    images: [
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600",
      "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=600"
    ],
    description: "The discontinued Patek Philippe Nautilus 5711/1A with the iconic blue dial. One of the most sought-after luxury sports watches in excellent condition.",
    inStock: true,
    featured: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic, Caliber 26-330 S C",
      bracelet: "Stainless Steel",
      dial: "Blue",
      box: true,
      papers: true,
      diameter: "40mm"
    }
  },
  {
    id: "3",
    brand: "Audemars Piguet",
    model: "Royal Oak",
    price: 2750000,
    condition: "Excellent",
    year: 2021,
    reference: "15500ST.OO.1220ST.01",
    images: [
      "https://images.unsplash.com/photo-1614164185117-f319204197e6?q=80&w=600",
      "https://images.unsplash.com/photo-1614164185117-f319204197e6?q=80&w=600"
    ],
    description: "The Audemars Piguet Royal Oak in stainless steel with a blue Grande Tapisserie dial. This iconic luxury sports watch features the distinctive octagonal bezel with exposed screws.",
    inStock: false,
    featured: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic, Caliber 4302",
      bracelet: "Stainless Steel",
      dial: "Blue Grande Tapisserie",
      box: true,
      papers: true,
      diameter: "41mm"
    }
  },
  {
    id: "4",
    brand: "Omega",
    model: "Speedmaster Professional Moonwatch",
    price: 480000,
    originalPrice: 520000,
    condition: "New",
    year: 2023,
    reference: "310.30.42.50.01.001",
    images: [
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=600",
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?q=80&w=600"
    ],
    description: "The Omega Speedmaster Professional Moonwatch with the co-axial master chronometer movement. This watch has been worn on all six lunar landings and represents an important part of space exploration history.",
    inStock: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Manual-winding chronograph, Caliber 3861",
      bracelet: "Stainless Steel",
      dial: "Black",
      box: true,
      papers: true,
      diameter: "42mm"
    }
  },
  {
    id: "5",
    brand: "Cartier",
    model: "Santos de Cartier",
    price: 680000,
    condition: "Good",
    year: 2020,
    reference: "WSSA0010",
    images: [
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=600",
      "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?q=80&w=600"
    ],
    description: "The Cartier Santos in stainless steel with a distinctive square case and exposed screws. This model features the innovative QuickSwitch and SmartLink systems for easy strap changes and sizing.",
    inStock: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Automatic, Caliber 1847 MC",
      bracelet: "Stainless Steel",
      dial: "Silvered opaline",
      box: true,
      papers: false,
      diameter: "39.8mm"
    }
  },
  {
    id: "6",
    brand: "Jaeger-LeCoultre",
    model: "Reverso Classic",
    price: 720000,
    condition: "New",
    year: 2023,
    reference: "Q3858520",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600"
    ],
    description: "The iconic Jaeger-LeCoultre Reverso with its unique reversible case originally designed for polo players. This classic model features the signature Art Deco styling and refined elegance.",
    inStock: true,
    specifications: {
      case: "Stainless Steel",
      movement: "Manual-winding, Caliber 822/2",
      bracelet: "Leather",
      dial: "Silver",
      box: true,
      papers: true,
      diameter: "45.6mm x 27.4mm"
    }
  }
];

// Update brands to be objects with id, name, country, and founded properties
export const brands = [
  { id: "rolex", name: "Rolex", country: "Switzerland", founded: "1905" },
  { id: "patek-philippe", name: "Patek Philippe", country: "Switzerland", founded: "1839" },
  { id: "audemars-piguet", name: "Audemars Piguet", country: "Switzerland", founded: "1875" },
  { id: "omega", name: "Omega", country: "Switzerland", founded: "1848" },
  { id: "cartier", name: "Cartier", country: "France", founded: "1847" },
  { id: "jaeger-lecoultre", name: "Jaeger-LeCoultre", country: "Switzerland", founded: "1833" },
  { id: "vacheron-constantin", name: "Vacheron Constantin", country: "Switzerland", founded: "1755" },
  { id: "a-lange-sohne", name: "A. Lange & Söhne", country: "Germany", founded: "1845" },
  { id: "iwc", name: "IWC", country: "Switzerland", founded: "1868" },
  { id: "breitling", name: "Breitling", country: "Switzerland", founded: "1884" }
];

export const priceRanges = [
  { label: "Under ₹5,00,000", value: [0, 500000] },
  { label: "₹5,00,000 - ₹10,00,000", value: [500000, 1000000] },
  { label: "₹10,00,000 - ₹20,00,000", value: [1000000, 2000000] },
  { label: "₹20,00,000 - ₹50,00,000", value: [2000000, 5000000] },
  { label: "Above ₹50,00,000", value: [5000000, Infinity] }
];

export const conditions = ["New", "Excellent", "Good", "Fair"] as const;
