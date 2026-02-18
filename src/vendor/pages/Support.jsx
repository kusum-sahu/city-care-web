// // src/pages/vendor/Support.jsx
// import React, { useState } from 'react';
// import { 
//   Plus, 
//   Search,
//   Mail,
//   Phone,
//   UserCircle,     // fallback for support avatar
//   ChevronDown,
// } from 'lucide-react';

// // Sample support tickets data
// const initialTickets = [
//   { 
//     id: 'TCKT1004', 
//     subject: 'Payment not received', 
//     category: 'Payments', 
//     status: 'In Progress', 
//     date: 'Apr 23, 2024' 
//   },
//   { 
//     id: 'TCKT1003', 
//     subject: 'Service listing issue', 
//     category: 'Services', 
//     status: 'Open', 
//     date: 'Apr 19, 2024' 
//   },
//   { 
//     id: 'TCKT1002', 
//     subject: 'Add new product', 
//     category: 'Products', 
//     status: 'Open', 
//     date: 'Apr 15, 2024' 
//   },
//   { 
//     id: 'TCKT1001', 
//     subject: 'Unable to withdraw payment', 
//     category: 'Payments', 
//     status: 'Resolved', 
//     date: 'Apr 12, 2024' 
//   },
//   { 
//     id: 'TCKT1004', 
//     subject: 'Flarss', 
//     category: 'Ceiling Fan', 
//     status: 'Completed', 
//     date: 'Apr 11, 2024' 
//   },
// ];

// const Support = () => {
//   const [tickets, setTickets] = useState(initialTickets);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const totalPages = Math.ceil(tickets.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedTickets = tickets.slice(startIndex, startIndex + itemsPerPage);

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Open':
//         return 'bg-yellow-100 text-yellow-800';
//       case 'In Progress':
//         return 'bg-blue-100 text-blue-800';
//       case 'Resolved':
//       case 'Completed':
//         return 'bg-green-100 text-green-800';
//       default:
//         return 'bg-gray-100 text-gray-800';
//     }
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">

//       {/* Header + New Ticket Button */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
//         <h1 className="text-2xl font-bold text-gray-800">Support</h1>
        
//         <button className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2.5 rounded-lg shadow-sm transition-colors">
//           <Plus size={20} />
//           New Ticket
//         </button>
//       </div>

//       {/* Contact Support Card */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
//         <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//           <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
//             {/* You can replace with real support team image */}
//             <UserCircle size={96} className="text-gray-300" />
//           </div>

//           <div className="flex-1">
//             <h3 className="text-xl font-semibold text-gray-900 mb-1">Contact Support</h3>
//             <p className="text-gray-600 mb-4">
//               support@citycare.com<br />
//               +91 98765 43210
//             </p>

//             <div className="flex flex-wrap gap-3">
//               <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors">
//                 <Mail size={18} />
//                 Email
//               </button>
//               <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg transition-colors">
//                 <Phone size={18} />
//                 Call
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Support Tickets Section */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

//         {/* Header with Search */}
//         <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
//           <h2 className="text-lg font-semibold text-gray-800">Support Tickets</h2>
          
//           <div className="flex items-center gap-3 w-full sm:w-auto">
//             <div className="relative flex-1 min-w-[240px]">
//               <input
//                 type="text"
//                 placeholder="Search tickets..."
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//             </div>
//             <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors whitespace-nowrap">
//               Search
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-left min-w-[800px]">
//             <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider">
//               <tr>
//                 <th className="px-6 py-4 font-semibold">Ticket ID</th>
//                 <th className="px-6 py-4 font-semibold">Subject</th>
//                 <th className="px-6 py-4 font-semibold">Category</th>
//                 <th className="px-6 py-4 font-semibold">Status</th>
//                 <th className="px-6 py-4 font-semibold">Date</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200">
//               {paginatedTickets.map((ticket) => (
//                 <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
//                   <td className="px-6 py-4 font-medium text-gray-900">#{ticket.id}</td>
//                   <td className="px-6 py-4">{ticket.subject}</td>
//                   <td className="px-6 py-4">{ticket.category}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusStyle(ticket.status)}`}
//                     >
//                       {ticket.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-gray-600">{ticket.date}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
//           <div>10 / page</div>

//           <div className="flex items-center gap-2">
//             <span>
//               {startIndex + 1} to {Math.min(startIndex + itemsPerPage, tickets.length)} of {tickets.length}
//             </span>

//             <div className="flex items-center gap-1">
//               <button 
//                 disabled={currentPage === 1}
//                 onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//                 className="px-3 py-1.5 border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Prev
//               </button>
              
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                 <button
//                   key={page}
//                   onClick={() => setCurrentPage(page)}
//                   className={`px-3 py-1.5 border rounded min-w-[2.5rem] ${
//                     currentPage === page
//                       ? 'bg-green-600 text-white border-green-600'
//                       : 'hover:bg-gray-100'
//                   }`}
//                 >
//                   {page}
//                 </button>
//               ))}

//               <button
//                 disabled={currentPage === totalPages}
//                 onClick={() => setCurrentPage(p => p + 1)}
//                 className="px-3 py-1.5 border rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Support;


