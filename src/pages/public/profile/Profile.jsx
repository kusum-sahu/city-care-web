import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const inputStyle = "w-full border border-green-200 rounded-md px-4 py-2 focus:ring-1 focus:ring-green-500 outline-none text-sm";
  const labelStyle = "block text-sm font-medium text-gray-700 mb-1";
  // Custom style for file inputs to match the screenshot look
  const fileInputStyle = "w-full border border-green-200 rounded-md text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:border-r file:border-green-200 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 cursor-pointer";

  return (
    <section className="bg-gray-100 py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT PROFILE CARD */}
          <div className="lg:col-span-4 sticky top-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative">
                <img src="/public/images/prof-back.jpg" alt="cover" className="w-full h-40 object-cover" />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md text-gray-600">
                  <FaCamera size={14} />
                </button>
              </div>

              <div className="px-6 pb-6 text-center">
                <img src="/public/images/rudra.jpeg" alt="profile" className="w-32 h-32 rounded-full mx-auto -mt-16 border-4 border-white object-cover shadow-md" />
                <h3 className="mt-4 text-xl font-bold text-gray-800">Rudra Narayana Sahoo</h3>
                <p className="text-gray-500 font-medium">Electrician</p>

                <div className="mt-8 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Profile Completion</span>
                    <span className="bg-green-900 text-white text-[10px] px-2 py-0.5 rounded">80%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              
              <div className="flex justify-between items-center mb-8 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Edit Your Profile</h2>
                <button className="text-green-600 hover:text-green-700 text-sm font-semibold flex items-center gap-1">
                  <span className="text-lg">✎</span> Edit Your Profile
                </button>
              </div>

              <form className="space-y-10">
                
                {/* LOOKING FOR */}
                <div className="border border-green-200 rounded-lg p-6 relative">
                  <h4 className="absolute -top-4 left-4 bg-green-900 text-white px-4 py-1 rounded text-sm font-medium">Looking For</h4>
                  <div className="mt-2">
                    <label className={labelStyle}>Service For <span className="text-red-500">*</span></label>
                    <select className={inputStyle}>
                      <option>Electrician</option>
                      <option>Plumber</option>
                    </select>
                  </div>
                </div>

                {/* PERSONAL INFORMATION */}
                <div className="border border-green-200 rounded-lg p-6 relative">
                  <h4 className="absolute -top-4 left-4 bg-green-900 text-white px-4 py-1 rounded text-sm font-medium">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <label className={labelStyle}>First Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Rudra Narayana" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Last Name <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="Sahoo" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Email <span className="text-red-500">*</span></label>
                      <input type="email" placeholder="rudranarayanasahoo@gmail.com" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Mobile Number <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="+91 91750 25684" className={inputStyle} />
                    </div>
                  </div>
                </div>

                {/* DOCUMENTS SECTION (UPDATED) */}
                <div className="border border-green-200 rounded-lg p-6 relative">
                  <h4 className="absolute -top-4 left-4 bg-green-900 text-white px-4 py-1 rounded text-sm font-medium">Documents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    {/* Aadhar */}
                    <div>
                      <label className={labelStyle}>Adhar <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="0123 4567 1289" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Upload Your Adhar <span className="text-red-500">*</span></label>
                      <input type="file" className={fileInputStyle} />
                    </div>
                    
                    {/* PAN */}
                    <div>
                      <label className={labelStyle}>PAN <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="ABCDE12345" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Upload PAN <span className="text-red-500">*</span></label>
                      <input type="file" className={fileInputStyle} />
                    </div>

                    {/* Bank Passbook */}
                    <div>
                      <label className={labelStyle}>Bank Passbook <span className="text-red-500">*</span></label>
                      <input type="text" placeholder="12345678901" className={inputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Upload Bank Passbook <span className="text-red-500">*</span></label>
                      <input type="file" className={fileInputStyle} />
                    </div>

                    {/* Passport & Certification */}
                    <div>
                      <label className={labelStyle}>Passport Photo <span className="text-red-500">*</span></label>
                      <input type="file" className={fileInputStyle} />
                    </div>
                    <div>
                      <label className={labelStyle}>Certification <span className="text-red-500">*</span></label>
                      <input type="file" className={fileInputStyle} />
                    </div>
                  </div>
                </div>

                {/* ADDRESS / WORK DETAILS (UPDATED) */}
                <div className="border border-green-200 rounded-lg p-6 relative">
                  <h4 className="absolute -top-4 left-4 bg-green-900 text-white px-4 py-1 rounded text-sm font-medium">Address / Work Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                    <div>
                      <label className={labelStyle}>Permanent Address <span className="text-red-500">*</span></label>
                      <textarea rows="4" className={inputStyle} placeholder="Permanent address details..."></textarea>
                    </div>
                    <div>
                      <label className={labelStyle}>Present Address <span className="text-red-500">*</span></label>
                      <textarea rows="4" className={inputStyle} placeholder="Present address details..."></textarea>
                    </div>
                    <div>
                      <label className={labelStyle}>Service Location <span className="text-red-500">*</span></label>
                      <textarea rows="4" className={inputStyle} placeholder="Service location details..."></textarea>
                    </div>
                    <div>
                      <label className={labelStyle}>Time to Available <span className="text-red-500">*</span></label>
                      <textarea rows="4" className={inputStyle} placeholder="Available time details..."></textarea>
                    </div>
                  </div>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-3 pt-6 border-t">
                  <button type="button" className="bg-green-900 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition hover:bg-black">Edit Your Profile</button>
                  <button type="submit" className="bg-green-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold transition hover:bg-green-700">Save & Continue</button>
                  <button type="button" className="bg-cyan-500 text-white px-5 py-2.5 rounded-md text-sm font-semibold">Deactivate Account</button>
                  <button type="button" className="bg-red-600 text-white px-5 py-2.5 rounded-md text-sm font-semibold">Delete Account</button>
                  <button type="button" className="bg-purple-600 text-white px-8 py-2.5 rounded-md text-sm font-semibold ml-auto">Logout</button>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Profile;

// import { useEffect, useState } from "react";
// import axios from "axios";

// const Profile = () => {

//   const [vendor, setVendor] = useState(null);

//   useEffect(() => {
//     const fetchVendor = async () => {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/vendors/me",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setVendor(res.data);
//     };

//     fetchVendor();
//   }, []);

//   if (!vendor) return <p className="text-center mt-10">Loading...</p>;

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">

//       <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

//         {/* HEADER */}
//         <div className="flex items-center gap-6 border-b pb-6">

//           <img
//             src={vendor.profile_img || "/default-user.png"}
//             alt="profile"
//             className="w-28 h-28 rounded-full object-cover"
//           />

//           <div>
//             <h2 className="text-2xl font-bold">
//               {vendor.business_name}
//             </h2>

//             <p className="text-gray-500">
//               {vendor.email} | {vendor.mobile}
//             </p>

//             {vendor.verification_status === "approved" ? (
//               <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs">
//                 ✔ Verified
//               </span>
//             ) : (
//               <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
//                 Pending Verification
//               </span>
//             )}
//           </div>

//         </div>

//         {/* TABS CONTENT */}

//         <div className="grid md:grid-cols-2 gap-8 mt-8">

//           <div>
//             <h4 className="font-semibold mb-2">Overview</h4>
//             <p>Service: {vendor.service_name}</p>
//             <p>Experience: {vendor.experience_years} years</p>
//             <p>Availability: {vendor.availability_status}</p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-2">Service Area</h4>
//             <p>{vendor.service_area}</p>
//             <p>{vendor.address}</p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-2">Working Hours</h4>
//             <p>{vendor.working_hours}</p>
//           </div>

//           <div>
//             <h4 className="font-semibold mb-2">Bank Details</h4>
//             <p>{vendor.bank_name}</p>
//             <p>{vendor.account_number}</p>
//             <p>{vendor.ifsc_code}</p>
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Profile;
