
import React from "react";
import { watches } from "@/data/watches";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedWatches from "@/components/FeaturedWatches";
import BenefitsSection from "@/components/BenefitsSection";
import FeaturedBrands from "@/components/FeaturedBrands";
import Testimonials from "@/components/Testimonials";

const Index = () => {
  return (
    <div className="bg-[#121212] text-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedWatches watches={watches} />
        <BenefitsSection />
        <FeaturedBrands />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
