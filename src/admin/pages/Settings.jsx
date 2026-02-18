// import { Edit, Settings as Gear, User, CreditCard, Bell } from 'lucide-react';

// export default function Settings() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="p-6 md:p-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
//           <p className="text-sm text-gray-500 mt-1">
//             Dashboard → Settings
//           </p>
//         </div>

//         {/* Settings Cards */}
//         <div className="space-y-6 max-w-5xl">
//           {/* General Settings */}
//           <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0 w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl">
//               <Gear size={28} />
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   General Settings
//                 </h3>
//                 <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Manage your site name, logo, and basic configurations.
//               </p>
//             </div>
//           </div>

//           {/* Account Settings */}
//           <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0 w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl">
//               <User size={28} />
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Account Settings
//                 </h3>
//                 <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Update your account information and password.
//               </p>
//             </div>
//           </div>

//           {/* Payment Settings (first) */}
//           <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0 w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-2xl">
//               <CreditCard size={28} />
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Payment Settings
//                 </h3>
//                 <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Configure payment gateways and commission rates.
//               </p>
//             </div>
//           </div>

//           {/* Payment Settings (second - possibly different scope) */}
//           <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0 w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-2xl">
//               <CreditCard size={28} />
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Payment Settings
//                 </h3>
//                 <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Configure payment gateways and commission rates.
//               </p>
//             </div>
//           </div>

//           {/* Notification Settings */}
//           <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex items-start gap-5 hover:shadow-md transition-shadow">
//             <div className="flex-shrink-0 w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-2xl">
//               <Bell size={28} />
//             </div>

//             <div className="flex-1">
//               <div className="flex items-center justify-between mb-1">
//                 <h3 className="text-lg font-semibold text-gray-900">
//                   Notification Settings
//                 </h3>
//                 <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-emerald-600 hover:bg-emerald-50 rounded-lg border border-emerald-200 transition-colors">
//                   <Edit size={16} />
//                   Edit
//                 </button>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Customize email and SMS notifications for users.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Edit, Settings as Gear, User, CreditCard, Bell, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Settings() {
    return (
        <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
                    <ArrowLeft size={16} /> Dashboard
                </Link>
                <span>{">"}</span>
                <span className="text-gray-800 font-medium">Settings</span>
            </div>

            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage application settings and preferences
                </p>
            </div>

            {/* MAIN CARD – same feel as Orders page */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 space-y-6">

                    {/* General Settings */}
                    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                <Gear size={26} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    General Settings
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Manage your site name, logo, and basic configurations.
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
bg-[#145A41] text-white rounded-lg 
hover:bg-[#0E3F2E] transition">
                            <Edit size={16} />
                            Edit
                        </button>
                    </div>

                    {/* Account Settings */}
                    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <User size={26} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Account Settings
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Update your account information and password.
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
bg-[#145A41] text-white rounded-lg 
hover:bg-[#0E3F2E] transition">
                            <Edit size={16} />
                            Edit
                        </button>

                    </div>

                    {/* Payment Settings */}
                    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <CreditCard size={26} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Payment Settings
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Configure payment gateways and commission rates.
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
bg-[#145A41] text-white rounded-lg 
hover:bg-[#0E3F2E] transition">
                            <Edit size={16} />
                            Edit
                        </button>

                    </div>

                    {/* Notification Settings */}
                    <div className="flex items-center justify-between p-5 rounded-xl border border-gray-200 hover:shadow-sm transition">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
                                <Bell size={26} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Notification Settings
                                </h3>
                                <p className="text-sm text-gray-600">
                                    Customize email and SMS notifications for users.
                                </p>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
bg-[#145A41] text-white rounded-lg 
hover:bg-[#0E3F2E] transition">
                            <Edit size={16} />
                            Edit
                        </button>

                    </div>

                    {/* Footer info */}
                    <p className="text-sm text-gray-500 pt-2">
                        4 settings available
                    </p>

                </div>
            </div>
        </div>
    );
}
