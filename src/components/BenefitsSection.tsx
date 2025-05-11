
import React from "react";
import { Shield, Package, Clock, Award } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="h-10 w-10" />,
    title: "Authenticated Pieces",
    description: "Every watch in our collection passes through a rigorous authentication process by certified experts."
  }, 
  {
    icon: <Package className="h-10 w-10" />,
    title: "Fast Delivery",
    description: "Secure, insured shipping nationwide with special handling for our luxury timepieces."
  }, 
  {
    icon: <Clock className="h-10 w-10" />,
    title: "24-Month Warranty",
    description: "All our watches come with a 24-month warranty covering manufacturing defects."
  }, 
  {
    icon: <Award className="h-10 w-10" />,
    title: "Expert Service",
    description: "Our in-house watchmakers provide premium service for maintenance and repairs."
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-16 bg-[#121212]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white font-playfair mb-12 text-center">Why Choose Us</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-[#1a1a1a] p-6 rounded-lg flex flex-col items-center text-center border border-gray-800"
            >
              <div className="mb-4 text-primary">{benefit.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3 font-playfair">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
