
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const AdminLayout = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const isMobile = useIsMobile();

  // Show loading state
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#121212]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect if not authenticated or not an admin
  if (!isAuthenticated || user?.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    if (isMobile) {
      setMobileSheetOpen(!mobileSheetOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Desktop sidebar */}
      {!isMobile && (
        <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      )}
      
      {/* Mobile sidebar as sheet */}
      {isMobile && (
        <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
          <SheetContent side="left" className="p-0 border-r border-gray-800 w-[240px]">
            <AdminSidebar collapsed={false} setCollapsed={() => {}} />
          </SheetContent>
        </Sheet>
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader 
          user={user} 
          toggleSidebar={toggleSidebar} 
          onLogout={logout} 
        />
        
        <main className="flex-1 overflow-y-auto p-3 md:p-6 bg-[#121212]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
