// import React, { useState, useMemo } from "react";
// import {
//   Plus,
//   Search,
//   Eye,
//   Edit2,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   ArrowUpDown,
//   ChevronDown,
//   X,
//    UserCircle,
//   DollarSign,
//   ArrowDownToLine,
// } from "lucide-react";

// import toast, { Toaster } from "react-hot-toast";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const chartData = [
//   { month: "Jan", earnings: 5000 },
//   { month: "Feb", earnings: 8000 },
//   { month: "Mar", earnings: 11000 },
//   { month: "Apr", earnings: 12500 },
//   { month: "May", earnings: 13500 },
//   { month: "Jun", earnings: 15000 },
//   { month: "Jul", earnings: 18000 },
//   { month: "Aug", earnings: 22000 },
//   { month: "Sep", earnings: 28000 },
//   { month: "Oct", earnings: 35000 },
//   { month: "Nov", earnings: 45000 },
//   { month: "Dec", earnings: 52380 },
// ];

// const initialEarnings = [
//   {
//     id: "ORD1083",
//     customer: "Amit",
//     avatar: null,
//     service: "Electrician",
//     amount: 500,
//     status: "Completed",
//     date: "May 12, 2025",
//   },
//   {
//     id: "ORD1084",
//     customer: "Priyubrata",
//     avatar: null,
//     service: "AC Repair",
//     amount: 1500,
//     status: "Completed",
//     date: "May 10, 2025",
//   },
//   {
//     id: "ORD1044",
//     customer: "Pooja",
//     avatar: null,
//     service: "Fan Repair",
//     amount: 450,
//     status: "Completed",
//     date: "Apr 28, 2025",
//   },
//   {
//     id: "ORD1084",
//     customer: "Rahul",
//     avatar: null,
//     service: "Lighting Fixtures",
//     amount: 18000,
//     status: "Completed",
//     date: "Apr 15, 2025",
//   },
//   {
//     id: "ORD1035",
//     customer: "Anjali",
//     avatar: null,
//     service: "AC Installation",
//     amount: 32000,
//     status: "Completed",
//     date: "Mar 20, 2025",
//   },
// ];

// export default function Earnings() {
//   const [earningsList, setEarningsList] = useState(initialEarnings);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [showViewModal, setShowViewModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [viewingItem, setViewingItem] = useState(null);
//   const [deletingItem, setDeletingItem] = useState(null);

//   // Filter states
//   const [selectedStatus, setSelectedStatus] = useState("All Status");
//   const [searchQuery, setSearchQuery] = useState("");

//   // Pagination & Sorting
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6;
//   const [sortField, setSortField] = useState(null);
//   const [sortDirection, setSortDirection] = useState("asc");

//   // Form data
//   const [formData, setFormData] = useState({
//     customer: "",
//     service: "",
//     amount: "",
//     status: "Completed",
//     date: "",
//   });

//   const statuses = ["All Status", "Completed", "Pending", "Failed"];

//   // Filtered + Sorted
//   const filteredEarnings = useMemo(() => {
//     let filtered = earningsList.filter((item) => {
//       const matchesStatus =
//         selectedStatus === "All Status" || item.status === selectedStatus;
//       const matchesSearch =
//         searchQuery === "" ||
//         item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.service.toLowerCase().includes(searchQuery.toLowerCase());

//       return matchesStatus && matchesSearch;
//     });

//     if (sortField) {
//       filtered.sort((a, b) => {
//         let aVal = a[sortField];
//         let bVal = b[sortField];

//         if (sortField === "amount") {
//           aVal = Number(aVal);
//           bVal = Number(bVal);
//         }

//         if (sortDirection === "asc") {
//           return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
//         } else {
//           return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
//         }
//       });
//     }

//     return filtered;
//   }, [earningsList, selectedStatus, searchQuery, sortField, sortDirection]);

//   const paginatedEarnings = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredEarnings.slice(start, start + itemsPerPage);
//   }, [filteredEarnings, currentPage]);

//   const totalPages = Math.ceil(filteredEarnings.length / itemsPerPage);

//   const totalEarnings = earningsList.reduce((sum, item) => sum + item.amount, 0);
//   const withdrawn = 40000;
//   const available = totalEarnings - withdrawn;

//   // Handlers
//   const handleAddEarning = () => {
//     const newItem = {
//       id: `ORD${String(earningsList.length + 1000).padStart(4, "0")}`,
//       ...formData,
//       amount: Number(formData.amount),
//       avatar: null,
//     };
//     setEarningsList([...earningsList, newItem]);
//     setShowAddModal(false);
//     setFormData({
//       customer: "",
//       service: "",
//       amount: "",
//       status: "Completed",
//       date: "",
//     });
//     toast.success("Transaction added successfully!");
//   };

