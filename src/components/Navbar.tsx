
import React from "react";
import { Link } from "react-router-dom";
import { Search, User, Heart, Menu, ShoppingCart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button className="mr-4 lg:hidden text-white">
              <Menu size={24} />
            </button>
            <Link to="/" className="md:text-2xl font-bold text-white font-playfair">
              LUXURY WATCHES
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/watches" className="font-medium text-white hover:text-primary transition-colors">
              All Watches
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="font-medium text-white hover:text-primary transition-colors">
                Brands
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48 bg-[#121212] border border-gray-800">
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands/rolex">Rolex</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands/patek-philippe">Patek Philippe</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands/audemars-piguet">Audemars Piguet</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands/omega">Omega</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands/cartier">Cartier</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                  <Link to="/brands">All Brands</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/sell-your-watch" className="font-medium text-white hover:text-primary transition-colors">
              Sell Your Watch
            </Link>
            <Link to="/about-us" className="font-medium text-white hover:text-primary transition-colors">
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" aria-label="Cart" className="text-white hover:text-primary transition-colors">
              <ShoppingCart size={20} />
            </Link>

            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white">
                      {user?.firstName?.charAt(0) + user?.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#121212] border border-gray-800">
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/profile">My Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/wishlist">My Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/change-password">Change Password</Link>
                  </DropdownMenuItem>
                  {user.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                        <Link to="/admin">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-white hover:bg-gray-800">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <User size={20} className="text-white hover:text-primary transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-[#121212] border border-gray-800">
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="text-white hover:bg-gray-800">
                    <Link to="/signup">Create Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
