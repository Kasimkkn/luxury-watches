
import React, { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

const AdminLayout = () => {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {!isMobile && (
        <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader 
          user={user} 
          toggleSidebar={toggleSidebar} 
          onLogout={logout} 
        />
        
        <main className="flex-1 overflow-y-auto p-3 md:p-6 bg-[#121212]">
          {isMobile && (
            <AdminSidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