//   const handleEditEarning = () => {
//     setEarningsList(
//       earningsList.map((item) =>
//         item.id === editingItem.id ? { ...item, ...formData, amount: Number(formData.amount) } : item
//       )
//     );
//     setShowEditModal(false);
//     setEditingItem(null);
//     toast.success("Transaction updated successfully!");
//   };

//   const handleDeleteEarning = () => {
//     setEarningsList(earningsList.filter((item) => item.id !== deletingItem.id));
//     setShowDeleteModal(false);
//     setDeletingItem(null);
//     toast.success("Transaction deleted successfully!");
//   };

//   const openEditModal = (item) => {
//     setEditingItem(item);
//     setFormData({
//       customer: item.customer,
//       service: item.service,
//       amount: item.amount.toString(),
//       status: item.status,
//       date: item.date,
//     });
//     setShowEditModal(true);
//   };

//   const openViewModal = (item) => {
//     setViewingItem(item);
//     setShowViewModal(true);
//   };

//   const openDeleteModal = (item) => {
//     setDeletingItem(item);
//     setShowDeleteModal(true);
//   };

//   const handleSort = (field) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("asc");
//     }
//   };

//   const handleWithdraw = () => {
//     toast.success("Withdraw request initiated...");
//     // Add real logic here later
//   };

//   // View Modal
//   const ViewModal = ({ isOpen, onClose, item }) => {
//     if (!isOpen || !item) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-xl font-bold text-gray-800">View Transaction</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>

//           <div className="space-y-5">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Order ID</label>
//               <p className="font-medium">#{item.id}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Customer</label>
//               <div className="flex items-center gap-3">
//                 {item.avatar ? (
//                   <img src={item.avatar} alt="" className="w-10 h-10 rounded-full" />
//                 ) : (
//                   <UserCircle size={40} className="text-gray-400" />
//                 )}
//                 <p className="font-medium">{item.customer}</p>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Service/Product</label>
//               <p className="font-medium">{item.service}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
//               <p className="font-medium text-green-700">₹{item.amount.toLocaleString()}</p>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
//               <span
//                 className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//                   item.status === "Completed"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-yellow-100 text-yellow-700"
//                 }`}
//               >
//                 {item.status}
//               </span>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
//               <p className="font-medium">{item.date}</p>
//             </div>
//           </div>

//           <div className="mt-8 text-right">
//             <button
//               onClick={onClose}
//               className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Add / Edit Modal
//   const Modal = ({ isOpen, onClose, title, onSubmit, submitText }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-md">
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-xl font-bold text-gray-800">{title}</h2>
//             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//               <X size={24} />
//             </button>
//           </div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               onSubmit();
//             }}
//           >
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 placeholder="Customer Name"
//                 value={formData.customer}
//                 onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Service / Product"
//                 value={formData.service}
//                 onChange={(e) => setFormData({ ...formData, service: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//                 required
//               />
//               <input
//                 type="number"
//                 placeholder="Amount (₹)"
//                 value={formData.amount}
//                 onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//                 required
//                 min="1"
//               />
//               <input
//                 type="date"
//                 placeholder="Date"
//                 value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//                 required
//               />
//               <select
//                 value={formData.status}
//                 onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                 className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
//               >
//                 <option value="Completed">Completed</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Failed">Failed</option>
//               </select>
//             </div>
//             <div className="flex gap-3 mt-6">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-[#145A41] text-white rounded-lg hover:bg-[#0E3F2E]"
//               >
//                 {submitText}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

//   const DeleteModal = ({ isOpen, onClose, onConfirm, item }) => {
//     if (!isOpen) return null;

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//         <div className="bg-white rounded-xl p-6 w-full max-w-sm">
//           <div className="text-center">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Transaction</h2>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to delete transaction #{item?.id} ?
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={onClose}
//                 className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={onConfirm}
//                 className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm"
//         >
//           <Plus size={18} />
//           Add Transaction
//         </button>
//       </div>

//       {/* Stats Cards - kept from original but styled consistently */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//           <div className="bg-green-100 p-4 rounded-full">
//             <DollarSign size={28} className="text-green-700" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Total Earnings</p>
//             <p className="text-2xl font-bold text-gray-900">₹{totalEarnings.toLocaleString()}</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
//           <div className="bg-blue-100 p-4 rounded-full">
//             <ArrowDownToLine size={28} className="text-blue-700" />
//           </div>
//           <div>
//             <p className="text-sm text-gray-600">Withdrawn</p>
//             <p className="text-2xl font-bold text-gray-900">₹{withdrawn.toLocaleString()}</p>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between gap-4">
//           <div className="flex items-center gap-4">
//             <div className="bg-green-100 p-4 rounded-full">
//               <DollarSign size={28} className="text-green-700" />
//             </div>
//             <div>
//               <p className="text-sm text-gray-600">Available Balance</p>
//               <p className="text-2xl font-bold text-gray-900">₹{available.toLocaleString()}</p>
//             </div>
//           </div>
//           <button
//             onClick={handleWithdraw}
//             className="bg-[#145A41] hover:bg-[#0E3F2E] text-white px-6 py-2.5 rounded-lg font-medium transition"
//           >
//             Withdraw
//           </button>
//         </div>
//       </div>

