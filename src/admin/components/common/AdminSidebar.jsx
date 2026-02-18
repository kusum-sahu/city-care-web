import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Wrench,
  Users,
  Star,
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
  User,
  Building2,
} from "lucide-react";
import { useState, useEffect } from "react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Services", icon: Wrench, path: "/admin/services" },
  { name: "Products", icon: Wrench, path: "/admin/products" },
  {
    name: "Users",
    icon: Users,
    subItems: [
      { name: "B2C Users", icon: User, path: "/admin/users/b2c" },
      { name: "B2B Vendors", icon: Building2, path: "/admin/users/b2b" },
    ],
  },
  { name: "Reviews & Ratings", icon: Star, path: "/admin/reviews" },
  { name: "Payments", icon: CreditCard, path: "/admin/payments" },
  { name: "Settings", icon: Settings, path: "/admin/settings" },
];

const AdminSidebar = ({ collapsed }) => {
  const location = useLocation();
  const [expanded, setExpanded] = useState("");

  // 🔹 auto-expand parent ONLY when sub route active
  useEffect(() => {
    const parent = menu.find(m =>
      m.subItems?.some(s => location.pathname === s.path)
    );
    setExpanded(parent?.name || "");
  }, [location.pathname]);

  const toggleExpand = (name) => {
    setExpanded(prev => (prev === name ? "" : name));
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#0E3F2E] to-[#145A41]
      text-white z-40 transition-all duration-300
      ${collapsed ? "w-[80px]" : "w-[260px]"}`}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/10 bg-[#0E3F2E]">
        <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center">
          🏙️
        </div>

        {!collapsed ? (
          <div>
            <h1 className="text-lg font-semibold">CITYCARE</h1>
            <p className="text-xs text-white/70">ADMIN PANEL</p>
          </div>
        ) : (
          <h1 className="text-xl font-bold">C</h1>
        )}
      </div>

      {/* MENU */}
      <nav className="px-3 py-4 space-y-1 pb-24">
        {menu.map((item, i) => {
          const Icon = item.icon;
          const hasSubItems = !!item.subItems;
          const isExpanded = expanded === item.name;

          /* ---------- USERS (WITH SUBMENU) ---------- */
          if (hasSubItems) {
            return (
              <div key={i}>
                {/* Parent — NEVER ACTIVE */}
                <div
                  onClick={() => toggleExpand(item.name)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm
                             text-white/80 hover:bg-white/10 cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    {!collapsed && item.name}
                  </div>

                  {!collapsed &&
                    (isExpanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    ))}
                </div>

                {/* Submenu — ONLY ACTIVE PART */}
                {!collapsed && isExpanded && (
                  <div className="mt-1 ml-4 space-y-1 border-l border-white/20 pl-2">
                    {item.subItems.map((sub, j) => {
                      const SubIcon = sub.icon;
                      return (
                        <NavLink
                          key={j}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
                            ${
                              isActive
                                ? "bg-white/15 text-white font-medium"
                                : "text-white/70 hover:bg-white/5 hover:text-white"
                            }`
                          }
                        >
                          <SubIcon size={16} />
                          <span>{sub.name}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          /* ---------- NORMAL MENU (NO ACTIVE STATE) ---------- */
          return (
            <NavLink
              key={i}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm
                         text-white/80 hover:bg-white/10 transition"
            >
              <Icon size={18} />
              {!collapsed && item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div
        className={`fixed bottom-0 left-0 border-t border-white/10 bg-[#145A41] p-4
        transition-all duration-300 ${collapsed ? "w-[80px]" : "w-[260px]"}`}
      >
        <button
          className={`flex items-center gap-3 px-4 py-2.5 rounded-lg w-full
          text-white/80 hover:bg-red-500/20 hover:text-white transition
          ${collapsed ? "justify-center" : ""}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
