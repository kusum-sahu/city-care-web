// import { useState } from 'react';
// import {
//   Search,
//   Plus,
//   Ban,
//   Edit,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
// } from 'lucide-react';

// const mockUsers = [
//   {
//     id: 1,
//     name: 'Priyabrata',
//     email: 'priyabrata@gmail.com',
//     phone: '9876543210',
//     status: 'Active',
//     registered: '24 April 2024',
//   },
//   {
//     id: 2,
//     name: 'Amit',
//     email: 'amit.singh@example.com',
//     phone: '9876543209',
//     status: 'Blocked',
//     registered: '23 April 2024',
//   },
//   {
//     id: 3,
//     name: 'Anjali',
//     email: 'anjali@example.com',
//     phone: '9876543208',
//     status: 'Active',
//     registered: '22 April 2024',
//   },
//   {
//     id: 4,
//     name: 'Raj',
//     email: 'raj_sharma@example.com',
//     phone: '9876543207',
//     status: 'Active',
//     registered: '21 April 2024',
//   },
//   {
//     id: 5,
//     name: 'Sara',
//     email: 'sara@example.com',
//     phone: '9876543206',
//     status: 'Active',
//     registered: '20 April 2024',
//   },
// ];

// export default function UsersB2C() {
//   const [searchTerm, setSearchTerm] = useState('');
//   // You can later make this dynamic with real filtering
//   const [statusFilter, setStatusFilter] = useState('All');

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Users (B2C)</h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Dashboard → Users (B2C)
//             </p>
//           </div>

//           <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm">
//             <Plus size={18} />
//             Add User
//           </button>
//         </div>

//         {/* Search & Filter */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             />
//           </div>

