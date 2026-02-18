// import React, { useState } from "react";
// import {
//   Search,
//   MapPin,
//   Clock,
//   Navigation,
//   CheckCircle,
//   XCircle,
//   X,
// } from "lucide-react";

// const Booking = () => {
//   const [activeTab, setActiveTab] = useState("All");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [bookings, setBookings] = useState([
//     {
//       id: 1,
//       customer: "Priya Verma",
//       service: "AC Repair",
//       date: "Today",
//       time: "11:00 AM",
//       distance: "2.3 km",
//       amount: 299,
//       status: "new",
//       startOtp: "1111",
//       endOtp: "2222",
//       lat: 20.2961,
//       lng: 85.8245,
//       avatar: "https://i.pravatar.cc/100?img=5",
//     },
//     {
//       id: 2,
//       customer: "Rahul Singh",
//       service: "Plumbing",
//       date: "Today",
//       time: "1:00 PM",
//       distance: "1.8 km",
//       amount: 499,
//       status: "assigned",
//       startOtp: "3333",
//       endOtp: "4444",
//       lat: 20.30,
//       lng: 85.82,
//       avatar: "https://i.pravatar.cc/100?img=8",
//     },
//     {
//       id: 3,
//       customer: "Neha Sharma",
//       service: "House Cleaning",
//       date: "Yesterday",
//       time: "4:00 PM",
//       distance: "3.1 km",
//       amount: 390,
//       status: "inprogress",
//       startOtp: "5555",
//       endOtp: "6666",
//       lat: 20.31,
//       lng: 85.83,
//       avatar: "https://i.pravatar.cc/100?img=9",
//     },
//     {
//       id: 4,
//       customer: "Sandeep Mishra",
//       service: "AC Service",
//       date: "Yesterday",
//       time: "3:00 PM",
//       distance: "4.1 km",
//       amount: 450,
//       status: "completed",
//       startOtp: "7777",
//       endOtp: "8888",
//       lat: 20.32,
//       lng: 85.81,
//       avatar: "https://i.pravatar.cc/100?img=7",
//     },
//     {
//       id: 5,
//       customer: "Nisha Sharma",
//       service: "Salon at Home",
//       date: "Today",
//       time: "5:30 PM",
//       distance: "2.2 km",
//       amount: 390,
//       status: "cancelled",
//       startOtp: "9999",
//       endOtp: "0000",
//       lat: 20.29,
//       lng: 85.84,
//       avatar: "https://i.pravatar.cc/100?img=12",
//     },
//     {
//       id: 6,
//       customer: "Amit Kumar",
//       service: "Electric Repair",
//       date: "Tomorrow",
//       time: "10:00 AM",
//       distance: "5.5 km",
//       amount: 650,
//       status: "new",
//       startOtp: "1212",
//       endOtp: "3434",
//       lat: 20.28,
//       lng: 85.85,
//       avatar: "https://i.pravatar.cc/100?img=15",
//     },
//   ]);

//   /* ================= OTP STATES ================= */
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otpType, setOtpType] = useState("");
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [enteredOtp, setEnteredOtp] = useState("");

//   /* ================= FILTER ================= */
//   const filteredBookings = bookings
//     .filter((b) =>
//       searchQuery.trim() === ""
//         ? true
//         : b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           b.service.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter(
//       (b) =>
//         activeTab === "All" ||
//         b.status.toLowerCase() === activeTab.toLowerCase()
//     );

//   /* ================= STATUS STYLE ================= */
//   const getStatusStyle = (status) => {
//     const styles = {
//       new: "bg-yellow-100 text-yellow-700",
//       assigned: "bg-blue-100 text-blue-700",
//       inprogress: "bg-purple-100 text-purple-700",
//       completed: "bg-green-100 text-green-700",
//       cancelled: "bg-red-100 text-red-700",
//     };
//     return styles[status];
//   };

//   /* ================= ACTIONS ================= */
//   const handleAccept = (id) => {
//     setBookings((prev) =>
//       prev.map((b) =>
//         b.id === id ? { ...b, status: "assigned" } : b
//       )
//     );
//   };

//   const openOtpModal = (booking, type) => {
//     setCurrentBooking(booking);
//     setOtpType(type);
//     setEnteredOtp("");
//     setShowOtpModal(true);
//   };

//   const verifyOtp = () => {
//     if (!currentBooking) return;

//     const correctOtp =
//       otpType === "start"
//         ? currentBooking.startOtp
//         : currentBooking.endOtp;

