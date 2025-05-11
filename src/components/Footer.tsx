import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="bg-[#121212] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-playfair">LUXURY WATCHES</h3>
            <p className="text-gray-300 mb-4">
              Exceptional timepieces for extraordinary individuals. Offering authenticated luxury watches with guaranteed quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Instagram" className="hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.647c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z" />
                </svg>
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.051 10.051 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 14.001-7.5 14.001-14.001 0-.213-.005-.426-.015-.637a10.025 10.025 0 002.46-2.548l-.047-.02z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/watches" className="text-gray-300 hover:text-primary">All Watches</Link></li>
              <li><Link to="/brands" className="text-gray-300 hover:text-primary">Brands</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-300 hover:text-primary">New Arrivals</Link></li>
              <li><Link to="/pre-owned" className="text-gray-300 hover:text-primary">Pre-Owned</Link></li>
              <li><Link to="/sell" className="text-gray-300 hover:text-primary">Sell Your Watch</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Information</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-primary">About Us</Link></li>
              <li><Link to="/authentication" className="text-gray-300 hover:text-primary">Authentication</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-primary">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-primary">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Mumbai, India</li>
              <li><a href="tel:+919876543210" className="text-gray-300 hover:text-primary">+91 98765 43210</a></li>
              <li><a href="mailto:info@luxurywatches.com" className="text-gray-300 hover:text-primary">info@luxurywatches.com</a></li>
            </ul>
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input type="email" placeholder="Your email" className="text-white px-3 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full bg-[#121212]" />
                <button className="bg-primary hover:bg-primary/90 text-black px-4 py-2 rounded-r-md font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Luxury Watches. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;