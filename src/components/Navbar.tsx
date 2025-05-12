import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="bg-[#121212] border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button className="mr-4 lg:hidden text-white">
                  <Menu size={24} />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-4/5 sm:w-80 bg-[#121212] border-r border-gray-800 p-0">
                <SheetHeader className="border-b border-gray-800 p-4">
                  <SheetTitle className="text-white font-playfair">MENU</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col p-4">
                  <Link
                    to="/watches"
                    className="py-3 border-b border-gray-800 font-medium text-white hover:text-primary transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    All Watches
                  </Link>

                  <Link
                    to="/sell-your-watch"
                    className="py-3 border-b border-gray-800 font-medium text-white hover:text-primary transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    Sell Your Watch
                  </Link>
                  <Link
                    to="/about-us"
                    className="py-3 border-b border-gray-800 font-medium text-white hover:text-primary transition-colors"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    About Us
                  </Link>

                  {isAuthenticated && (
                    <>
                      <div className="py-3 border-b border-gray-800 font-medium text-white">
                        Account
                      </div>
                      <Link
                        to="/profile"
                        className="py-3 border-b border-gray-800 text-white hover:text-primary transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="py-3 border-b border-gray-800 text-white hover:text-primary transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="py-3 border-b border-gray-800 text-white hover:text-primary transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        My Wishlist
                      </Link>
                      {user?.role === "admin" && (
                        <Link
                          to="/admin"
                          className="py-3 border-b border-gray-800 text-white hover:text-primary transition-colors"
                          onClick={() => setIsSheetOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setIsSheetOpen(false);
                        }}
                        className="py-3 text-left text-white hover:text-primary transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  )}

                  {!isAuthenticated && (
                    <>
                      <div className="py-3 border-b border-gray-800 font-medium text-white">
                        Account
                      </div>
                      <Link
                        to="/login"
                        className="py-3 border-b border-gray-800 text-white hover:text-primary transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="py-3 text-white hover:text-primary transition-colors"
                        onClick={() => setIsSheetOpen(false)}
                      >
                        Create Account
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <Link to="/" className="md:text-2xl font-bold text-white font-playfair">
              LUXURY WATCHES
            </Link>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/watches" className="font-medium text-white hover:text-primary transition-colors">
              All Watches
            </Link>
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
                    <AvatarFallback className="bg-primary text-black">
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
                    <Link to="/addresses">My Addresses</Link>
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