//       {/* Chart - kept but wrapped consistently */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <h2 className="text-lg font-semibold text-gray-800 mb-4">Earnings Overview</h2>
//         <div className="h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="month" />
//               <YAxis tickFormatter={(v) => `₹${(v / 1000)}k`} domain={[0, "dataMax"]} />
//               <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, "Earnings"]} />
//               <Line
//                 type="monotone"
//                 dataKey="earnings"
//                 stroke="#145A41"
//                 strokeWidth={3}
//                 dot={{ r: 5, fill: "#145A41", stroke: "#fff", strokeWidth: 2 }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Earnings History Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         {/* Filter bar */}
//         <div className="p-4 border-b border-gray-100 flex flex-wrap items-center gap-4">
//           <div className="flex-1 min-w-[220px] relative">
//             <input
//               type="text"
//               placeholder="Search by customer or service"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
//             />
//             <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//           </div>

//           <div className="relative min-w-[160px]">
//             <select
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//               className="w-full pl-3 pr-10 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none"
//             >
//               {statuses.map((s) => (
//                 <option key={s} value={s}>
//                   {s}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   Order ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   Service/Product
//                 </th>
//                 <th
//                   onClick={() => handleSort("amount")}
//                   className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group"
//                 >
//                   <div className="flex items-center gap-1">
//                     Amount
//                     <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
//                   </div>
//                 </th>
//                 <th
//                   onClick={() => handleSort("status")}
//                   className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group"
//                 >
//                   <div className="flex items-center gap-1">
//                     Status
//                     <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
//                   </div>
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-100">
//               {paginatedEarnings.length > 0 ? (
//                 paginatedEarnings.map((item) => (
//                   <tr key={item.id} className="hover:bg-gray-50/50 transition">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-900">#{item.id}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-3">
//                         {item.avatar ? (
//                           <img src={item.avatar} alt="" className="w-10 h-10 rounded-full" />
//                         ) : (
//                           <UserCircle size={40} className="text-gray-400" />
//                         )}
//                         <span className="font-medium">{item.customer}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{item.service}</td>
//                     <td className="px-6 py-4 font-medium text-green-700">
//                       ₹{item.amount.toLocaleString()}
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={item.status}
//                         onChange={(e) => {
//                           setEarningsList(
//                             earningsList.map((i) =>
//                               i.id === item.id ? { ...i, status: e.target.value } : i
//                             )
//                           );
//                           toast.success("Status updated!");
//                         }}
//                         className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer min-w-[110px] ${
//                           item.status === "Completed"
//                             ? "bg-green-100 text-green-700 border-green-200"
//                             : "bg-yellow-100 text-yellow-700 border-yellow-200"
//                         }`}
//                       >
//                         <option value="Completed">Completed</option>
//                         <option value="Pending">Pending</option>
//                         <option value="Failed">Failed</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">{item.date}</td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button
//                           onClick={() => openViewModal(item)}
//                           className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
//                           title="View"
//                         >
//                           <Eye size={16} />
//                         </button>
//                         <button
//                           onClick={() => openEditModal(item)}
//                           className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors"
//                           title="Edit"
//                         >
//                           <Edit2 size={16} />
//                         </button>
//                         <button
//                           onClick={() => openDeleteModal(item)}
//                           className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
//                           title="Delete"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
//                     No transactions found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             Showing{" "}
//             {filteredEarnings.length === 0
//               ? "0"
//               : (currentPage - 1) * itemsPerPage + 1}{" "}
//             to {Math.min(currentPage * itemsPerPage, filteredEarnings.length)} of{" "}
//             {filteredEarnings.length} Transactions
//           </p>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               disabled={currentPage === 1}
//               className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronLeft size={16} /> Prev
//             </button>

//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
//                   currentPage === page
//                     ? "bg-[#145A41] text-white"
//                     : "border border-gray-200 text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Next <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modals */}
//       <Modal
//         isOpen={showAddModal}
//         onClose={() => setShowAddModal(false)}
//         title="Add New Transaction"
//         onSubmit={handleAddEarning}
//         submitText="Add Transaction"
//       />

//       <Modal
//         isOpen={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         title="Edit Transaction"
//         onSubmit={handleEditEarning}
//         submitText="Update Transaction"
//       />