// src/pages/vendor/Support.jsx
import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Mail,
  Phone,
  UserCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Support() {
  // Mock Data
  const initialTickets = [
    {
      id: "TCKT1004",
      subject: "Payment not received",
      category: "Payments",
      status: "In Progress",
      date: "Apr 23, 2024",
    },
    {
      id: "TCKT1003",
      subject: "Service listing issue",
      category: "Services",
      status: "Open",
      date: "Apr 19, 2024",
    },
    {
      id: "TCKT1002",
      subject: "Add new product",
      category: "Products",
      status: "Open",
      date: "Apr 15, 2024",
    },
    {
      id: "TCKT1001",
      subject: "Unable to withdraw payment",
      category: "Payments",
      status: "Resolved",
      date: "Apr 12, 2024",
    },
    {
      id: "TCKT1005",
      subject: "Ceiling Fan installation delay",
      category: "Electrical",
      status: "Completed",
      date: "Apr 11, 2024",
    },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [viewingTicket, setViewingTicket] = useState(null);
  const [deletingTicket, setDeletingTicket] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination & Sorting
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Form data for add/edit
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    status: "Open",
    date: "",
  });

  const categories = useMemo(
    () => ["All Categories", ...new Set(tickets.map((t) => t.category))],
    [tickets]
  );
  const statuses = ["All Status", "Open", "In Progress", "Resolved", "Completed"];

  // Filtered + Sorted + Searched
  const filteredTickets = useMemo(() => {
    let filtered = tickets.filter((ticket) => {
      const matchesCategory =
        selectedCategory === "All Categories" || ticket.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All Status" || ticket.status === selectedStatus;
      const matchesSearch =
        searchQuery === "" ||
        ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ticket.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [tickets, selectedCategory, selectedStatus, searchQuery, sortField, sortDirection]);

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTickets.slice(start, start + itemsPerPage);
  }, [filteredTickets, currentPage]);

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  // Handlers
  const handleAddTicket = () => {
    const newTicket = {
      id: `TCKT${String(tickets.length + 1000).padStart(4, "0")}`,
      ...formData,
    };
    setTickets([...tickets, newTicket]);
    setShowAddModal(false);
    setFormData({ subject: "", category: "", status: "Open", date: "" });
    toast.success("Ticket created successfully!");
  };

  const handleEditTicket = () => {
    setTickets(
      tickets.map((t) =>
        t.id === editingTicket.id ? { ...t, ...formData } : t
      )
    );
    setShowEditModal(false);
    setEditingTicket(null);
    toast.success("Ticket updated successfully!");
  };

  const handleDeleteTicket = () => {
    setTickets(tickets.filter((t) => t.id !== deletingTicket.id));
    setShowDeleteModal(false);
    setDeletingTicket(null);
    toast.success("Ticket deleted successfully!");
  };

  const openEditModal = (ticket) => {
    setEditingTicket(ticket);
    setFormData({
      subject: ticket.subject,
      category: ticket.category,
      status: ticket.status,
      date: ticket.date,
    });
    setShowEditModal(true);
  };

  const openViewModal = (ticket) => {
    setViewingTicket(ticket);
    setShowViewModal(true);
  };

  const openDeleteModal = (ticket) => {
    setDeletingTicket(ticket);
    setShowDeleteModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // View Modal
  const ViewModal = ({ isOpen, onClose, ticket }) => {
    if (!isOpen || !ticket) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">View Ticket</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Ticket ID</label>
              <p className="font-medium">#{ticket.id}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
              <p className="font-medium">{ticket.subject}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
              <p className="font-medium">{ticket.category}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  ticket.status === "Open"
                    ? "bg-yellow-100 text-yellow-800"
                    : ticket.status === "In Progress"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {ticket.status}
              </span>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
              <p className="font-medium">{ticket.date}</p>
            </div>
          </div>

          <div className="mt-8 text-right">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add/Edit Modal
  const Modal = ({ isOpen, onClose, title, onSubmit, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="date"
                placeholder="Date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#145A41] text-white rounded-lg hover:bg-[#0E3F2E]"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const DeleteModal = ({ isOpen, onClose, onConfirm, ticket }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Ticket</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete ticket #{ticket?.id} ?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Support</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm"
        >
          <Plus size={18} />
          New Ticket
        </button>
      </div>

      {/* Contact Support Card (kept from original) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
            <UserCircle size={64} className="text-gray-400" />
          </div>

          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 mb-3">
              support@citycare.com<br />
              +91 98765 43210
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white px-5 py-2 rounded-lg transition">
                <Mail size={18} />
                Email
              </button>
              <button className="flex items-center gap-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white px-5 py-2 rounded-lg transition">
                <Phone size={18} />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[160px] focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <div className="flex-1 min-w-[200px] relative">
            <input
              type="text"
              placeholder="Search by subject or category"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Ticket ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group"
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedTickets.length > 0 ? (
                paginatedTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">#{ticket.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.category}</td>
                    <td className="px-6 py-4">
                      <select
                        value={ticket.status}
                        onChange={(e) => {
                          setTickets(
                            tickets.map((t) =>
                              t.id === ticket.id ? { ...t, status: e.target.value } : t
                            )
                          );
                          toast.success("Ticket status updated!");
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer min-w-[110px] ${
                          ticket.status === "Open"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                            : ticket.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 border-blue-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ticket.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openViewModal(ticket)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(ticket)}
                          className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(ticket)}
                          className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    No tickets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {filteredTickets.length === 0
              ? "0"
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of{" "}
            {filteredTickets.length} Tickets
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-[#145A41] text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Ticket"
        onSubmit={handleAddTicket}
        submitText="Create Ticket"
      />

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Ticket"
        onSubmit={handleEditTicket}
        submitText="Update Ticket"
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        ticket={viewingTicket}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteTicket}
        ticket={deletingTicket}
      />
    </div>
  );
}