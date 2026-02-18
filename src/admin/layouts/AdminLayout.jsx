import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "../components/common/AdminSidebar";
import AdminHeader from "../components/common/AdminHeader";


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-[#F4FBF8]">
      
      <AdminSidebar collapsed={collapsed} />

      {/* Main Content */}
      <div  className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? "ml-[80px]" : "ml-[260px]"
        }`}>
        
       <AdminHeader
  collapsed={collapsed}
  setCollapsed={setCollapsed}
/>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
