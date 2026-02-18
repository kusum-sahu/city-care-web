import React, { useState } from "react";
import {
  ShoppingCart,
  IndianRupee,
  Wrench,
  Users,
  ArrowRight,
  Star,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Area,
  AreaChart,
} from "recharts";

const Dashboard = () => {
  // Status options with colors
  const statusOptions = [
    { value: "Pending", color: "bg-yellow-100 text-yellow-700" },
    { value: "In Progress", color: "bg-blue-100 text-blue-700" },
    { value: "Completed", color: "bg-green-100 text-green-700" },
    { value: "Cancelled", color: "bg-red-100 text-red-700" },
  ];

  // Stats Data
  const stats = [
    {
      title: "Total Orders",
      value: "1,542",
      icon: ShoppingCart,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Revenue",
      value: "₹3,56,540",
      icon: IndianRupee,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Active Services",
      value: "240",
      icon: Wrench,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "Total Users",
      value: "3,485",
      icon: Users,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  // Chart Data
  const ordersData = [
    { name: "Jan", orders: 60 },
    { name: "Feb", orders: 100 },
    { name: "Mar", orders: 130 },
    { name: "Apr", orders: 145 },
    { name: "May", orders: 190 },
    { name: "Jun", orders: 205 },
    { name: "Jul", orders: 225 },
  ];

  const revenueData = [
    { name: "Jan", revenue: 50000 },
    { name: "Feb", revenue: 65000 },
    { name: "Mar", revenue: 52000 },
    { name: "Apr", revenue: 60000 },
    { name: "May", revenue: 75000 },
    { name: "Jun", revenue: 62000 },
    { name: "Jul", revenue: 80000 },
    { name: "Aug", revenue: 68000 },
    { name: "Sep", revenue: 90000 },
    { name: "Oct", revenue: 68000 },
    { name: "Nov", revenue: 75000 },
  ];

  // Recent Orders Data
  const initialOrders = [
    {
      id: "#12346",
      user: "Akash Patel",
      avatar: "https://i.pravatar.cc/40?img=11",
      service: "House Cleaning",
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-700",
    },
    {
      id: "#12345",
      user: "Neha Sharma",
      avatar: "https://i.pravatar.cc/40?img=5",
      service: "AC Repair",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },
    {
      id: "#12344",
      user: "Vijay Rao",
      avatar: "https://i.pravatar.cc/40?img=3",
      service: "Plumbing Service",
      status: "Completed",
      statusColor: "bg-green-100 text-green-700",
    },
  ];

  const [recentOrders, setRecentOrders] = useState(initialOrders);

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = recentOrders.map(order =>
      order.id === id
        ? {
            ...order,
            status: newStatus,
            statusColor: statusOptions.find(opt => opt.value === newStatus).color
          }
        : order
    );
    setRecentOrders(updatedOrders);
  };

  // Recent Reviews Data
  const recentReviews = [
    {
      name: "Priya Sinha",
      role: "B2C User",
      avatar: "https://i.pravatar.cc/40?img=9",
      rating: 5,
      comment: "Great service, highly recommended!",
      time: "2 hours ago",
    },
    {
      name: "Arvind Kumar",
      role: "B2C User",
      avatar: "https://i.pravatar.cc/40?img=12",
      rating: 5,
      comment: "Very professional work done by the team.",
      time: "1 day ago",
    },
    {
      name: "Preeti Mehra",
      role: "B2C User",
      avatar: "https://i.pravatar.cc/40?img=10",
      rating: 5,
      comment: "Quick and reliable service.",
      time: "2 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between"
          >
            <div>
              <p className="text-gray-500 text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl font-bold text-gray-800 mt-1">
                {item.value}
              </h3>
            </div>
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${item.bg} ${item.color}`}
            >
              <item.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Orders Overview</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ordersData}>
                <defs>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="#10B981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorOrders)"
                  dot={{ r: 4, fill: "#10B981", strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Overview */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">
              Revenue Overview
            </h3>
            <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500/20">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} barSize={20}>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `₹${value / 1000}k`}
                  tick={{ fill: "#9CA3AF", fontSize: 12 }}
                />
                <Tooltip
                  formatter={(value) => [`₹${value}`, "Revenue"]}
                  cursor={{ fill: "transparent" }}
                />
                <Bar
                  dataKey="revenue"
                  fill="#86EFAC"
                  radius={[4, 4, 0, 0]}
                  activeBar={{ fill: "#10B981" }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Orders & Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Orders</h3>
            <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-gray-50/50 border-b border-gray-100">
                  <th className="pb-3 pt-3 pl-4 font-medium text-gray-500 text-sm">
                    Order ID
                  </th>
                  <th className="pb-3 pt-3 font-medium text-gray-500 text-sm">
                    User
                  </th>
                  <th className="pb-3 pt-3 font-medium text-gray-500 text-sm">
                    Service
                  </th>
                  <th className="pb-3 pt-3 font-medium text-gray-500 text-sm">
                    Status
                  </th>
                  <th className="pb-3 pt-3 pr-4 font-medium text-gray-500 text-sm text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order, index) => (
                  <tr key={index} className="group hover:bg-gray-50/50 transition">
                    <td className="py-4 pl-4 text-sm font-medium text-gray-600">
                      {order.id}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.avatar}
                          alt={order.user}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {order.user}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-600">
                      {order.service}
                    </td>
                    <td className="py-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border-0 bg-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/20 ${order.statusColor}`}
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.value}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-4 pr-4 text-right">
                      <button className="text-gray-400 hover:text-green-600 transition">
                        <ArrowRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800">Recent Reviews</h3>
            <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
              View All <ArrowRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {recentReviews.map((review, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-100 bg-gray-50/30 hover:bg-white hover:shadow-sm transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">
                      {review.name}
                    </h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {review.comment}
                </p>
                <p className="text-[10px] text-gray-400 mt-2 text-right">
                  {review.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;



// import React from "react";
// import {
//   Users,
//   Briefcase,
//   CalendarCheck,
//   AlertCircle,
//   TrendingUp,
//   DollarSign,
//   BarChart3,
//   Scissors,
//   Wind,
//   Sparkles,
//   Zap,
//   ArrowRight,Wrench,
//   Clock,
//   CheckCircle2,
//   XCircle,
// } from "lucide-react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Dashboard = () => {
//   // Chart data (This Month Earnings)
//   const earningsData = [
//     { day: "1", revenue: 500000, commission: 100000 },
//     { day: "2", revenue: 800000, commission: 160000 },
//     { day: "3", revenue: 1200000, commission: 240000 },
//     { day: "4", revenue: 1500000, commission: 300000 },
//     { day: "5", revenue: 1800000, commission: 360000 },
//     { day: "6", revenue: 3200000, commission: 640000 },
//   ];

//   return (
//     <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
//       {/* Top Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Total Users</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">24,580</p>
//             </div>
//             <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//               <Users className="text-blue-600" size={24} />
//             </div>
//           </div>
//           <div className="mt-4 text-sm">
//             {/* <span className="text-green-600 font-medium">+12%</span> from last month */}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Active Vendors</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">
//                 1,230 <span className="text-sm font-normal text-green-600">Online</span>
//               </p>
//             </div>
//             <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//               <Briefcase className="text-green-600" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Today's Orders</p>
//               <p className="text-2xl font-bold text-gray-800 mt-1">532</p>
//             </div>
//             <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//               <CalendarCheck className="text-purple-600" size={24} />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col relative overflow-hidden">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-sm text-gray-500 font-medium">Pending Complaints</p>
//               <p className="text-2xl font-bold text-red-600 mt-1">18 Open Cases</p>
//             </div>
//             <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//               <AlertCircle className="text-red-600" size={24} />
//             </div>
//           </div>
//           <div className="absolute -top-6 -right-6 w-24 h-24 bg-red-50/50 rounded-full blur-xl"></div>
//         </div>
//       </div>

//       {/* Middle Section - User/Vendor + Earnings + Categories/Zones */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Left - User & Vendor Management */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* User Management */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">User Management</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-600">New Signups Today</p>
//                 <p className="text-xl font-bold text-green-600">150</p>
//               </div>
//               <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition flex items-center justify-center gap-2">
//                 View Users <ArrowRight size={18} />
//               </button>
//             </div>
//           </div>

//           {/* Vendor Management */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <h3 className="text-lg font-semibold text-gray-800 mb-4">Vendor Management</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <p className="text-gray-600">Pending Approvals</p>
//                 <p className="text-xl font-bold text-orange-600">12</p>
//               </div>
//               <div className="flex gap-3">
//                 <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition">
//                   Manage Vendors
//                 </button>
//                 <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition">
//                   Approve
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Center - Earnings Overview */}
//         <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-lg font-semibold text-gray-800">Earnings Overview</h3>
//             <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-green-500/30">
//               <option>This Month</option>
//               <option>Last Month</option>
//             </select>
//           </div>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={earningsData} barGap={4}>
//                 <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af" }} />
//                 <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af" }} />
//                 <Tooltip
//                   formatter={(value) => [`₹${value.toLocaleString()}`, ""]}
//                   cursor={{ fill: "rgba(0,0,0,0.04)" }}
//                 />
//                 <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
//                 <Bar dataKey="commission" fill="#86efac" radius={[4, 4, 0, 0]} name="Commission" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="mt-6 grid grid-cols-2 gap-4 text-center">
//             <div>
//               <p className="text-sm text-gray-500">Revenue</p>
//               <p className="text-xl font-bold text-gray-800">₹6,25,400</p>
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">Commission</p>
//               <p className="text-xl font-bold text-green-600">₹1,20,300</p>
//             </div>
//           </div>
//         </div>

//         {/* Right - Categories & Zones */}
//         <div className="lg:col-span-1 space-y-6">
//           {/* Service Categories */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Service Categories</h3>
//               <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
//                 Manage <ArrowRight size={16} />
//               </button>
//             </div>
//             <ul className="space-y-3">
//               {["Salon & Spa", "AC Repair", "Home Cleaning", "Electrician"].map((cat) => (
//                 <li key={cat} className="flex items-center justify-between text-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                     <span>{cat}</span>
//                   </div>
//                   <ArrowRight size={16} className="text-gray-400" />
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Service Zones */}
//           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold text-gray-800">Service Zones</h3>
//               <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
//                 Edit Zones <ArrowRight size={16} />
//               </button>
//             </div>
//             <ul className="space-y-3">
//               {["South Mumbai", "Noida Sector 62", "Delhi West", "Bangalore Central"].map((zone) => (
//                 <li key={zone} className="flex items-center justify-between text-gray-700">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
//                     <span>{zone}</span>
//                   </div>
//                   <ArrowRight size={16} className="text-gray-400" />
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom - Recent Orders & Open Complaints */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Recent Orders */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-5">
//             <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
//             <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
//               View All <ArrowRight size={16} />
//             </button>
//           </div>
//           <div className="space-y-4">
//             {[
//               { service: "Haircut & Shave", amount: "₹499" },
//               { service: "AC Repair Service", amount: "₹850" },
//               { service: "Kitchen Cleaning", amount: "₹1,200" },
//             ].map((item, i) => (
//               <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
//                     <Wrench className="text-green-600" size={20} />
//                   </div>
//                   <span className="font-medium text-gray-800">{item.service}</span>
//                 </div>
//                 <span className="font-medium text-gray-700">{item.amount}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Open Complaints */}
//         <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//           <div className="flex items-center justify-between mb-5">
//             <h3 className="text-lg font-semibold text-gray-800">Open Complaints</h3>
//             <button className="text-green-600 text-sm font-medium hover:underline flex items-center gap-1">
//               View All <ArrowRight size={16} />
//             </button>
//           </div>
//           <div className="space-y-4">
//             {[
//               { id: "#1023", issue: "Payment Issue" },
//               { id: "#1028", issue: "Service Delay" },
//               { id: "#1034", issue: "Damaged Item" },
//             ].map((complaint, i) => (
//               <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
//                 <div className="flex items-center gap-4">
//                   <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
//                     <AlertCircle className="text-red-600" size={20} />
//                   </div>
//                   <div>
//                     <p className="font-medium text-gray-800">{complaint.issue}</p>
//                     <p className="text-sm text-gray-500">{complaint.id}</p>
//                   </div>
//                 </div>
//                 <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition">
//                   Resolve
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;