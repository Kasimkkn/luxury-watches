
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BellRing,
  Clock,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const Profile = () => {
  const user = {
    name: "Kasim Kadiwala",
    email: "kasim@gmail.com",
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
          <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-8">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full mr-4 overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-white font-playfair">{user.name}</h1>
                <p className="text-gray-400">Member since {user.joined}</p>
              </div>
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
                  value="selling"
                  className="data-[state=active]:bg-[#1a1a1a] data-[state=active]:text-white rounded-none py-3"
                >
                  <Clock className="h-4 w-4 mr-2" /> Selling
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="p-3 md:p-6 focus-visible:outline-none focus-visible:ring-0">
                <h2 className="text-2xl font-bold text-white font-playfair mb-6">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-400 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={user.phone}
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-gray-400 mb-2">Change Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-[#242424] border border-gray-700 rounded-md px-4 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="address" className="block text-gray-400 mb-2">Shipping Address</label>
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

              <TabsContent value="selling" className="p-3 md:p-6 focus-visible:outline-none focus-visible:ring-0">
                <div className="flex justify-between items-center mb-4 md:mb-6">
                  <h2 className="md:text-2xl font-bold text-white font-playfair">Selling History</h2>
                  <Link
                    to="/sell-your-watch"
                    className="bg-primary text-black  max-md:text-xs px-4 py-2 rounded-md md:font-bold hover:bg-primary/90 transition-colors"
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
