
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Tag,
  Users,
  ShoppingCart,
  MessageSquare,
  BarChart,
  FileText,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";

const navItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-blue-500",
  },
  {
    title: "Products",
    icon: Tag,
    href: "/admin/products",
    color: "text-green-500",
  },
  {
    title: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-purple-500",
  },
  {
    title: "Orders",
    icon: ShoppingCart,
    href: "/admin/orders",
    color: "text-orange-500",
  },
  {
    title: "Support",
    icon: MessageSquare,
    href: "/admin/support",
    color: "text-pink-500",
  },
  {
    title: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
    color: "text-cyan-500",
  },
  {
    title: "Reports",
    icon: FileText,
    href: "/admin/reports",
    color: "text-amber-500",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-500",
  },
];

interface AdminSidebarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Nav items list component - extracted to avoid duplication
const NavItems = ({ collapsed, onNavItemClick = () => {} }) => {
  const location = useLocation();
  
  return (
    <nav className="px-3 space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center px-3 py-3 rounded-lg transition-colors",
            location.pathname === item.href
              ? "bg-gray-800 text-white"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          )}
          onClick={onNavItemClick}
        >
          <item.icon className={cn("h-5 w-5", item.color)} />
          {!collapsed && <span className="ml-3">{item.title}</span>}
        </Link>
      ))}
    </nav>
  );
};

// Logout button component - extracted to avoid duplication
const LogoutButton = ({ collapsed, onLogout }) => {
  return (
    <button
      onClick={onLogout}
      className="flex items-center w-full px-3 py-3 text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-colors"
    >
      <LogOut className="h-5 w-5 text-red-500" />
      {!collapsed && <span className="ml-3">Logout</span>}
    </button>
  );
};

const AdminSidebar = ({ collapsed, setCollapsed }: AdminSidebarProps) => {
  const { logout } = useAuth();
  const isMobile = useIsMobile();

  // For mobile: use Sheet
  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <button className="fixed z-50 left-4 top-4 p-2 bg-gray-800 rounded-md">
            <Menu className="h-5 w-5 text-white" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 bg-[#1a1a1a] border-gray-800">
          <div className="h-full flex flex-col">
            <div className="flex items-center p-4 border-b border-gray-800">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-lg font-bold text-white">LW</span>
              </div>
              <h1 className="ml-3 text-xl font-bold text-white font-playfair">Admin Panel</h1>
            </div>
            
            <div className="flex-1 py-6 overflow-y-auto">
              <NavItems collapsed={false} onNavItemClick={() => {}} />
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <LogoutButton collapsed={false} onLogout={logout} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // For desktop: use regular sidebar
  return (
    <aside
      className={cn(
        "h-screen bg-[#1a1a1a] border-r border-gray-800 flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center p-4 border-b border-gray-800">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <span className="text-lg font-bold text-white">LW</span>
        </div>
        {!collapsed && (
          <h1 className="ml-3 text-xl font-bold text-white font-playfair">Admin Panel</h1>
        )}
      </div>
      
      <div className="flex-1 py-6 overflow-y-auto">
        <NavItems collapsed={collapsed} />
      </div>
      
      <div className="p-4 border-t border-gray-800">
        <LogoutButton collapsed={collapsed} onLogout={logout} />
      </div>
    </aside>
  );
};

export default AdminSidebar;
