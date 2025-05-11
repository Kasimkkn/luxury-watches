
import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Users,
  Clock,
  DollarSign,
  TrendingUp,
  Tag,
  BarChart,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { AreaChart, Area, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for charts
const salesData = [
  { name: "Jan", revenue: 12000 },
  { name: "Feb", revenue: 19000 },
  { name: "Mar", revenue: 15000 },
  { name: "Apr", revenue: 25000 },
  { name: "May", revenue: 32000 },
  { name: "Jun", revenue: 28000 },
  { name: "Jul", revenue: 35000 },
];

const productData = [
  { name: "Rolex", sales: 32 },
  { name: "Omega", sales: 28 },
  { name: "Patek", sales: 15 },
  { name: "Cartier", sales: 22 },
  { name: "AP", sales: 18 },
];

const recentOrders = [
  {
    id: "ORD-9385",
    customer: "John Doe",
    product: "Rolex Submariner",
    date: "2023-05-10",
    amount: 12500,
    status: "Completed",
  },
  {
    id: "ORD-6259",
    customer: "Emma Thompson",
    product: "Omega Speedmaster",
    date: "2023-05-09",
    amount: 5200,
    status: "Processing",
  },
  {
    id: "ORD-7814",
    customer: "Michael Blake",
    product: "Cartier Tank",
    date: "2023-05-09",
    amount: 7300,
    status: "Completed",
  },
  {
    id: "ORD-4523",
    customer: "Sarah Johnson",
    product: "Patek Philippe Calatrava",
    date: "2023-05-08",
    amount: 21000,
    status: "Pending",
  },
];

const AdminDashboard = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "Processing":
        return "bg-blue-500";
      case "Pending":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white font-playfair">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Admin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$164,320</div>
            <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">342</div>
            <p className="text-xs text-gray-400 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,256</div>
            <p className="text-xs text-gray-400 mt-1">+18% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$7,842</div>
            <p className="text-xs text-gray-400 mt-1">+4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 bg-[#1a1a1a] border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold text-white">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 px-2">
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#9b87f5",
                  },
                }}
              >
                <AreaChart data={salesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#9b87f5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #374151',
                      color: '#fff'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#9b87f5"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                  />
                </AreaChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 px-2">
              <ChartContainer
                config={{
                  sales: {
                    label: "Sales",
                    color: "#9b87f5",
                  },
                }}
              >
                <RechartsBarChart data={productData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #374151',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="sales" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-[#1a1a1a] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-bold text-white">Recent Orders</CardTitle>
          <Link to="/admin/orders" className="text-primary text-sm flex items-center hover:underline">
            View All <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">ORDER ID</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">CUSTOMER</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">PRODUCT</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">DATE</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">AMOUNT</th>
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800">
                    <td className="py-3 px-4 text-sm text-white">{order.id}</td>
                    <td className="py-3 px-4 text-sm text-white">{order.customer}</td>
                    <td className="py-3 px-4 text-sm text-white">{order.product}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{order.date}</td>
                    <td className="py-3 px-4 text-sm text-white">${order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${getStatusColor(order.status)} bg-opacity-20 text-${
                        order.status === "Completed" ? "green" : order.status === "Processing" ? "blue" : "amber"
                      }-500`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
