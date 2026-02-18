import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  Star,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/vendor/dashboard" },
  { name: "My Services", icon: Wrench, path: "/vendor/services" },
  { name: "Bookings", icon: ShoppingCart, path: "/vendor/bookings" },
  { name: "Earnings", icon: CreditCard, path: "/vendor/earnings" },
  { name: "Reviews", icon: Star, path: "/vendor/reviews" },
  { name: "Support", icon: Star, path: "/vendor/support" },
  { name: "Settings", icon: Settings, path: "/vendor/settings" },
];

const VendorSidebar = ({ collapsed }) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0E3F2E] to-[#145A41]
      text-white transition-all duration-300 z-40
      ${collapsed ? "w-[80px]" : "w-[260px]"}`}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10">
        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
          🏙️
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-semibold">CITYCARE</h1>
            <p className="text-xs text-white/70">VENDOR PANEL</p>
          </div>
        )}
      </div>

      {/* MENU */}
      <nav className="px-3 py-4 space-y-1">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;

          return (
            <NavLink
              key={i}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition
              ${
                active
                  ? "bg-white/15 text-white font-medium"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div
        className={`fixed bottom-0 border-t border-white/10 bg-[#145A41] p-4
        ${collapsed ? "w-[80px]" : "w-[260px]"}`}
      >
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg w-full
        text-white/80 hover:bg-red-500/20 hover:text-white">
          <LogOut size={18} />
          {!collapsed && "Logout"}
        </button>
      </div>
    </aside>
  );
};

export default VendorSidebar;
