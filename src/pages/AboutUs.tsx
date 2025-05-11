
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-playfair">About Luxury Watches</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dedicated to curating exceptional timepieces for discerning collectors and enthusiasts since 2010.
            </p>
          </div>
          
          {/* Our Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white font-playfair">Our Story</h2>
              <p className="text-gray-300 mb-4">
                Founded by passionate horologists with over two decades of experience in the luxury watch industry,
                Luxury Watches began as a small boutique in Mumbai focused on vintage timepieces.
              </p>
              <p className="text-gray-300 mb-4">
                What started as a passion project quickly evolved into one of India's premier destinations for
                high-end watches, known for our unwavering commitment to authenticity and exceptional service.
              </p>
              <p className="text-gray-300">
                Today, we bring that same dedication to our online platform, connecting collectors and enthusiasts
                worldwide with the finest timepieces from renowned Swiss and international watchmakers.
              </p>
            </div>
            <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4 text-white font-playfair">Our Mission</h3>
              <p className="text-gray-300 mb-4">
                To provide watch enthusiasts with access to exceptional timepieces that represent the pinnacle
                of craftsmanship, innovation, and design.
              </p>
              <h3 className="text-2xl font-bold mb-4 mt-8 text-white font-playfair">Our Values</h3>
              <ul className="text-gray-300 space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Authenticity in every timepiece we offer</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Expertise that guides collectors through their journey</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Transparency in all our business practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Excellence in customer service and support</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Team */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-white font-playfair text-center">Our Experts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Rajiv Mehta", role: "Founder & CEO", expertise: "Vintage Rolex Specialist" },
                { name: "Priya Singh", role: "Head of Authentication", expertise: "Patek Philippe Expert" },
                { name: "Vikram Kapoor", role: "Chief Watchmaker", expertise: "WOSTEP Certified" },
                { name: "Aisha Patel", role: "Client Relations", expertise: "Fine Jewelry Specialist" }
              ].map((member, index) => (
                <div key={index} className="bg-[#1a1a1a] p-6 rounded-lg border border-gray-800 text-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-bold text-white font-playfair mb-1">{member.name}</h3>
                  <p className="text-primary mb-2">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.expertise}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Contact */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-gray-800 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white font-playfair text-center">Visit Our Boutique</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white font-playfair mb-4">Mumbai Flagship Store</h3>
                <p className="text-gray-300 mb-2">123 Luxury Lane, Bandra West</p>
                <p className="text-gray-300 mb-2">Mumbai, Maharashtra 400050</p>
                <p className="text-gray-300 mb-6">India</p>
                
                <p className="text-gray-300 mb-2">
                  <span className="font-semibold text-white">Hours:</span> Monday-Saturday, 10am-7pm
                </p>
                <p className="text-gray-300 mb-6">
                  <span className="font-semibold text-white">Phone:</span> +91 98765 43210
                </p>
                
                <button className="bg-primary text-black px-6 py-3 rounded-md font-bold hover:bg-primary/90 transition-colors">
                  Book an Appointment
                </button>
              </div>
              <div className="bg-gray-700 rounded-lg min-h-[200px] flex items-center justify-center">
                <p className="text-white">Map placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;
