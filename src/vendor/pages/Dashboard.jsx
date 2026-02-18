// import {
//   TrendingUp,
//   ShoppingCart,
//   CheckCircle,
//   ThumbsUp,
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   BarChart,
//   Bar,
// } from "recharts";

// /* ================== STATS ================== */
// const stats = [
//   { title: "Total Earnings", value: "₹52,380", icon: TrendingUp },
//   { title: "Total Orders", value: "120", icon: ShoppingCart },
//   { title: "Active Orders", value: "20", icon: CheckCircle },
//   { title: "Avg. Rating", value: "4.5 ★", icon: ThumbsUp },
// ];

// /* ================== CHART DATA ================== */
// const earningsData = [
//   { month: "Jan", amount: 9000 },
//   { month: "Feb", amount: 11000 },
//   { month: "Mar", amount: 13000 },
//   { month: "Apr", amount: 15000 },
//   { month: "May", amount: 16500 },
//   { month: "Jun", amount: 18000 },
// ];

// const orderStatsData = [
//   { month: "Jan", orders: 10 },
//   { month: "Feb", orders: 12 },
//   { month: "Mar", orders: 11 },
//   { month: "Apr", orders: 18 },
//   { month: "May", orders: 25 },
//   { month: "Jun", orders: 30 },
// ];

// /* ================== TABLE ================== */
// const orders = [
//   { id: "#ORD1043", customer: "Amit", service: "Electrician", status: "Pending", date: "Apr 24, 2024" },
//   { id: "#ORD1039", customer: "Rahul", service: "Fan Repair", status: "Pending", date: "Apr 20, 2024" },
//   { id: "#ORD1035", customer: "Anjali", service: "AC Installation", status: "Pending", date: "Apr 15, 2024" },
// ];

// const Dashboard = () => {
//   return (
//     <div className="space-y-6">

//       {/* WELCOME */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-semibold text-gray-800">
//           Welcome, Ashok Electricals!
//         </h1>

//         <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium">
//           ₹ 52,380.00
//         </div>
//       </div>

//       {/* STATS CARDS */}
//       <div className="grid grid-cols-4 gap-6">
//         {stats.map((item, i) => {
//           const Icon = item.icon;
//           return (
//             <div
//               key={i}
//               className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4"
//             >
//               <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
//                 <Icon size={22} />
//               </div>
//               <div>
//                 <p className="text-xl font-semibold text-gray-800">
//                   {item.value}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {item.title}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* CHART SECTION */}
//       <div className="grid grid-cols-2 gap-6">

//         {/* EARNINGS LINE CHART */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
//           <h3 className="font-semibold text-gray-700 mb-4">
//             Earnings Overview
//           </h3>

//           <ResponsiveContainer width="100%" height="85%">
//             <LineChart data={earningsData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="amount"
//                 stroke="#16a34a"
//                 strokeWidth={3}
//                 dot={{ r: 4 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* ORDER STATS BAR CHART */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="font-semibold text-gray-700">
//               Order Stats
//             </h3>
//             <button className="text-green-700 text-sm font-medium">
//               View All →
//             </button>
//           </div>

//           <div className="flex gap-3 mb-4">
//             <span className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-xl text-sm">
//               8 Pending
//             </span>
//             <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl text-sm">
//               5 In Progress
//             </span>
//             <span className="px-4 py-2 bg-green-100 text-green-700 rounded-xl text-sm">
//               6 Completed
//             </span>
//           </div>

//           <ResponsiveContainer width="100%" height="65%">
//             <BarChart data={orderStatsData}>
//               <CartesianGrid strokeDasharray="3 3" vertical={false} />
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Bar
//                 dataKey="orders"
//                 fill="#22c55e"
//                 radius={[8, 8, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* PENDING ORDERS */}
//       <div className="bg-white rounded-2xl shadow-sm p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h3 className="font-semibold text-gray-700">
//             Pending Orders
//           </h3>
//           <button className="text-green-700 text-sm font-medium">
//             View All →
//           </button>
//         </div>

