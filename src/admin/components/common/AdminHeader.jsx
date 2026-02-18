import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CircleMinus,
  Menu,
} from "lucide-react";
import { useState } from "react";

const AdminHeader = ({ collapsed, setCollapsed }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white flex items-center justify-between px-8 shadow-sm border-b border-gray-100">
      <div className="flex items-center gap-4">
        <Menu
          size={22}
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={() => setCollapsed(!collapsed)}
        />
        <h2 className="text-xl font-medium text-gray-700">Dashboard</h2>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6 relative">
        {/* Icons */}
        <div className="flex items-center gap-5">
          <Search className="text-gray-500 cursor-pointer hover:text-gray-700 transition" size={20} />
          
          <div className="relative cursor-pointer">
            <Bell className="text-green-700 fill-current" size={20} />
          </div>

          <div className="h-6 w-[1px] bg-gray-300"></div>

          <CircleMinus className="text-gray-500 cursor-pointer hover:text-gray-700 transition" size={20} />
        </div>

        <div
          className="relative group"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="flex items-center gap-3 cursor-pointer py-2">
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="admin"
              className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm"
            />
            <div className="hidden md:flex items-center gap-2">
              <p className="text-base font-medium text-gray-800">
                Priyabrata K
              </p>
              <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </div>
          </div>
          <div
            className={`absolute right-0 top-full w-60 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 p-2 z-50 transition-all duration-200 origin-top-right ${
              open
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 translate-y-2 invisible"
            }`}
          >
            <div className="space-y-1">
              <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group/item">
                <User size={18} className="text-green-700 group-hover/item:text-green-800" />
                <span className="font-medium text-sm">Profile</span>
              </button>
              
              <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group/item">
                <Settings size={18} className="text-green-700 group-hover/item:text-green-800" />
                <span className="font-medium text-sm">Change Password</span>
              </button>
            </div>

            <div className="h-[1px] bg-gray-100 my-2 mx-2"></div>

            <button className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-xl transition-colors group/item">
              <LogOut size={18} className="text-gray-500 group-hover/item:text-red-500 transition-colors" />
              <span className="font-medium text-sm group-hover/item:text-red-600 transition-colors">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
