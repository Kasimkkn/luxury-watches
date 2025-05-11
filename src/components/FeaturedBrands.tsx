import React from "react";
import { useNavigate } from "react-router-dom";
import { brands } from "@/data/watches";
const FeaturedBrands = () => {
  const navigate = useNavigate();
  const featuredBrands = brands.slice(0, 6);
  return;
};
export default FeaturedBrands;