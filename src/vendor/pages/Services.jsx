// import { useState, useMemo } from "react";
// import {
//   Plus,
//   Search,
//   ArrowLeft,
//   ArrowUpDown,
//   Eye,
//   Edit2,
//   Trash2,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// /* ================= MOCK DATA ================= */
// const initialServices = [
//   {
//     id: "#01",
//     category: "Electrical",
//     service: "Fan Installation",
//     location: "Bhubaneswar",
//     price: 299,
//     status: "Active",
//   },
//   {
//     id: "#02",
//     category: "Priest",
//     service: "Home Puja Ceremony",
//     location: "Cuttack",
//     price: 1500,
//     status: "Active",
//   },
//   {
//     id: "#03",
//     category: "Driver",
//     service: "Taxi Service",
//     location: "Bhubaneswar",
//     price: "100/hour",
//     status: "Active",
//   },
//   {
//     id: "#04",
//     category: "AC Repair",
//     service: "AC Repairing",
//     location: "Cuttack",
//     price: 499,
//     status: "Active",
//   },
//   {
//     id: "#05",
//     category: "Beauty Spa",
//     service: "Home Massage",
//     location: "Puri",
//     price: 999,
//     status: "Inactive",
//   },
// ];

// export default function Services() {
//   const [services] = useState(initialServices);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("All");
//   const [page, setPage] = useState(1);

//   const perPage = 5;

//   /* ================= FILTER ================= */
//   const filtered = useMemo(() => {
//     return services.filter((s) => {
//       const matchSearch =
//         s.service.toLowerCase().includes(search.toLowerCase()) ||
//         s.category.toLowerCase().includes(search.toLowerCase());
//       const matchStatus = status === "All" || s.status === status;
//       return matchSearch && matchStatus;
//     });
//   }, [services, search, status]);

//   const totalPages = Math.ceil(filtered.length / perPage);
//   const paginated = filtered.slice((page - 1) * perPage, page * perPage);

//   return (
//     <div className="space-y-6">

//       {/* Breadcrumb */}
//       <div className="flex items-center gap-2 text-sm text-gray-500">
//         <Link to="/vendor" className="flex items-center gap-1 hover:text-green-700">
//           <ArrowLeft size={16} /> Dashboard
//         </Link>
//         <span>{">"}</span>
//         <span className="text-gray-800 font-medium">Services</span>
//       </div>

//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold text-gray-800">Services</h1>
//         <button className="flex items-center gap-2 bg-[#145A41] text-white px-5 py-2.5 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm">
//           <Plus size={18} />
//           Add Service
//         </button>
//       </div>

//       {/* Filters */}
//       <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
//         <select className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm">
//           <option>All Categories</option>
//         </select>

//         <select
//           value={status}
//           onChange={(e) => setStatus(e.target.value)}
//           className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm"
//         >
//           <option>All</option>
//           <option>Active</option>
//           <option>Inactive</option>
//         </select>

//         <select className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm">
//           <option>All Locations</option>
//         </select>

//         <div className="flex-1 relative min-w-[200px]">
//           <input
//             type="text"
//             placeholder="Search by Service Name"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-green-500"
//           />
//           <Search
//             size={18}
//             className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-100">
//               <tr>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Service</th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Location</th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">
//                   <div className="flex items-center gap-1">
//                     Price <ArrowUpDown size={12} />
//                   </div>
//                 </th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
//                 <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Actions</th>
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-100">
//               {paginated.map((s) => (
//                 <tr key={s.id} className="hover:bg-gray-50/50 transition">
//                   <td className="px-6 py-4 text-sm text-gray-600">{s.id}</td>
//                   <td className="px-6 py-4 font-medium">{s.category}</td>
//                   <td className="px-6 py-4">{s.service}</td>
//                   <td className="px-6 py-4">{s.location}</td>
//                   <td className="px-6 py-4 font-medium">₹{s.price}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${
//                         s.status === "Active"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-red-100 text-red-700"
//                       }`}
//                     >
//                       {s.status}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="flex items-center gap-2">
//                       <button className="p-1.5 border border-blue-200 rounded-md text-blue-600 hover:bg-blue-50">
//                         <Eye size={16} />
//                       </button>
//                       <button className="p-1.5 border border-green-200 rounded-md text-green-600 hover:bg-green-50">
//                         <Edit2 size={16} />
//                       </button>
//                       <button className="p-1.5 border border-red-200 rounded-md text-red-600 hover:bg-red-50">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}

//               {paginated.length === 0 && (
//                 <tr>
//                   <td colSpan="7" className="py-8 text-center text-gray-500">
//                     No services found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination – SAME AS ADMIN */}
//         <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
//           <p className="text-sm text-gray-500">
//             Showing {(page - 1) * perPage + 1} to{" "}
//             {Math.min(page * perPage, filtered.length)} of {filtered.length}
//           </p>

//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setPage((p) => Math.max(p - 1, 1))}
//               disabled={page === 1}
//               className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40"
//             >
//               <ChevronLeft size={16} /> Prev
//             </button>

//             <button className="w-8 h-8 bg-[#145A41] text-white rounded-lg text-sm">
//               {page}
//             </button>

//             <button
//               onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
//               disabled={page === totalPages}
//               className="flex items-center gap-1 px-3 py-1.5 border rounded-lg text-sm disabled:opacity-40"
//             >
//               Next <ChevronRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { Clock, Plus, Zap ,X} from "lucide-react";