//     if (enteredOtp === correctOtp) {
//       setBookings((prev) =>
//         prev.map((b) =>
//           b.id === currentBooking.id
//             ? {
//                 ...b,
//                 status:
//                   otpType === "start"
//                     ? "inprogress"
//                     : "completed",
//               }
//             : b
//         )
//       );
//       setShowOtpModal(false);
//     } else {
//       alert("Invalid OTP ❌");
//     }
//   };

//   const handleNavigate = (booking) => {
//     if (!navigator.geolocation) {
//       alert("Geolocation not supported");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition((position) => {
//       const currentLat = position.coords.latitude;
//       const currentLng = position.coords.longitude;

//       const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${booking.lat},${booking.lng}`;

//       window.open(url, "_blank");
//     });
//   };

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row justify-between gap-4">
//         <h2 className="text-2xl font-bold text-gray-800">
//           Bookings
//         </h2>

//         <div className="relative w-full sm:w-80">
//           <Search
//             size={16}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search bookings..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
//           />
//         </div>
//       </div>

//       {/* TABS */}
//       <div className="flex flex-wrap gap-2">
//         {["All", "new", "assigned", "inprogress", "completed", "cancelled"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-1.5 rounded-full text-sm capitalize ${
//               activeTab === tab
//                 ? "bg-green-700 text-white"
//                 : "bg-white border border-gray-300 text-gray-600"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {filteredBookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
//           >
//             {/* TOP */}
//             <div className="flex justify-between">
//               <div className="flex gap-3">
//                 <img
//                   src={booking.avatar}
//                   alt=""
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <h4 className="font-semibold text-gray-800">
//                     {booking.customer}
//                   </h4>
//                   <p className="text-sm text-gray-500">
//                     {booking.service}
//                   </p>

//                   <div className="flex gap-4 text-xs text-gray-500 mt-1">
//                     <span className="flex items-center gap-1">
//                       <Clock size={12} />
//                       {booking.date}, {booking.time}
//                     </span>
//                     <span className="flex items-center gap-1">
//                       <MapPin size={12} />
//                       {booking.distance}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold text-gray-800">
//                   ₹{booking.amount}
//                 </p>
//                 <span
//                   className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
//                     booking.status
//                   )}`}
//                 >
//                   {booking.status}
//                 </span>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-4">

//               {booking.status === "new" && (
//                 <>
//                   <button
//                     onClick={() => handleAccept(booking.id)}
//                     className="flex-1 py-2 rounded-lg text-white bg-green-700"
//                   >
//                     Accept
//                   </button>
//                   <button className="flex-1 py-2 rounded-lg bg-gray-200">
//                     Decline
//                   </button>
//                 </>
//               )}

//               {booking.status === "assigned" && (
//                 <>
//                   <button
//                     onClick={() => handleNavigate(booking)}
//                     className="flex-1 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-1"
//                   >
//                     <Navigation size={14} /> Navigate
//                   </button>
//                   <button
//                     onClick={() => openOtpModal(booking, "start")}
//                     className="flex-1 py-2 rounded-lg text-white bg-green-700"
//                   >
//                     Start
//                   </button>
//                 </>
//               )}

//               {booking.status === "inprogress" && (
//                 <>
//                   <button
//                     onClick={() => handleNavigate(booking)}
//                     className="flex-1 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-1"
//                   >
//                     <Navigation size={14} /> Navigate
//                   </button>
//                   <button
//                     onClick={() => openOtpModal(booking, "end")}
//                     className="flex-1 py-2 rounded-lg text-white bg-green-700"
//                   >
//                     Finish
//                   </button>
//                 </>
//               )}

//               {booking.status === "completed" && (
//                 <div className="flex-1 py-2 text-center bg-green-50 text-green-700 rounded-lg text-sm">
//                   <CheckCircle size={14} className="inline mr-1" />
//                   Job Completed
//                 </div>
//               )}

//               {booking.status === "cancelled" && (
//                 <div className="flex-1 py-2 text-center bg-red-50 text-red-700 rounded-lg text-sm">
//                   <XCircle size={14} className="inline mr-1" />
//                   Cancelled
//                 </div>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* OTP MODAL */}
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-xl w-80 relative space-y-4">
//             <button
//               onClick={() => setShowOtpModal(false)}
//               className="absolute top-3 right-3 text-gray-400"
//             >
//               <X size={18} />
//             </button>

//             <h3 className="font-semibold text-lg">
//               Enter {otpType === "start" ? "Start" : "End"} OTP
//             </h3>

