
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  Clock,
  Package,
  Heart,
  LogOut,
  Edit,
  ShoppingBag,
  Watch,
  BellRing
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  // Mock authenticated user
  const user = {
    name: "Raj Sharma",
    email: "raj.sharma@example.com",
    phone: "+91 98765 43210",
    address: "123 Luxury Lane, Bandra West, Mumbai, 400050",
    joined: "January 2022",
    avatar: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6 md:py-12">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gray-700 rounded-full mr-4 overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white font-playfair">{user.name}</h1>
                <p className="text-gray-400">Member since {user.joined}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-[#1a1a1a] text-white px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors">
                <Edit className="h-4 w-4 inline mr-1" /> Edit Profile
              </button>
              <button className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors">
                <LogOut className="h-4 w-4 inline mr-1" /> Logout
              </button>
            </div>
          </div>

          <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 overflow-hidden">
            <Tabs defaultValue="personal">
              <TabsList className="bg-[#242424] p-0 w-full grid grid-cols-2 md:grid-cols-4 border-b border-gray-800">
                <TabsTrigger
                  value="personal"
                  className="data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white rounded-none border-r border-gray-800 py-3"
                >
                  <User className="h-4 w-4 mr-2" /> Personal Info
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white rounded-none border-r border-gray-800 py-3"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" /> Orders
                </TabsTrigger>
                <TabsTrigger
                  value="collection"
                  className="data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white rounded-none border-r border-gray-800 py-3"
                >
                  <Watch className="h-4 w-4 mr-2" /> Collection
                </TabsTrigger>
                <TabsTrigger
                  value="selling"
                  className="data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white rounded-none py-3"
                >
                  <Clock className="h-4 w-4 mr-2" /> Selling
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <h2 className="text-2xl font-bold text-white font-playfair mb-6">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-2">Change Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-gray-400 mb-2">Shipping Address</label>
                  <textarea
                    className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    rows={3}
                    value={user.address}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-bold text-white font-playfair mb-4">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_new" className="mr-3" defaultChecked />
                      <label htmlFor="notify_new" className="text-white">New arrivals and restocks</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_price" className="mr-3" defaultChecked />
                      <label htmlFor="notify_price" className="text-white">Price drops on your wishlist</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="notify_order" className="mr-3" defaultChecked />
                      <label htmlFor="notify_order" className="text-white">Order updates</label>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="bg-primary text-black px-6 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors">
                    Save Changes
                  </button>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <h2 className="text-2xl font-bold text-white font-playfair mb-6">Order History</h2>

                {/* Sample order */}
                <div className="bg-[#242424] rounded-lg border border-gray-700 p-4 mb-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <span className="text-gray-400">Order #12345</span>
                      <h3 className="text-white font-bold">April 12, 2023</h3>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                        Delivered
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 items-center border-t border-gray-700 pt-4">
                    <div className="w-16 h-16 bg-gray-800 flex items-center justify-center rounded">
                      <img src="/placeholder.svg" alt="Watch" className="h-12 object-contain" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-white font-medium">Rolex Submariner</h4>
                      <p className="text-gray-400 text-sm">Ref: 126610LN</p>
                    </div>
                    <div className="text-right">
                      <p className="text-primary font-bold">$12,500</p>
                      <button className="text-gray-400 hover:text-white text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty state for demonstration */}
                <div className="text-center py-8 border-t border-gray-800">
                  <p className="text-gray-400">No more orders to display</p>
                  <Link
                    to="/watches"
                    className="inline-block mt-4 bg-[#242424] text-white px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="collection" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white font-playfair">My Collection</h2>
                  <button className="bg-[#242424] text-white px-4 py-2 rounded-md hover:bg-[#2a2a2a] transition-colors">
                    Add Watch
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Sample collection item */}
                  <div className="bg-[#242424] rounded-lg border border-gray-700 overflow-hidden">
                    <div className="h-48 bg-gray-800 flex items-center justify-center">
                      <img src="/placeholder.svg" alt="Watch" className="h-32 object-contain" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-bold font-playfair mb-1">Omega Speedmaster</h3>
                      <p className="text-gray-400 text-sm mb-3">Ref: 311.30.42.30.01.005</p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-gray-400">Acquired:</div>
                        <div className="text-white">June 2021</div>
                        <div className="text-gray-400">Condition:</div>
                        <div className="text-white">Excellent</div>
                        <div className="text-gray-400">Papers:</div>
                        <div className="text-white">Yes</div>
                        <div className="text-gray-400">Box:</div>
                        <div className="text-white">Yes</div>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <button className="text-gray-400 hover:text-white text-sm mr-3">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-400 text-sm">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Empty state placeholder */}
                  <div className="bg-[#242424] border border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center h-72">
                    <Heart className="h-8 w-8 text-gray-600 mb-2" />
                    <p className="text-gray-400">Add watches to your collection</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="selling" className="p-6 focus-visible:outline-none focus-visible:ring-0">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white font-playfair">Selling History</h2>
                  <Link
                    to="/sell-your-watch"
                    className="bg-primary text-black px-4 py-2 rounded-md font-bold hover:bg-primary/90 transition-colors"
                  >
                    Sell Another Watch
                  </Link>
                </div>

                {/* Sample selling item */}
                <div className="bg-[#242424] rounded-lg border border-gray-700 p-4 mb-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold">Rolex Datejust 41</h3>
                      <p className="text-gray-400 text-sm">Ref: 126334</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-blue-900 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                        In Review
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-700 pt-4">
                    <div>
                      <p className="text-gray-400 text-sm">Submitted</p>
                      <p className="text-white">May 18, 2023</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Status Update</p>
                      <p className="text-white">Authentication in progress</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Offer</p>
                      <p className="text-primary font-bold">Pending</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className="text-white bg-[#333] hover:bg-[#444] px-4 py-1 rounded text-sm">
                      <BellRing className="h-4 w-4 inline mr-1" /> Notifications
                    </button>
                    <button className="text-white bg-[#333] hover:bg-[#444] px-4 py-1 rounded text-sm ml-2">
                      View Details
                    </button>
                  </div>
                </div>

                {/* Completed selling example */}
                <div className="bg-[#242424] rounded-lg border border-gray-700 p-4">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h3 className="text-white font-bold">Omega Seamaster 300M</h3>
                      <p className="text-gray-400 text-sm">Ref: 210.30.42.20.03.001</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className="bg-green-900 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                        Sold
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-700 pt-4">
                    <div>
                      <p className="text-gray-400 text-sm">Sold Date</p>
                      <p className="text-white">March 5, 2023</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Payment</p>
                      <p className="text-green-400">Completed</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Sale Price</p>
                      <p className="text-primary font-bold">$4,850</p>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button className="text-white bg-[#333] hover:bg-[#444] px-4 py-1 rounded text-sm">
                      View Receipt
                    </button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
