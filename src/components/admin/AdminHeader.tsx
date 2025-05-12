
import React from "react";
import { Bell, Search, Menu } from "lucide-react";
import { User } from "@/types/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdminHeaderProps {
  user: User | null;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const AdminHeader = ({ user, toggleSidebar, onLogout }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  if (!user) return null;
  
  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  
  return (
    <header className="h-16 bg-[#1a1a1a] border-b border-gray-800 flex items-center px-4 sticky top-0 z-10">
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-800 mr-4"
        >
          <Menu className="h-5 w-5 text-gray-400" />
        </button>
      )}
      
      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search..."
          className="pl-10 bg-[#232323] border-gray-700 text-white w-full"
        />
      </div>
      
      <div className="flex items-center ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-800 relative">
              <Bell className="h-5 w-5 text-gray-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-[#1a1a1a] border-gray-700">
            <div className="p-3 font-medium text-white border-b border-gray-700">
              Notifications
            </div>
            <DropdownMenuItem className="focus:bg-gray-800">
              <div className="flex py-2 space-x-3">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-white">New order received</p>
                  <p className="text-xs text-gray-400">2 minutes ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-gray-800">
              <div className="flex py-2 space-x-3">
                <div className="w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm text-white">Product #2453 back in stock</p>
                  <p className="text-xs text-gray-400">3 hours ago</p>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="focus:bg-gray-800 justify-center">
              <button className="text-primary text-sm">View all notifications</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center ml-4 space-x-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-primary text-white">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user.role}</p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#1a1a1a] border-gray-700">
            <DropdownMenuItem onClick={() => navigate("/profile")} className="focus:bg-gray-800">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/admin/settings")} className="focus:bg-gray-800">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="focus:bg-gray-800 text-red-500">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default AdminHeader;
