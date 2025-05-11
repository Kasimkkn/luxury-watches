
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
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="inline-block p-3 bg-primary/10 text-primary rounded-full mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-xl mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