const Services = () => {
  const servicesData = {
    Electrician: [
      { id: 1, name: "Switch & Socket Installation", price: 249, duration: "30 mins", active: true },
      { id: 2, name: "Fan Installation", price: 349, duration: "40 mins", active: true },
      { id: 3, name: "AC Switchboard Installation", price: 399, duration: "45 mins", active: true },
      { id: 4, name: "MCB Repair", price: 449, duration: "30 mins", active: false },
      { id: 5, name: "Internal Wiring", price: 599, duration: "1 hr", active: true, note: "Extra wiring charges may apply" },
    ],

    Priest: [
      { id: 6, name: "Wedding Pooja", price: 4999, duration: "2 hrs", active: true },
      { id: 7, name: "Griha Pravesh", price: 2999, duration: "1.5 hrs", active: true },
      { id: 8, name: "Satyanarayan Katha", price: 1999, duration: "1 hr", active: false },
    ],

    Beautician: [
      { id: 9, name: "Bridal Makeup", price: 6999, duration: "3 hrs", active: true },
      { id: 10, name: "Facial", price: 999, duration: "45 mins", active: true },
      { id: 11, name: "Hair Spa", price: 1299, duration: "1 hr", active: false },
    ],

    Driver: [
      { id: 12, name: "Car Driver (8 hrs)", price: 999, duration: "8 hrs", active: true },
      { id: 13, name: "Bike Driver", price: 499, duration: "4 hrs", active: true },
      { id: 14, name: "Truck Driver", price: 2499, duration: "Full Day", active: false },
    ],

    Plumber: [
      { id: 15, name: "Tap Installation", price: 249, duration: "30 mins", active: true },
      { id: 16, name: "Pipe Leakage Repair", price: 399, duration: "45 mins", active: true },
      { id: 17, name: "Bathroom Fitting", price: 899, duration: "1 hr", active: false },
    ],

    Physiotherapy: [
      { id: 18, name: "Home Visit Physio", price: 799, duration: "1 hr", active: true },
      { id: 19, name: "Back Pain Therapy", price: 999, duration: "1 hr", active: true },
      { id: 20, name: "Post Surgery Rehab", price: 1499, duration: "1.5 hr", active: false },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Electrician");
  const [services, setServices] = useState(servicesData["Electrician"]);
  const [showModal, setShowModal] = useState(false);
   const [currentService, setCurrentService] = useState(null);
  const [noteText, setNoteText] = useState("");

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setServices(servicesData[category]);
  };

  const toggleService = (id) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? { ...service, active: !service.active }
          : service
      )
    );
  };

  const openNoteModal = (service) => {
    setCurrentService(service);
    setNoteText(service.note || "");
    setShowModal(true);
  };

  const saveNote = () => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === currentService.id
          ? { ...service, note: noteText }
          : service
      )
    );
    setShowModal(false);
  };

  return (
    <div className="space-y-6">

      {/* ===== PAGE TITLE ===== */}
      <h2 className="text-2xl font-bold text-gray-800">
        Services
      </h2>

      {/* ===== FILTER BAR ===== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">

        {/* Category Dropdown */}
        <div className="flex items-center gap-3">
          <Zap size={18} className="text-yellow-500" />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="custom-select border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/30"
          >
            {Object.keys(servicesData).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <div className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
            Total Services {services.length}
          </div>

          {/* <button
            className="flex items-center gap-2 text-white px-4 py-2 rounded-lg"
            style={{ backgroundColor: "#1b7858" }}
          >
            <Plus size={16} /> Add New Service
          </button> */}
        </div>
      </div>

      {/* ===== SERVICES LIST ===== */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">

        <div className="px-6 py-4 border-b border-gray-100 font-semibold text-gray-700">
          {selectedCategory} Services
        </div>

        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex items-center justify-between px-6 py-4 ${index !== services.length - 1
                ? "border-b border-gray-100"
                : ""
              }`}
          >

            {/* Left Side */}
            <div>
              <h4 className="font-semibold text-gray-800">
                {service.name}
              </h4>

              <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                <span className="font-medium text-gray-800">
                  ₹ {service.price}
                </span>

                <span className="flex items-center gap-1">
                  <Clock size={14} /> {service.duration}
                </span>
              </div>

              {service.note && (
                <p className="text-xs text-gray-500 mt-2">
                  Note: {service.note}
                </p>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">

              <span className="text-xs text-gray-500">
                {service.active ? "ON" : "OFF"}
              </span>

              <div
                onClick={() => toggleService(service.id)}
                className={`relative w-12 h-6 rounded-full cursor-pointer transition ${service.active
                    ? "bg-green-600"
                    : "bg-gray-300"
                  }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${service.active
                      ? "left-7"
                      : "left-1"
                    }`}
                ></div>
              </div>

             <button
                onClick={() => openNoteModal(service)}
                className="px-4 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                {service.note ? "Edit Note" : "Add Note"}
              </button>
            </div>

          </div>
        ))}
      </div>
{/* ===== NOTE MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl w-96 relative space-y-4">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <h3 className="font-semibold text-gray-800 text-lg">
              Add Note
            </h3>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write short note..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500/30"
            />

            <button
              onClick={saveNote}
              className="w-full text-white py-2 rounded-lg"
              style={{ backgroundColor: "#1b7858" }}
            >
              Save Note
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