//             <input
//               type="text"
//               value={enteredOtp}
//               onChange={(e) => setEnteredOtp(e.target.value)}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2"
//               placeholder="Enter OTP"
//             />

//             <button
//               onClick={verifyOtp}
//               className="w-full py-2 bg-green-700 text-white rounded-lg"
//             >
//               Verify
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;

// import React, { useState, useEffect } from "react";
// import {
//   Search,
//   MapPin,
//   Clock,
//   Navigation,
//   CheckCircle,
//   XCircle,
//   X,
// } from "lucide-react";

// import {
//   getBookings,
//   acceptBooking,
//   verifyStartOtp,
//   verifyEndOtp,
// } from "../../services/bookingService";

// const Booking = () => {
//   const [activeTab, setActiveTab] = useState("new");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [otpType, setOtpType] = useState("");
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [enteredOtp, setEnteredOtp] = useState("");

//   /* ================= TEMP VENDOR ID ================= */
//   const vendorId = 6; // 🔥 later replace from auth context

//   /* ================= FETCH BOOKINGS ================= */

//   const fetchBookings = async () => {
//     try {
//       const data = await getBookings(vendorId);

//       const formatted = data.map((b) => ({
//         id: b.id,
//         customer: "Customer",
//         service: `Service ID: ${b.service_id}`,
//         date: new Date(b.booking_start).toLocaleDateString(),
//         time: new Date(b.booking_start).toLocaleTimeString(),
//         amount: b.total_amount,
//         status:
//           b.booking_status === "searching"
//             ? "new"
//             : b.booking_status,
//         startOtp: b.start_otp,
//         endOtp: b.end_otp,
//         lat: b.latitude,
//         lng: b.longitude,
//       }));

//       setBookings(formatted);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();

//     const interval = setInterval(() => {
//       fetchBookings();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   /* ================= FILTER ================= */

//   const filteredBookings = bookings
//     .filter((b) =>
//       searchQuery.trim() === ""
//         ? true
//         : b.customer.toLowerCase().includes(searchQuery.toLowerCase())
//     )
//     .filter((b) =>
//       activeTab === "all"
//         ? true
//         : b.status.toLowerCase() === activeTab
//     );

//   /* ================= STATUS STYLE ================= */

//   const getStatusStyle = (status) => {
//     const styles = {
//       new: "bg-yellow-100 text-yellow-700",
//       assigned: "bg-blue-100 text-blue-700",
//       in_progress: "bg-purple-100 text-purple-700",
//       completed: "bg-green-100 text-green-700",
//       cancelled: "bg-red-100 text-red-700",
//     };
//     return styles[status] || "bg-gray-100";
//   };

//   /* ================= ACCEPT ================= */

//   const handleAccept = async (id) => {
//     try {
//       await acceptBooking(id, vendorId);
//       fetchBookings();
//     } catch (err) {
//       alert("Already accepted by another vendor");
//     }
//   };

//   /* ================= OTP ================= */

//   const openOtpModal = (booking, type) => {
//     setCurrentBooking(booking);
//     setOtpType(type);
//     setEnteredOtp("");
//     setShowOtpModal(true);
//   };

//   const verifyOtp = async () => {
//     try {
//       if (otpType === "start") {
//         await verifyStartOtp(currentBooking.id, enteredOtp);
//       } else {
//         await verifyEndOtp(currentBooking.id, enteredOtp);
//       }

//       setShowOtpModal(false);
//       fetchBookings();
//     } catch (err) {
//       alert("Invalid OTP");
//     }
//   };

//   /* ================= NAVIGATION ================= */

//   const handleNavigate = (booking) => {
//     if (!booking.lat || !booking.lng) {
//       alert("Location not available");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition((position) => {
//       const currentLat = position.coords.latitude;
//       const currentLng = position.coords.longitude;

//       const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLng}&destination=${booking.lat},${booking.lng}`;

//       window.open(url, "_blank");
//     });
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="space-y-6">

//       <h2 className="text-2xl font-bold text-gray-800">
//         Vendor Bookings
//       </h2>

//       {/* TABS */}
//       <div className="flex gap-2">
//         {["new", "assigned", "in_progress", "completed"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-1 rounded-full text-sm capitalize ${
//               activeTab === tab
//                 ? "bg-green-700 text-white"
//                 : "bg-white border"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* LOADING */}
//       {loading && <p>Loading bookings...</p>}

//       {/* CARDS */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {filteredBookings.map((booking) => (
//           <div
//             key={booking.id}
//             className="bg-white border rounded-xl p-4 shadow-sm"
//           >
//             <div className="flex justify-between">
//               <div>
//                 <h4 className="font-semibold">
//                   {booking.customer}
//                 </h4>
//                 <p className="text-sm text-gray-500">
//                   {booking.service}
//                 </p>

