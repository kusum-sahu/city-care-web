// import { useState } from 'react';
// import {
//   Search,
//   Edit,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
//   CreditCard,
//   IndianRupee,
//   Wallet,
//   Building,
// } from 'lucide-react';

// const mockPayments = [
//   {
//     id: 1,
//     orderId: 'ORD1021',
//     user: 'Priyabrata',
//     method: 'UPI',
//     methodIcon: <Wallet size={16} />,
//     status: 'Pending',
//     date: '24 Apr 2024, 10:30 AM',
//   },
//   {
//     id: 2,
//     orderId: 'ORD1020',
//     user: 'Ashok Sharma',
//     method: 'Credit Card',
//     methodIcon: <CreditCard size={16} />,
//     status: 'Success',
//     date: '23 Apr 2024, 4:15 PM',
//   },
//   {
//     id: 3,
//     orderId: 'ORD1019',
//     user: 'Amit Singh',
//     method: 'Credit Card',
//     methodIcon: <CreditCard size={16} />,
//     status: 'Success',
//     date: '22 Apr 2024, 4:15 PM',
//   },
//   {
//     id: 4,
//     orderId: 'ORD1018',
//     user: 'Ramesh Kumar',
//     method: 'Cash',
//     methodIcon: <IndianRupee size={16} />,
//     status: 'Failed',
//     date: '21 Apr 2024, 4:15 PM',
//   },
//   {
//     id: 5,
//     orderId: 'ORD1017',
//     user: 'Ashok Electricals',
//     method: 'UPI',
//     methodIcon: <Wallet size={16} />,
//     status: 'Success',
//     date: '21 Apr 2024, 7:00 PM',
//   },
//   {
//     id: 6,
//     orderId: 'ORD1018',
//     user: 'Ganesh Provision',
//     method: 'Credit Card',
//     methodIcon: <CreditCard size={16} />,
//     status: 'Success',
//     date: '21 Apr 2024, 4:15 PM',
//   },
//   {
//     id: 7,
//     orderId: 'ORD1017',
//     user: 'Anjali',
//     method: 'Cash',
//     methodIcon: <IndianRupee size={16} />,
//     status: 'Failed',
//     date: '21 Apr 2024, 4:15 PM',
//   },
// ];

// export default function Payments() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [activeTab, setActiveTab] = useState('All');

//   const tabs = ['All', 'Pending', 'Success', 'Failed'];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="p-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
//             <p className="text-sm text-gray-500 mt-1">Payments</p>
//           </div>

//           {/* Note: + Add Product seems like a copy-paste mistake in screenshot – changed to + Add Payment (you can adjust) */}
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors shadow-sm">
//             <IndianRupee size={18} />
//             Add Payment
//           </button>
//         </div>

//         {/* Search & Tabs */}
//         <div className="mb-6 flex flex-col sm:flex-row gap-4">
//           <div className="relative flex-1">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search payments..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
//             />
//           </div>

//           <div className="flex gap-2 flex-wrap">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                   activeTab === tab
//                     ? 'bg-emerald-600 text-white'
//                     : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-200">
//           {/* Table Info */}
//           <div className="px-6 py-4 border-b border-gray-200 text-sm text-gray-600">
//             Showing 1 to 5 of 183 entries
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-max">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Order ID
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     User
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Method
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Date
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {mockPayments.map((payment) => (
//                   <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-6 py-4 text-sm text-gray-900 font-medium">
//                       #{payment.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900 font-medium">
//                       #{payment.orderId}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {payment.user}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2 text-sm text-gray-700">
//                         {payment.methodIcon}
//                         {payment.method}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
//                           payment.status === 'Success'
//                             ? 'bg-emerald-100 text-emerald-700'
//                             : payment.status === 'Pending'
//                             ? 'bg-amber-100 text-amber-700'
//                             : 'bg-rose-100 text-rose-700'
//                         }`}
//                       >
//                         {payment.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {payment.date}
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="flex items-center gap-2">
//                         <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors">
//                           <Edit size={18} />
//                         </button>

//                         {payment.status === 'Failed' || payment.status === 'Pending' ? (
//                           <button className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
//                             <Trash2 size={18} />
//                           </button>
//                         ) : (
//                           <button className="p-1.5 text-gray-400 cursor-not-allowed">
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
//             <div>Showing 1 to 5 of 183 entries</div>

//             <div className="flex items-center gap-2">
//               <button className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
//                 <ChevronLeft size={18} />
//               </button>

//               <button className="px-4 py-2 rounded-md bg-emerald-600 text-white font-medium">
//                 1
//               </button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">2</button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">...</button>
//               <button className="px-4 py-2 rounded-md hover:bg-gray-50">37</button>

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


import React, { useState, useMemo } from "react";
import {
  IndianRupee,
  Search,
  CreditCard,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const initialPayments = [
  {
    id: 1,
    orderId: "ORD1021",
    user: "Priyabrata",
    method: "UPI",
    methodIcon: <Wallet size={16} />,
    status: "Pending",
    date: "24 Apr 2024, 10:30 AM",
  },
  {
    id: 2,
    orderId: "ORD1020",
    user: "Ashok Sharma",
    method: "Credit Card",
    methodIcon: <CreditCard size={16} />,
    status: "Success",
    date: "23 Apr 2024, 4:15 PM",
  },
  {
    id: 3,
    orderId: "ORD1019",
    user: "Amit Singh",
    method: "Credit Card",
    methodIcon: <CreditCard size={16} />,
    status: "Success",
    date: "22 Apr 2024, 4:15 PM",
  },
  {
    id: 4,
    orderId: "ORD1018",
    user: "Ramesh Kumar",
    method: "Cash",
    methodIcon: <IndianRupee size={16} />,
    status: "Failed",
    date: "21 Apr 2024, 4:15 PM",
  },
  {
    id: 5,
    orderId: "ORD1017",
    user: "Ganesh Provision",
    method: "UPI",
    methodIcon: <Wallet size={16} />,
    status: "Success",
    date: "21 Apr 2024, 7:00 PM",
  },
  {
    id: 6,
    orderId: "ORD1016",
    user: "Anjali",
    method: "Cash",
    methodIcon: <IndianRupee size={16} />,
    status: "Failed",
    date: "20 Apr 2024, 5:45 PM",
  },
];

export default function Payments() {
  const [payments] = useState(initialPayments);

  // filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");

  // pagination (SAME AS PRODUCTS)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const statuses = ["All Status", "Pending", "Success", "Failed"];

  // filtered data
  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchSearch =
        payment.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        payment.orderId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus =
        selectedStatus === "All Status" || payment.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [payments, searchQuery, selectedStatus]);

  // pagination slice
  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span>{">"}</span>
        <span className="text-gray-800 font-medium">Payments</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Payments</h1>
        <button className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition">
          <IndianRupee size={18} />
          Add Payment
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[160px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by User or Order ID"
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

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {paginatedPayments.length > 0 ? (
                paginatedPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      #{payment.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {payment.orderId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {payment.user}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        {payment.methodIcon}
                        {payment.method}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          payment.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : payment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {payment.date}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination – SAME AS PRODUCTS */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredPayments.length)} of{" "}
            {filteredPayments.length} Payments
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
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
