import React from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, Menu, ShoppingCart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
const Navbar = () => {
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4 lg:hidden">
              <Menu size={24} />
            </button>
            <Link to="/" className="text-2xl font-bold text-primary">
              LUXURY WATCHES
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/watches" className="font-medium hover:text-primary transition-colors">
              All Watches
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-medium hover:text-primary transition-colors">
                Brands
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/brands/rolex">Rolex</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/brands/patek-philippe">Patek Philippe</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/brands/audemars-piguet">Audemars Piguet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/brands/omega">Omega</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/brands/cartier">Cartier</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/brands/all">All Brands</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/sell" className="font-medium hover:text-primary transition-colors">
              Sell Your Watch
            </Link>
            <Link to="/about" className="font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="hover:text-primary transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="hover:text-primary transition-colors">
              <ShoppingCart size={20} />
            </Link>
            <Link to="/account" aria-label="Account" className="hover:text-primary transition-colors">
              <User size={20} />
            </Link>
          </div>
        </div>
      </div>
    </header>;
};
export default Navbar;