//       <ViewModal
//         isOpen={showViewModal}
//         onClose={() => setShowViewModal(false)}
//         item={viewingItem}
//       />

//       <DeleteModal
//         isOpen={showDeleteModal}
//         onClose={() => setShowDeleteModal(false)}
//         onConfirm={handleDeleteEarning}
//         item={deletingItem}
//       />
//     </div>
//   );
// }

import React, { useState } from 'react';
import {
  BarChart2,
  Download,
  Calendar,
  Users,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Earnings = () => {
  const [activePeriod, setActivePeriod] = useState('This Week');

  // Sample chart data (weekly view)
  const chartData = [
    { day: 'Sun', earnings: 1200 },
    { day: 'Mon', earnings: 1800 },
    { day: 'Tue', earnings: 1320 },
    { day: 'Wed', earnings: 900 },
    { day: 'Thu', earnings: 2600 },
    { day: 'Fri', earnings: 1950 },
    { day: 'Sat', earnings: 5200 },
  ];

  // Overview stats
  const overview = {
    today: 1320,
    thisWeek: 5200,
    thisMonth: 18650,
    pending: 2280,
  };

  // Breakdown data
  const breakdown = [
    {
      date: 'Mon, Apr 15',
      jobs: 2,
      amount: 900,
      commission: 180,
      payout: 720,
      total: 720,
      status: 'Completed',
    },
    {
      date: 'Tue, Apr 16',
      jobs: 3,
      amount: 1700,
      commission: 340,
      payout: 1360,
      total: 1360,
      status: 'Completed',
    },
    {
      date: 'Wed, Apr 17',
      jobs: 3,
      amount: 2600,
      commission: 520,
      payout: 2080,
      total: 2080,
      status: 'Completed',
    },
    {
      date: 'Thu, Apr 18',
      jobs: 4,
      amount: 5100,
      commission: 1020,
      payout: 4080,
      total: 4080,
      status: 'Awaiting Payout',
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header + Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Earnings</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
          <Download size={16} />
          Export
        </button>
      </div>
      {/* 1. Overview Stats Cards (no heading) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-sm text-gray-600 mb-1.5">
            <BarChart2 size={18} />
            Today
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{overview.today.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-sm text-gray-600 mb-1.5">
            <BarChart2 size={18} />
            This Week
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{overview.thisWeek.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-sm text-gray-600 mb-1.5">
            <BarChart2 size={18} />
            This Month
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{overview.thisMonth.toLocaleString()}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2.5 text-sm text-gray-600 mb-1.5">
            <BarChart2 size={18} />
            Pending Payout
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ₹{overview.pending.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {['Today', 'This Week', 'This Month'].map((period) => (
          <button
            key={period}
            onClick={() => setActivePeriod(period)}
            className={`px-5 py-2 text-sm font-medium rounded-lg transition ${activePeriod === period
                ? 'bg-blue-600 text-white shadow'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* 2. Weekly Earnings Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <h2 className="text-lg font-semibold text-gray-800">Weekly Earnings</h2>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <Calendar size={16} />
            <span>April 14, 2024 - April 20, 2024</span>
            <Users size={16} className="ml-1" />
            <span>Drawleys</span>
          </div>
        </div>

        <div className="h-72 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" tickMargin={12} axisLine={false} />
              <YAxis stroke="#64748b" tickMargin={12} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '12px 16px'
                }}
                formatter={(value) => [`₹${value.toLocaleString()}`, 'Earnings']}
              />
              <Area
                type="monotone"
                dataKey="earnings"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorEarnings)"
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Earnings Breakdown Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Earnings Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-max">
            <thead>
              <tr className="bg-gray-50 text-gray-600">
                <th className="px-5 py-4 text-left font-medium">Date</th>
                <th className="px-5 py-4 text-left font-medium">Completed Jobs</th>
                <th className="px-5 py-4 text-left font-medium">Amount</th>
                <th className="px-5 py-4 text-left font-medium">Commission</th>
                <th className="px-5 py-4 text-left font-medium">Payout</th>
                <th className="px-5 py-4 text-left font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {breakdown.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50/70 transition-colors"
                >
                  <td className="px-5 py-4 text-gray-800">{item.date}</td>
                  <td className="px-5 py-4 text-gray-800">{item.jobs}</td>
                  <td className="px-5 py-4 text-gray-800">₹{item.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-800">₹{item.commission.toLocaleString()}</td>
                  <td className="px-5 py-4 text-gray-800">₹{item.payout.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-medium ${item.status === 'Completed'
                          ? 'bg-green-100 text-green-700 border border-green-200'
                          : 'bg-amber-100 text-amber-700 border border-amber-200'
                        }`}
                    >
                      ₹{item.total.toLocaleString()} • {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Earnings;