//         <table className="w-full text-sm">
//           <thead className="text-gray-500 border-b">
//             <tr>
//               <th className="text-left py-3"># Order ID</th>
//               <th className="text-left">Customer</th>
//               <th className="text-left">Service</th>
//               <th className="text-left">Status</th>
//               <th className="text-left">Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             {orders.map((o, i) => (
//               <tr key={i} className="border-b last:border-none">
//                 <td className="py-4 font-medium text-green-700">
//                   {o.id}
//                 </td>
//                 <td>{o.customer}</td>
//                 <td>{o.service}</td>
//                 <td>
//                   <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
//                     {o.status}
//                   </span>
//                 </td>
//                 <td>{o.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// import {
//   TrendingUp,
//   ShoppingCart,
//   CheckCircle,
//   ThumbsUp,
// } from "lucide-react";

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
//   BarChart,
//   Bar,
// } from "recharts";

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const [profileStatus, setProfileStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   /* ================= FETCH PROFILE STATUS ================= */
// useEffect(() => {
//   const fetchProfileStatus = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/vendors/profile-status",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setProfileStatus(res.data.data);

//     } catch (err) {

//       if (err.response?.status === 401) {
//         toast.error("Session expired. Please login again.");
//         localStorage.removeItem("token");
//         navigate("/login/b2b");
//       } else {
//         toast.error("Failed to load vendor status");
//       }

//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProfileStatus();
// }, []);

//   /* ================= LOADING ================= */
//   if (loading) {
//     return (
//       <div className="p-10 text-center text-gray-600">
//         Loading dashboard...
//       </div>
//     );
//   }

//   if (!profileStatus) {
//     return (
//       <div className="p-10 text-center text-red-500">
//         Unable to load profile status.
//       </div>
//     );
//   }

//   /* ================= STATUS SECTION ================= */
// //   const renderStatusSection = () => {

// //   // Profile incomplete
// //   if (!profileStatus.profile_completed) {
// //     return (
// //       <div className="bg-yellow-100 p-6 rounded-2xl">
// //         <p className="text-yellow-800 font-semibold mb-4">
// //           Your profile is incomplete. Please complete your profile.
// //         </p>
// //         <button
// //           onClick={() => navigate("/vendor/complete-profile")}
// //           className="bg-yellow-600 text-white px-5 py-2 rounded-xl"
// //         >
// //           Complete Profile
// //         </button>
// //       </div>
// //     );
// //   }

// //   // Pending verification
// //   if (profileStatus.verification_status === "pending") {
// //     return (
// //       <div className="bg-blue-100 p-6 rounded-2xl">
// //         <p className="text-blue-800 font-semibold">
// //           Your documents are under admin review.
// //         </p>
// //       </div>
// //     );
// //   }

// //   // Rejected
// //   if (profileStatus.verification_status === "rejected") {
// //     return (
// //       <div className="bg-red-100 p-6 rounded-2xl">
// //         <p className="text-red-800 font-semibold mb-4">
// //           Verification rejected. Please update your documents.
// //         </p>
// //         <button
// //           onClick={() => navigate("/vendor/complete-profile")}
// //           className="bg-red-600 text-white px-5 py-2 rounded-xl"
// //         >
// //           Update Profile
// //         </button>
// //       </div>
// //     );
// //   }

// //   return null;
// // };
// const renderStatusSection = () => {

//   if (!profileStatus.profile_completed) {
//     return (
//       <div className="bg-yellow-100 p-6 rounded-2xl">
//         <p className="text-yellow-800 font-semibold mb-4">
//           Your profile is incomplete.
//         </p>
//         <button
//           onClick={() => navigate("/vendor/complete-profile")}
//           className="bg-yellow-600 text-white px-5 py-2 rounded-xl"
//         >
//           Complete Profile
//         </button>
//       </div>
//     );
//   }

//   if (profileStatus.verification_status === "pending") {
//     return (
//       <div className="bg-blue-100 p-6 rounded-2xl">
//         <p className="text-blue-800 font-semibold">
//           Your documents are under admin review.
//         </p>
//       </div>
//     );
//   }

//   if (profileStatus.verification_status === "rejected") {
//     return (
//       <div className="bg-red-100 p-6 rounded-2xl">
//         <p className="text-red-800 font-semibold mb-4">
//           Verification rejected. Update your profile.
//         </p>
//         <button
//           onClick={() => navigate("/vendor/complete-profile")}
//           className="bg-red-600 text-white px-5 py-2 rounded-xl"
//         >
//           Update Profile
//         </button>
//       </div>
//     );
//   }

//   return null;
// };

//   /* ================= FULL DASHBOARD (ONLY APPROVED) ================= */
//   const renderFullDashboard = () => {
//   if (profileStatus.verification_status !== "verified") return null;

//     const stats = [
//       { title: "Total Earnings", value: "₹52,380", icon: TrendingUp },
//       { title: "Total Orders", value: "120", icon: ShoppingCart },
//       { title: "Active Orders", value: "20", icon: CheckCircle },
//       { title: "Avg. Rating", value: "4.5 ★", icon: ThumbsUp },
//     ];

//     const earningsData = [
//       { month: "Jan", amount: 9000 },
//       { month: "Feb", amount: 11000 },
//       { month: "Mar", amount: 13000 },
//       { month: "Apr", amount: 15000 },
//       { month: "May", amount: 16500 },
//       { month: "Jun", amount: 18000 },
//     ];

//     const orderStatsData = [
//       { month: "Jan", orders: 10 },
//       { month: "Feb", orders: 12 },
//       { month: "Mar", orders: 11 },
//       { month: "Apr", orders: 18 },
//       { month: "May", orders: 25 },
//       { month: "Jun", orders: 30 },
//     ];

//     return (
//       <>
//         {/* STATS */}
//         <div className="grid grid-cols-4 gap-6">
//           {stats.map((item, i) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={i}
//                 className="bg-white rounded-2xl shadow-sm p-5 flex items-center gap-4"
//               >
//                 <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
//                   <Icon size={22} />
//                 </div>
//                 <div>
//                   <p className="text-xl font-semibold text-gray-800">
//                     {item.value}
//                   </p>
//                   <p className="text-sm text-gray-500">{item.title}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* CHARTS */}
//         <div className="grid grid-cols-2 gap-6 mt-6">
//           <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
//             <h3 className="font-semibold text-gray-700 mb-4">
//               Earnings Overview
//             </h3>

//             <ResponsiveContainer width="100%" height="85%">
//               <LineChart data={earningsData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="amount"
//                   stroke="#16a34a"
//                   strokeWidth={3}
//                   dot={{ r: 4 }}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           <div className="bg-white rounded-2xl shadow-sm p-6 h-[280px]">
//             <h3 className="font-semibold text-gray-700 mb-4">
//               Order Stats
//             </h3>

//             <ResponsiveContainer width="100%" height="85%">
//               <BarChart data={orderStatsData}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} />
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar
//                   dataKey="orders"
//                   fill="#22c55e"
//                   radius={[8, 8, 0, 0]}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </>
//     );
//   };

//   return (
//     <div className="space-y-6 p-6">
//       <Toaster position="top-right" />

//       {/* STATUS SECTION */}
//       {renderStatusSection()}

//       {/* FULL DASHBOARD */}
//       {renderFullDashboard()}
//     </div>
//   );
// };

// export default Dashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import VendorDashboard from "./VendorDashboard";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [profileStatus, setProfileStatus] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfileStatus = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const res = await axios.get(
//           "http://localhost:5000/api/vendors/profile-status",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setProfileStatus(res.data.data);
//       } catch (err) {
//         if (err.response?.status === 401) {
//           toast.error("Session expired. Please login again.");
//           localStorage.removeItem("token");
//           navigate("/login/b2b");
//         } else {
//           toast.error("Failed to load vendor status");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfileStatus();
//   }, []);

//  if (loading) {
//   return <div className="p-10 text-center">Loading dashboard...</div>;
// }

// if (!profileStatus) {
//   return (
//     <div className="p-10 text-center text-red-500">
//       Unable to load profile status.
//     </div>
//   );
// }
//   /* STATUS SECTION */
//   const renderStatusSection = () => {
//     if (!profileStatus.profile_completed) {
//       return (
//         <div className="bg-yellow-100 p-6 rounded-2xl">
//           <p className="text-yellow-800 font-semibold mb-4">
//             Your profile is incomplete.
//           </p>
//           <button
//             onClick={() => navigate("/vendor/complete-profile")}
//             className="bg-yellow-600 text-white px-5 py-2 rounded-xl"
//           >
//             Complete Profile
//           </button>
//         </div>
//       );
//     }

//     if (profileStatus.verification_status === "pending") {
//       return (
//         <div className="bg-blue-100 p-6 rounded-2xl">
//           <p className="text-blue-800 font-semibold">
//             Your documents are under admin review.
//           </p>
//         </div>
//       );
//     }

//     if (profileStatus.verification_status === "rejected") {
//       return (
//         <div className="bg-red-100 p-6 rounded-2xl">
//           <p className="text-red-800 font-semibold mb-4">
//             Verification rejected. Update your profile.
//           </p>
//           <button
//             onClick={() => navigate("/vendor/complete-profile")}
//             className="bg-red-600 text-white px-5 py-2 rounded-xl"
//           >
//             Update Profile
//           </button>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <div className="space-y-6">
//       <Toaster position="top-right" />

//       {renderStatusSection()}

//       {/* ✅ Only show full dashboard if verified */}
//       {profileStatus.verification_status === "verified" && (
//         <VendorDashboard />
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import VendorDashboard from "./VendorDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [profileStatus, setProfileStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileStatus = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/vendors/profile-status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setProfileStatus(res.data.data);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          localStorage.removeItem("token");
          navigate("/login/b2b");
        } else {
          toast.error("Failed to load vendor status");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileStatus();
  }, [navigate]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading dashboard...
      </div>
    );
  }

  /* ================= ERROR ================= */
  if (!profileStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Unable to load profile status.
      </div>
    );
  }

  /* ================= BLOCK NON-VERIFIED USERS ================= */
  if (
    !profileStatus.profile_completed ||
    profileStatus.verification_status !== "verified"
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F6F8]">
        <Toaster position="top-right" />

        <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md">

          {/* Profile Incomplete */}
          {!profileStatus.profile_completed && (
            <>
              <h2 className="text-xl font-bold text-yellow-600 mb-3">
                Profile Incomplete
              </h2>
              <p className="text-gray-600 mb-5">
                Please complete your profile to access the dashboard.
              </p>
              <button
                onClick={() => navigate("/vendor/complete-profile")}
                className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition"
              >
                Complete Profile
              </button>
            </>
          )}

          {/* Pending */}
          {profileStatus.profile_completed &&
            profileStatus.verification_status === "pending" && (
              <>
                <h2 className="text-xl font-bold text-blue-600 mb-3">
                  Verification Pending
                </h2>
                <p className="text-gray-600">
                  Your profile is under admin review.
                </p>
              </>
            )}

          {/* Rejected */}
          {profileStatus.profile_completed &&
            profileStatus.verification_status === "rejected" && (
              <>
                <h2 className="text-xl font-bold text-red-600 mb-3">
                  Verification Rejected
                </h2>
                <p className="text-gray-600 mb-5">
                  Please update your documents and resubmit.
                </p>
                <button
                  onClick={() => navigate("/vendor/complete-profile")}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Update Profile
                </button>
              </>
            )}

        </div>
      </div>
    );
  }

  /* ================= VERIFIED USER ONLY ================= */
  return (
    <>
      <Toaster position="top-right" />
      <VendorDashboard />
    </>
  );
};

export default Dashboard;
