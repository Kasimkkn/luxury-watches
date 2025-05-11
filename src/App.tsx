
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Watches from "./pages/Watches";
import WatchDetail from "./pages/WatchDetail";
import NotFound from "./pages/NotFound";
import Brands from "./pages/Brands";
import SellYourWatch from "./pages/SellYourWatch";
import AboutUs from "./pages/AboutUs";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import { AuthProvider } from "@/context/AuthContext";

// Auth pages
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ResetPassword from "./pages/auth/ResetPassword";
import SetPassword from "./pages/auth/SetPassword";
import ChangePassword from "./pages/auth/ChangePassword";

// Admin pages
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Users from "./pages/admin/Users";
import Support from "./pages/admin/Support";

// Add font links
const fontLinks = (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </>
);

// Add the font links to the document head
document.head.appendChild(
  Object.assign(document.createElement("fragment"), {
    innerHTML: fontLinks.props.children.map((link: React.ReactElement) => 
      link.type === "link" ? 
      `<link rel="${link.props.rel}" href="${link.props.href}" ${link.props.crossOrigin ? `crossorigin="${link.props.crossOrigin}"` : ""} />` : 
      ""
    ).join("")
  })
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/watches" element={<Watches />} />
            <Route path="/watches/:id" element={<WatchDetail />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/sell-your-watch" element={<SellYourWatch />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/set-password" element={<SetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Dashboard />} />
              <Route path="support" element={<Support />} />
              <Route path="analytics" element={<Dashboard />} />
              <Route path="reports" element={<Dashboard />} />
              <Route path="settings" element={<Dashboard />} />
            </Route>
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