//                 <div className="flex gap-4 text-xs mt-1 text-gray-500">
//                   <span className="flex items-center gap-1">
//                     <Clock size={12} />
//                     {booking.date}, {booking.time}
//                   </span>
//                 </div>
//               </div>

//               <div className="text-right">
//                 <p className="font-bold">₹{booking.amount}</p>
//                 <span
//                   className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
//                     booking.status
//                   )}`}
//                 >
//                   {booking.status}
//                 </span>
//               </div>
//             </div>

//             {/* ACTIONS */}
//             <div className="flex gap-3 mt-4">

//               {booking.status === "new" && (
//                 <button
//                   onClick={() => handleAccept(booking.id)}
//                   className="flex-1 py-2 bg-green-700 text-white rounded-lg"
//                 >
//                   Accept
//                 </button>
//               )}

//               {booking.status === "assigned" && (
//                 <>
//                   <button
//                     onClick={() => handleNavigate(booking)}
//                     className="flex-1 py-2 bg-blue-600 text-white rounded-lg"
//                   >
//                     Navigate
//                   </button>
//                   <button
//                     onClick={() => openOtpModal(booking, "start")}
//                     className="flex-1 py-2 bg-green-700 text-white rounded-lg"
//                   >
//                     Start
//                   </button>
//                 </>
//               )}

//               {booking.status === "in_progress" && (
//                 <button
//                   onClick={() => openOtpModal(booking, "end")}
//                   className="flex-1 py-2 bg-green-700 text-white rounded-lg"
//                 >
//                   Finish
//                 </button>
//               )}

//               {booking.status === "completed" && (
//                 <div className="flex-1 text-center text-green-700">
//                   Completed
//                 </div>
//               )}

//             </div>
//           </div>
//         ))}
//       </div>

//       {/* OTP MODAL */}
//       {showOtpModal && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
//           <div className="bg-white p-6 rounded-xl w-80">
//             <h3 className="mb-4 font-semibold">
//               Enter OTP
//             </h3>

//             <input
//               type="text"
//               value={enteredOtp}
//               onChange={(e) => setEnteredOtp(e.target.value)}
//               className="w-full border px-3 py-2 rounded-lg"
//             />

//             <button
//               onClick={verifyOtp}
//               className="mt-4 w-full py-2 bg-green-700 text-white rounded-lg"
//             >
//               Verify
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Booking;


import React, { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Clock,
  Navigation,
  CheckCircle,
  XCircle,
  X,
  Phone,
} from "lucide-react";

import {
  getBookings,
  acceptBooking,
  verifyStartOtp,
  verifyEndOtp,
  declineBooking,   
} from "../../services/bookingService";

