import {
  Download,
  Calendar,
  Search,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import jsPDF from "jspdf";

const Orders = () => {
  // Mock Data
  const initialOrders = [
    {
      id: "#12356",
      user: "Akash Patel",
      avatar: "https://i.pravatar.cc/150?img=11",
      vendor: "CleanPro Services",
      type: "Service",
      service: "House Cleaning",
      date: "Apr 28, 2024",
      amount: "1,200",
      status: "Pending",
    },
    {
      id: "#12355",
      user: "Neha Sharma",
      avatar: "https://i.pravatar.cc/150?img=5",
      vendor: "TechFix Solutions",
      type: "Service",
      service: "AC Repair",
      date: "Apr 25, 2024",
      amount: "850",
      status: "In Progress",
    },
    {
      id: "#12354",
      user: "Sunil Gupta",
      avatar: "https://i.pravatar.cc/150?img=3",
      vendor: "ElectroCare",
      type: "Service",
      service: "Electrical Repair",
      date: "Apr 24, 2024",
      amount: "1,000",
      status: "In Progress",
    },
    {
      id: "#12353",
      user: "Vijay Rao",
      avatar: "https://i.pravatar.cc/150?img=7",
      vendor: "PlumbMaster",
      type: "Product",
      service: "Plumbing Tools Kit",
      date: "Apr 20, 2024",
      amount: "500",
      status: "Completed",
    },
    {
      id: "#12352",
      user: "Preeti Mehra",
      avatar: "https://i.pravatar.cc/150?img=9",
      vendor: "PestGuard",
      type: "Service",
      service: "Pest Control",
      date: "Apr 18, 2024",
      amount: "1,750",
      status: "Completed",
    },
    {
      id: "#12351",
      user: "Arvind Kumar",
      avatar: "https://i.pravatar.cc/150?img=12",
      vendor: "HomeClean Pro",
      type: "Product",
      service: "Cleaning Supplies Set",
      date: "Apr 15, 2024",
      amount: "700",
      status: "In Progress",
    },
    {
      id: "#12350",
      user: "Sanjay Verma",
      avatar: "https://i.pravatar.cc/150?img=13",
      vendor: "WoodWorks",
      type: "Service",
      service: "Carpenter",
      date: "Apr 12, 2024",
      amount: "950",
      status: "Completed",
    },
    {
      id: "#12349",
      user: "Ritu Singh",
      avatar: "https://i.pravatar.cc/150?img=20",
      vendor: "CoolAir Tech",
      type: "Product",
      service: "AC Filter Replacement",
      date: "Apr 10, 2024",
      amount: "1,100",
      status: "Completed",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  // Filter states
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Any Status");
  const [selectedService, setSelectedService] = useState("All Services");
  const [searchQuery, setSearchQuery] = useState("");

  // Get unique statuses and services
  const statuses = useMemo(() => ["Any Status", ...new Set(orders.map(order => order.status))], [orders]);
  const services = useMemo(() => ["All Services", ...new Set(orders.map(order => order.service))], [orders]);

  // Helper to format date for filtering
  const formatDateForFilter = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  // Update order status
  const updateOrderStatus = (id, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Orders Report", 20, 20);

    let yPosition = 40;
    doc.setFontSize(12);
    filteredOrders.forEach((order, index) => {
      doc.text(`${index + 1}. Order ID: ${order.id}`, 20, yPosition);
      doc.text(`   User: ${order.user}`, 20, yPosition + 10);
      doc.text(`   Service: ${order.service}`, 20, yPosition + 20);
      doc.text(`   Date: ${order.date}`, 20, yPosition + 30);
      doc.text(`   Amount: ₹${order.amount}`, 20, yPosition + 40);
      doc.text(`   Status: ${order.status}`, 20, yPosition + 50);
      yPosition += 70;

      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });

    doc.save("orders_report.pdf");
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesDate = selectedDate === "" || order.date === formatDateForFilter(selectedDate);
      const matchesStatus = selectedStatus === "Any Status" || order.status === selectedStatus;
      const matchesService = selectedService === "All Services" || order.service === selectedService;
      const matchesSearch = searchQuery === "" ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.user.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDate && matchesStatus && matchesService && matchesSearch;
    });
  }, [orders, selectedDate, selectedStatus, selectedService, searchQuery]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span>{">"}</span>
        <span className="text-gray-800 font-medium">Orders</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
        <button onClick={exportToPDF} className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm">
          <Download size={18} />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        {/* Single Date Picker */}
        <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px]">
          <Calendar size={16} className="text-gray-400" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-gray-600"
          />
        </div>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Service Filter */}
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {services.map(service => (
            <option key={service} value={service}>
              {service}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by Order ID or User"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Tabs / Table Header Area */}
        

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group">
                  <div className="flex items-center gap-1">
                    Service Date
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group">
                  <div className="flex items-center gap-1">
                    Amount
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group">
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.avatar}
                          alt={order.user}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {order.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.vendor}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.type === "Service"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-purple-100 text-purple-700"
                      }`}>
                        {order.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ₹{order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                            : order.status === "In Progress"
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : order.status === "Completed"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
              <ChevronLeft size={16} /> Previous
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#145A41] text-white text-sm font-medium">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50">
              2
            </button>
            <span className="text-gray-400">...</span>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
