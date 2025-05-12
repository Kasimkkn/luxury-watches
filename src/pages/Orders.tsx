
import EmptyState from "@/components/EmptyState";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Search } from "lucide-react";
import { useState } from "react";

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  total: number;
  paymentMethod: string;
  items: OrderItem[];
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock orders data
  const [orders, setOrders] = useState<Order[]>([
    {
      id: "ORD-20240512-0001",
      date: "2024-05-11T14:30:00Z",
      status: "delivered",
      total: 1250000,
      paymentMethod: "Credit Card",
      items: [
        {
          id: "item1",
          productId: "1",
          name: "Rolex Submariner",
          image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080",
          price: 1250000,
          quantity: 1
        }
      ]
    },
    {
      id: "ORD-20240510-0002",
      date: "2024-05-10T10:15:00Z",
      status: "shipped",
      total: 950000,
      paymentMethod: "UPI",
      items: [
        {
          id: "item2",
          productId: "2",
          name: "Omega Seamaster",
          image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080",
          price: 950000,
          quantity: 1
        }
      ]
    },
    {
      id: "ORD-20240505-0003",
      date: "2024-05-05T09:20:00Z",
      status: "processing",
      total: 2300000,
      paymentMethod: "Debit Card",
      items: [
        {
          id: "item3",
          productId: "3",
          name: "Audemars Piguet Royal Oak",
          image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080",
          price: 2300000,
          quantity: 1
        }
      ]
    }
  ]);

  const filteredOrders = orders.filter(
    order => order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-amber-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${(amount).toLocaleString()}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#121212]">
      <Navbar />

      <main className="flex-grow py-5 md:py-8 px-4 md:px-8">
        <div className="md:container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-8 gap-4">
            <h1 className="text-3xl font-bold text-white font-playfair">Your Orders</h1>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-10 bg-[#1a1a1a] text-white border-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredOrders.length > 0 ? (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div key={order.id} className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-5">
                  <div className="flex flex-col md:flex-row justify-between border-b border-gray-800 pb-4 mb-4">
                    <div className="space-y-1 mb-4 md:mb-0">
                      <h3 className="text-white font-semibold">Order #{order.id}</h3>
                      <p className="text-gray-400 text-sm">
                        Placed on {format(new Date(order.date), "dd MMM yyyy")}
                      </p>
                    </div>
                    <div className="flex flex-col md:items-end gap-2 relative">
                      <Badge className={`${getStatusColor(order.status)} text-white capitalize max-md:absolute right-0`}>
                        {order.status}
                      </Badge>
                      <span className="text-gray-400 text-sm">
                        Payment: {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4 items-center">
                        <div className="h-24 w-24 p-2 bg-[#232323] rounded-md flex items-center justify-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <div className="text-gray-400 text-sm mt-1">
                            Qty: {item.quantity} × {formatCurrency(item.price)}
                          </div>
                        </div>
                        <div className="text-primary font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-6 pt-4 border-t border-gray-800">
                    <div className="flex gap-3 mb-4 md:mb-0">
                      <Button
                        variant="outline"
                        className="text-sm border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        className="text-sm border-gray-700 bg-transparent hover:bg-[#232323] text-gray-300"
                      >
                        Track Order
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-400 text-sm">Total Amount</div>
                      <div className="text-primary font-bold text-lg">{formatCurrency(order.total)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Orders Found"
              description="You haven't placed any orders yet or no orders match your search criteria."
              action={{
                label: "Browse Watches",
                href: "/watches"
              }}
              icon="📦"
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