const Booking = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpType, setOtpType] = useState("");
  const [currentBooking, setCurrentBooking] = useState(null);
  const [enteredOtp, setEnteredOtp] = useState("");

  /* ================= FETCH BOOKINGS ================= */

  const fetchBookings = async () => {
    try {
      const data = await getBookings();

      const formatted = data.map((b) => ({
        id: b.id,
        customer: b.customer_name || "Customer",
        mobile: b.customer_mobile,
        avatar: b.profile_image
          ? `http://localhost:5000/uploads/${b.profile_image}`
          : "https://i.pravatar.cc/100",
        service: `Service ID: ${b.service_id}`,
        date: new Date(b.booking_start).toLocaleDateString(),
        time: new Date(b.booking_start).toLocaleTimeString(),
        amount: b.total_amount,
        status:
          b.booking_status === "searching"
            ? "new"
            : b.booking_status,
        startOtp: b.start_otp,
        endOtp: b.end_otp,
        lat: b.latitude,
        lng: b.longitude,
      }));

      setBookings(formatted);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBookings();
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  /* ================= FILTER ================= */

  const filteredBookings = bookings
    .filter((b) =>
      searchQuery.trim() === ""
        ? true
        : b.customer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (b) =>
        activeTab === "All" ||
        b.status.toLowerCase() === activeTab.toLowerCase()
    );

  /* ================= STATUS STYLE ================= */

  const getStatusStyle = (status) => {
    const styles = {
      new: "bg-yellow-100 text-yellow-700",
      assigned: "bg-blue-100 text-blue-700",
      in_progress: "bg-purple-100 text-purple-700",
      completed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };
    return styles[status] || "bg-gray-100";
  };

  /* ================= ACCEPT ================= */

  const handleAccept = async (id) => {
    try {
      await acceptBooking(id);
      fetchBookings();
    } catch (err) {
      alert("Already accepted by another vendor");
    }
  };

  const handleDecline = async (id) => {
    try {
      await declineBooking(id);
      fetchBookings();
    } catch (err) {
      alert("Error declining booking");
    }
  };


  /* ================= OTP ================= */

  const openOtpModal = (booking, type) => {
    setCurrentBooking(booking);
    setOtpType(type);
    setEnteredOtp("");
    setShowOtpModal(true);
  };

  const verifyOtp = async () => {
    try {
      if (otpType === "start") {
        await verifyStartOtp(currentBooking.id, enteredOtp);
      } else {
        await verifyEndOtp(currentBooking.id, enteredOtp);
      }

      setShowOtpModal(false);
      fetchBookings();
    } catch (err) {
      alert("Invalid OTP ❌");
    }
  };

  /* ================= NAVIGATION ================= */

  const handleNavigate = (booking) => {
    if (!booking.lat || !booking.lng) {
      alert("Location not available");
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${position.coords.latitude},${position.coords.longitude}&destination=${booking.lat},${booking.lng}`;
      window.open(url, "_blank");
    });
  };

  /* ================= CALL ================= */

  const handleCall = (mobile) => {
    if (!mobile) {
      alert("Phone number not available");
      return;
    }
    window.open(`tel:${mobile}`);
  };

  /* ================= UI ================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Bookings
        </h2>

        <div className="relative w-full sm:w-80">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
          />
        </div>
      </div>

      {/* TABS */}
      <div className="flex flex-wrap gap-2">
        {["All", "new", "assigned", "in_progress", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm capitalize ${activeTab === tab
                ? "bg-green-700 text-white"
                : "bg-white border border-gray-300 text-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading && <p>Loading bookings...</p>}

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            {/* TOP */}
            <div className="flex justify-between">
              <div className="flex gap-3">
                <img
                  src={booking.avatar}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {booking.customer}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {booking.service}
                  </p>

                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {booking.date}, {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-800">
                  ₹{booking.amount}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-4 flex-wrap">

              {booking.status === "new" && (
                <>
                  <button
                    onClick={() => handleAccept(booking.id)}
                    className="flex-1 py-2 rounded-lg bg-green-700 text-white"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() => handleDecline(booking.id)}
                    className="flex-1 py-2 rounded-lg bg-red-600 text-white"
                  >
                    Decline
                  </button>
                </>
              )}

              {booking.status === "assigned" && (
                <>
                  <button
                    onClick={() => handleNavigate(booking)}
                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-1"
                  >
                    <Navigation size={14} /> Navigate
                  </button>

                  <button
                    onClick={() => handleCall(booking.mobile)}
                    className="flex-1 py-2 rounded-lg bg-green-600 text-white flex items-center justify-center gap-1"
                  >
                    <Phone size={14} /> Call
                  </button>

                  <button
                    onClick={() => openOtpModal(booking, "start")}
                    className="flex-1 py-2 rounded-lg bg-green-800 text-white"
                  >
                    Start
                  </button>
                </>
              )}

              {booking.status === "in_progress" && (
                <>
                  <button
                    onClick={() => handleNavigate(booking)}
                    className="flex-1 py-2 rounded-lg bg-blue-600 text-white"
                  >
                    Navigate
                  </button>

                  <button
                    onClick={() => handleCall(booking.mobile)}
                    className="flex-1 py-2 rounded-lg bg-green-600 text-white"
                  >
                    Call
                  </button>

                  <button
                    onClick={() => openOtpModal(booking, "end")}
                    className="flex-1 py-2 rounded-lg bg-green-800 text-white"
                  >
                    Finish
                  </button>
                </>
              )}

              {booking.status === "completed" && (
                <div className="flex-1 py-2 text-center bg-green-50 text-green-700 rounded-lg text-sm">
                  <CheckCircle size={14} className="inline mr-1" />
                  Job Completed
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* OTP MODAL */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 relative space-y-4">
            <button
              onClick={() => setShowOtpModal(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              <X size={18} />
            </button>

            <h3 className="font-semibold text-lg">
              Enter {otpType === "start" ? "Start" : "End"} OTP
            </h3>

            <input
              type="text"
              value={enteredOtp}
              onChange={(e) => setEnteredOtp(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              placeholder="Enter OTP"
            />

            <button
              onClick={verifyOtp}
              className="w-full py-2 bg-green-700 text-white rounded-lg"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
