
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
