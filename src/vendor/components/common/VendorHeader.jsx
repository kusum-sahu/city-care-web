import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";

const VendorHeader = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white flex items-center justify-between px-8 shadow-sm border-b border-gray-100">
      
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <Menu
          size={22}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => setCollapsed(!collapsed)}
        />
        <h2 className="text-xl font-medium text-gray-700">Dashboard</h2>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6 relative">
        <Search size={20} className="text-gray-500 cursor-pointer" />
        <Bell size={20} className="text-green-700 cursor-pointer" />

        {/* PROFILE */}
        <div
          className="relative"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer">
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="w-9 h-9 rounded-full border"
            />
            <span className="font-medium text-gray-800 hidden md:block">
              Ashok Sharma
            </span>
            <ChevronDown
              size={16}
              className={`transition ${open ? "rotate-180" : ""}`}
            />
          </div>

          {/* DROPDOWN */}
          <div
            className={`absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg border p-2 transition-all
            ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
          >
            <button className="flex gap-3 px-4 py-2 w-full hover:bg-gray-50 rounded-lg">
              <User size={18} /> Profile
            </button>
            <button className="flex gap-3 px-4 py-2 w-full hover:bg-gray-50 rounded-lg">
              <Settings size={18} /> Settings
            </button>
            <div className="border-t my-2" />
            <button className="flex gap-3 px-4 py-2 w-full hover:bg-red-50 text-red-600 rounded-lg">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default VendorHeader;
