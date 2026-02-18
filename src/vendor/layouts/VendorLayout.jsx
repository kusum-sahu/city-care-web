import { Outlet } from "react-router-dom";
import { useState } from "react";
import VendorHeader from "../components/common/VendorHeader";
import VendorSidebar from "../components/common/VendorSidebar";

const VendorLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <VendorSidebar collapsed={collapsed} />
      <div
        className={`transition-all duration-300 ${
          collapsed ? "ml-[80px]" : "ml-[260px]"
        }`}
      >
        <VendorHeader
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;
