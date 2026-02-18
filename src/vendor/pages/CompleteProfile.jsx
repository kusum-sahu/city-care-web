// import { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const CompleteProfile = () => {
//   const navigate = useNavigate();

//   const initialForm = {
//     service_type_id: "",
//     experience_years: "",
//   };

//   const [form, setForm] = useState(initialForm);

//   const [files, setFiles] = useState({
//     profile_img: null,
//     aadhaar_doc: null,
//     pan_doc: null,
//     license_doc: null,
//   });

//   const [loading, setLoading] = useState(false);

//   /* ================= HANDLE INPUT ================= */

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleFileChange = (e) => {
//     setFiles({
//       ...files,
//       [e.target.name]: e.target.files[0],
//     });
//   };

//   /* ================= SUBMIT ================= */

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Session expired. Please login again.");
//       navigate("/login/b2b");
//       return;
//     }

//     if (!form.service_type_id) {
//       toast.error("Please select service type");
//       return;
//     }

//     const data = new FormData();
//     data.append("service_type_id", form.service_type_id);
//     data.append("experience_years", form.experience_years);

//     if (files.profile_img) data.append("profile_img", files.profile_img);
//     if (files.aadhaar_doc) data.append("aadhaar_doc", files.aadhaar_doc);
//     if (files.pan_doc) data.append("pan_doc", files.pan_doc);
//     if (files.license_doc) data.append("license_doc", files.license_doc);

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/vendors/upload-docs",
//         data,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       toast.success(res.data.message || "Profile submitted successfully");

//       // 🔥 Reset form
//       setForm(initialForm);
//       setFiles({
//         profile_img: null,
//         aadhaar_doc: null,
//         pan_doc: null,
//         license_doc: null,
//       });

//       setTimeout(() => {
//         navigate("/vendor/dashboard");
//       }, 1500);

//     } catch (err) {
//       if (err.response?.status === 401) {
//         toast.error("Session expired. Please login again.");
//         localStorage.removeItem("token");
//         navigate("/login/b2b");
//       } else {
//         toast.error(err.response?.data?.message || "Submit failed");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen bg-gray-100 p-10">
//       <Toaster position="top-right" />

//       <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-3xl p-10">

//         <h2 className="text-3xl font-bold text-[#023a20] mb-8 text-center">
//           Complete Your Profile
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-8">

//           {/* SERVICE TYPE */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Service Type
//             </label>

//             <select
//               name="service_type_id"
//               value={form.service_type_id}
//               onChange={handleChange}
//               className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600"
//               required
//             >
//               <option value="">Select Service Type</option>
//               <option value="1">Electrician</option>
//               <option value="2">Driver</option>
//               <option value="3">Plumber</option>
//               <option value="4">Beautician</option>
//             </select>
//           </div>

//           {/* EXPERIENCE */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Years of Experience
//             </label>
//             <input
//               type="number"
//               name="experience_years"
//               value={form.experience_years}
//               onChange={handleChange}
//               placeholder="Enter experience"
//               className="w-full p-4 border rounded-xl"
//               required
//             />
//           </div>

//           {/* FILE UPLOADS */}
//           <UploadCard
//             label="Profile Image"
//             name="profile_img"
//             file={files.profile_img}
//             onChange={handleFileChange}
//           />

//           <UploadCard
//             label="Aadhaar Document"
//             name="aadhaar_doc"
//             file={files.aadhaar_doc}
//             onChange={handleFileChange}
//             required
//           />

//           <UploadCard
//             label="PAN Document"
//             name="pan_doc"
//             file={files.pan_doc}
//             onChange={handleFileChange}
//             required
//           />

//           <UploadCard
//             label="License Document (Optional)"
//             name="license_doc"
//             file={files.license_doc}
//             onChange={handleFileChange}
//           />

//           {/* SUBMIT */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-[#023a20] hover:bg-[#145a41] text-white py-4 rounded-xl font-semibold text-lg transition"
//           >
//             {loading ? "Submitting..." : "Submit Profile"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// /* ================= REUSABLE UPLOAD CARD ================= */

// const UploadCard = ({ label, name, file, onChange, required }) => {
//   return (
//     <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-green-600 transition">

//       <p className="font-semibold text-gray-700 mb-3">{label}</p>

//       <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
//         Choose File
//         <input
//           type="file"
//           name={name}
//           onChange={onChange}
//           className="hidden"
//           required={required}
//         />
//       </label>

//       {file && (
//         <p className="mt-3 text-sm text-green-700 font-medium">
//           Selected: {file.name}
//         </p>
//       )}
//     </div>
//   );
// };

// export default CompleteProfile;



import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const initialForm = {
    service_type_id: "",
    experience_years: "",
    address: "",
    district: "",
    service_area: "",
    working_hours: "",
    availability_status: "available",
  };

  const [form, setForm] = useState(initialForm);

  const [files, setFiles] = useState({
    profile_img: null,
    aadhaar_doc: null,
    pan_doc: null,
    license_doc: null,
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles({
      ...files,
      [e.target.name]: e.target.files[0],
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login/b2b");
      return;
    }

    if (!form.service_type_id) {
      toast.error("Please select service type");
      return;
    }

    if (!files.aadhaar_doc || !files.pan_doc) {
      toast.error("Aadhaar and PAN documents are required");
      return;
    }

    const data = new FormData();

    // Basic Info
    data.append("service_type_id", form.service_type_id);
    data.append("experience_years", form.experience_years);
    data.append("address", form.address);
    data.append("district", form.district);
    data.append("service_area", form.service_area);
    data.append("working_hours", form.working_hours);
    data.append("availability_status", form.availability_status);

    // Files
    if (files.profile_img) data.append("profile_img", files.profile_img);
    if (files.aadhaar_doc) data.append("aadhaar_doc", files.aadhaar_doc);
    if (files.pan_doc) data.append("pan_doc", files.pan_doc);
    if (files.license_doc) data.append("license_doc", files.license_doc);

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/vendors/upload-docs",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message || "Profile completed successfully");

      setForm(initialForm);
      setFiles({
        profile_img: null,
        aadhaar_doc: null,
        pan_doc: null,
        license_doc: null,
      });

      setTimeout(() => {
        navigate("/vendor/dashboard");
      }, 1500);

    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        navigate("/login/b2b");
      } else {
        toast.error(err.response?.data?.message || "Submit failed");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-10">

        <h2 className="text-3xl font-bold text-[#023a20] mb-8 text-center">
          Complete Your Profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* SERVICE TYPE */}
          <div>
            <label className="block mb-2 font-medium">
              Service Type *
            </label>

            <select
              name="service_type_id"
              value={form.service_type_id}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-green-600"
              required
            >
              <option value="">Select Service Type</option>
              <option value="1">Electrician</option>
              <option value="2">Driver</option>
              <option value="3">Plumber</option>
              <option value="4">Beautician</option>
            </select>
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="block mb-2 font-medium">
              Years of Experience *
            </label>
            <input
              type="number"
              name="experience_years"
              value={form.experience_years}
              onChange={handleChange}
              placeholder="Enter experience"
              className="w-full p-4 border rounded-xl"
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block mb-2 font-medium">
              Full Address *
            </label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 border rounded-xl"
              required
            />
          </div>

          {/* DISTRICT */}
          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            placeholder="District"
            className="w-full p-4 border rounded-xl"
            required
          />

          {/* SERVICE AREA */}
          <input
            name="service_area"
            value={form.service_area}
            onChange={handleChange}
            placeholder="Service Area"
            className="w-full p-4 border rounded-xl"
            required
          />

          {/* WORKING HOURS */}
          <input
            name="working_hours"
            value={form.working_hours}
            onChange={handleChange}
            placeholder="Working Hours (9AM - 6PM)"
            className="w-full p-4 border rounded-xl"
            required
          />

          {/* AVAILABILITY */}
          <div>
            <label className="block mb-2 font-medium">
              Availability Status
            </label>
            <select
              name="availability_status"
              value={form.availability_status}
              onChange={handleChange}
              className="w-full p-4 border rounded-xl"
            >
              <option value="available">Available</option>
              <option value="busy">Busy</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          {/* FILE UPLOADS */}
          <UploadCard
            label="Profile Image"
            name="profile_img"
            file={files.profile_img}
            onChange={handleFileChange}
          />

          <UploadCard
            label="Aadhaar Document *"
            name="aadhaar_doc"
            file={files.aadhaar_doc}
            onChange={handleFileChange}
            required
          />

          <UploadCard
            label="PAN Document *"
            name="pan_doc"
            file={files.pan_doc}
            onChange={handleFileChange}
            required
          />

          <UploadCard
            label="License Document (Optional)"
            name="license_doc"
            file={files.license_doc}
            onChange={handleFileChange}
          />

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#023a20] hover:bg-[#145a41] text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            {loading ? "Submitting..." : "Submit Profile"}
          </button>

        </form>
      </div>
    </div>
  );
};

/* ================= REUSABLE UPLOAD CARD ================= */

const UploadCard = ({ label, name, file, onChange, required }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-green-600 transition">

      <p className="font-semibold text-gray-700 mb-3">{label}</p>

      <label className="cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition">
        Choose File
        <input
          type="file"
          name={name}
          onChange={onChange}
          className="hidden"
          required={required}
        />
      </label>

      {file && (
        <p className="mt-3 text-sm text-green-700 font-medium">
          Selected: {file.name}
        </p>
      )}
    </div>
  );
};

export default CompleteProfile;