//           <div className="relative w-48">
//             <select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               className="w-full appearance-none pl-4 pr-10 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-700"
//             >
//               <option>All</option>
//               <option>Active</option>
//               <option>Blocked</option>
//             </select>
//             <ChevronDown
//               className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//               size={18}
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
//           {/* Table Info */}
//           <div className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
//             Showing 1 to 5 of 120 entries
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-max">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Name
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Email
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Phone
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Regd. Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {mockUsers.map((user) => (
//                   <tr key={user.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-gray-900 font-medium">
//                       #{user.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900 font-medium">
//                       {user.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {user.phone}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                           user.status === 'Active'
//                             ? 'bg-emerald-100 text-emerald-700'
//                             : 'bg-amber-100 text-amber-700'
//                         }`}
//                       >
//                         {user.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {user.registered}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-md transition-colors border border-rose-200">
//                           <Ban size={14} />
//                           Ban
//                         </button>

//                         <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
//                           <Edit size={18} />
//                         </button>

//                         {user.status === 'Blocked' && (
//                           <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
//                             <Trash2 size={18} />
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
//             <div>Showing 1 to 5 of 120 entries</div>

//             <div className="flex items-center gap-2">
//               <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
//                 <ChevronLeft size={18} />
//               </button>

//               <button className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium">
//                 1
//               </button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">2</button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">...</button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">24</button>

//               <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState, useMemo } from "react";
// import {
//   Plus,
//   Search,
//   Eye,
//   Edit2,
//   Trash2,
//   ArrowLeft,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ArrowUpDown,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function UsersB2C() {
//   // Mock Users
//   const initialUsers = [
//     {
//       id: 1,
//       name: "Priyabrata",
//       email: "priyabrata@gmail.com",
//       phone: "9876543210",
//       status: "Active",
//       registered: "24 Apr 2024",
//     },
//     {
//       id: 2,
//       name: "Amit Singh",
//       email: "amit@gmail.com",
//       phone: "9876543209",
//       status: "Blocked",
//       registered: "23 Apr 2024",
//     },
//     {
//       id: 3,
//       name: "Anjali",
//       email: "anjali@gmail.com",
//       phone: "9876543208",
//       status: "Active",
//       registered: "22 Apr 2024",
//     },
//     {
//       id: 4,
//       name: "Raj Sharma",
//       email: "raj@gmail.com",
//       phone: "9876543207",
//       status: "Active",
//       registered: "21 Apr 2024",
//     },
//   ];

//   const [users, setUsers] = useState(initialUsers);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5;


//   // Filter users
//   const filteredUsers = useMemo(() => {
//     return users.filter((u) => {
//       const matchSearch =
//         u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         u.email.toLowerCase().includes(searchQuery.toLowerCase());

//       const matchStatus =
//         statusFilter === "All" || u.status === statusFilter;

//       return matchSearch && matchStatus;
//     });
//   }, [users, searchQuery, statusFilter]);

//   // Pagination
//   const paginatedUsers = useMemo(() => {
//     const start = (currentPage - 1) * itemsPerPage;
//     return filteredUsers.slice(start, start + itemsPerPage);
//   }, [filteredUsers, currentPage]);

//   const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

//   // Status change
//   const handleStatusChange = (id, newStatus) => {
//     setUsers((prev) =>
//       prev.map((u) =>
//         u.id === id ? { ...u, status: newStatus } : u
//       )
//     );
//   };

//   return (
//     <div className="space-y-6">
//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <Link
//           to="/admin"
//           className="hover:text-green-700 flex items-center gap-1"
//         >
//           <ArrowLeft size={16} /> Dashboard
//         </Link>
//         <span>{">"}</span>
//         <span className="text-gray-800 font-medium">Users (B2C)</span>
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Users (B2C)</h1>
//         <button className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition">
//           <Plus size={18} />
//           Add User
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
//         {/* Search */}
//         <div className="flex-1 min-w-[200px] relative">
//           <input
//             type="text"
//             placeholder="Search by name or email"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
//           />
//           <Search
//             size={18}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//         </div>

//         {/* Status filter */}
//         <div className="relative min-w-[160px]">
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
//           >
//             <option>All</option>
//             <option>Active</option>
//             <option>Blocked</option>
//           </select>
//           <ChevronDown
//             size={16}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   ID
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Name
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Email
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Phone
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Status
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Registered
//                 </th>
//                 <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
//                   Actions
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {paginatedUsers.length > 0 ? (
//                 paginatedUsers.map((u) => (
//                   <tr key={u.id} className="hover:bg-gray-50/50 transition">
//                     <td className="px-6 py-4 text-sm font-medium text-gray-600">
//                       #{u.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm font-medium text-gray-800">
//                       {u.name}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {u.email}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {u.phone}
//                     </td>
//                     <td className="px-6 py-4">
//                       <select
//                         value={u.status}
//                         onChange={(e) =>
//                           handleStatusChange(u.id, e.target.value)
//                         }
//                         className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none ${
//                           u.status === "Active"
//                             ? "bg-green-100 text-green-700 border-green-200"
//                             : "bg-red-100 text-red-700 border-red-200"
//                         }`}
//                       >
//                         <option>Active</option>
//                         <option>Blocked</option>
//                       </select>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {u.registered}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded">
//                           <Eye size={16} />
//                         </button>
//                         <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded">
//                           <Edit2 size={16} />
//                         </button>
//                         <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="7"
//                     className="px-6 py-8 text-center text-gray-500"
//                   >
//                     No results found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             Showing {paginatedUsers.length} of {filteredUsers.length} users
//           </p>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//               className="px-3 py-1.5 border rounded-lg text-sm"
//             >
//               <ChevronLeft size={16} />
//             </button>
//             <button className="px-3 py-1.5 bg-[#145A41] text-white rounded-lg text-sm">
//               {currentPage}
//             </button>
//             <button
//               onClick={() =>
//                 setCurrentPage((p) => Math.min(p + 1, totalPages))
//               }
//               className="px-3 py-1.5 border rounded-lg text-sm"
//             >
//               <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Ban,
  Edit,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const initialUsers = [
  {
    id: 1,
    name: "Priyabrata",
    email: "priyabrata@gmail.com",
    phone: "9876543210",
    status: "Active",
    registered: "24 Apr 2024",
  },
  {
    id: 2,
    name: "Amit",
    email: "amit.singh@example.com",
    phone: "9876543209",
    status: "Blocked",
    registered: "23 Apr 2024",
  },
  {
    id: 3,
    name: "Anjali",
    email: "anjali@example.com",
    phone: "9876543208",
    status: "Active",
    registered: "22 Apr 2024",
  },
  {
    id: 4,
    name: "Raj",
    email: "raj@example.com",
    phone: "9876543207",
    status: "Active",
    registered: "21 Apr 2024",
  },
  {
    id: 5,
    name: "Sara",
    email: "sara@example.com",
    phone: "9876543206",
    status: "Active",
    registered: "20 Apr 2024",
  },
];

export default function UsersB2C() {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // pagination (SAME AS SERVICES)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: 'Active'
  });

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, status: newStatus } : user
    ));
  };

  // Modal handlers
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: 'Active'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
      registered: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      })
    };
    setUsers([...users, newUser]);
    closeModal();
  };

  // filter logic
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [users, searchTerm, statusFilter]);

  // pagination slice
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span>{">"}</span>
        <span className="text-gray-800 font-medium">Users (B2C)</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users (B2C)</h1>
        <button
          onClick={openModal}
          className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap gap-4">
        <div className="flex-1 relative min-w-[200px]">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Regd. Date</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">
                      #{user.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.phone}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.status}
                        onChange={(e) => handleStatusChange(user.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.registered}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors">
                          <Eye size={16} />
                        </button>
                        <button className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors">
                          <Edit size={16} />
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
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination – SAME AS SERVICES */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
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
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Add New User</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-md transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="Active">Active</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-[#145A41] text-white rounded-lg hover:bg-[#0E3F2E] transition-colors"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
