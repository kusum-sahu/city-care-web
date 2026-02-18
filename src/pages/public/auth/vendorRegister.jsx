import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const VendorRegister = () => {
  const navigate = useNavigate();

  const initialState = {
    business_name: "",
    contact_person: "",
    mobile: "",
    email: "",
    password: "",
    district: "",
    service_area: "",
    experience_years: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
  };

  const [form, setForm] = useState(initialState);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agree) {
      toast.error("Please accept certification.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/vendor-auth/register",
        form
      );

      toast.success(res.data.message);

      // reset form
      setForm(initialState);
      setAgree(false);

      // redirect after 2 sec
      setTimeout(() => {
        navigate("/login/b2b");
      }, 2000);

    } catch (err) {
      console.log("Backend Error:", err.response?.data);

      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Toaster position="top-right" />

      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">

        <h2 className="text-3xl font-bold text-[#206f53] mb-8 text-center">
          Vendor Registration Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* Company Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Company Contact
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="business_name" value={form.business_name}
                onChange={handleChange} placeholder="Company Name"
                className="input" required />

              <input name="contact_person" value={form.contact_person}
                onChange={handleChange} placeholder="Contact Person"
                className="input" required />

              <input name="mobile" value={form.mobile}
                onChange={handleChange} placeholder="Phone Number"
                className="input" required />

              <input name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="Email"
                className="input" required />

              <input name="password" type="password" value={form.password}
                onChange={handleChange} placeholder="Password"
                className="input" required />

              <input name="district" value={form.district}
                onChange={handleChange} placeholder="District"
                className="input" required />

            </div>
          </div>

          {/* Company Overview */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Company Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="service_area" value={form.service_area}
                onChange={handleChange} placeholder="Service Area"
                className="input" required />

              <input name="experience_years" type="number"
                value={form.experience_years}
                onChange={handleChange}
                placeholder="Years of Experience"
                className="input" required />

            </div>
          </div>

          {/* Banking Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">
              Banking Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <input name="bank_name" value={form.bank_name}
                onChange={handleChange} placeholder="Bank Name"
                className="input" required />

              <input name="account_number" value={form.account_number}
                onChange={handleChange} placeholder="Account Number"
                className="input" required />

              <input name="ifsc_code" value={form.ifsc_code}
                onChange={handleChange} placeholder="IFSC Code"
                className="input" required />

            </div>
          </div>

          {/* Certification */}
          <div className="bg-gray-50 p-4 rounded border text-sm text-gray-600">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="accent-[#206f53]"
              />
              I hereby affirm that all information supplied is true and accurate.
            </label>
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#206f53] hover:bg-[#145A41] text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default VendorRegister;


// import { useState } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// const VendorRegister = () => {
//   const navigate = useNavigate();

//   const initialState = {
//     business_name: "",
//     contact_person: "",
//     mobile: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//     district: "",
//     service_area: "",
//     experience_years: "",
//     bank_name: "",
//     account_number: "",
//     ifsc_code: "",
//   };

//   const [form, setForm] = useState(initialState);
//   const [agree, setAgree] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!agree) return toast.error("Please accept certification.");

//     if (form.password !== form.confirm_password)
//       return toast.error("Passwords do not match");

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/vendor-auth/register",
//         {
//           ...form,
//           verification_status: "pending",
//         }
//       );

//       toast.success(res.data.message);
//       setForm(initialState);
//       setAgree(false);

//       setTimeout(() => navigate("/login/b2b"), 1500);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-4">
//       <Toaster position="top-right" />

//       <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg p-8">
//         <h2 className="text-3xl font-bold text-[#206f53] mb-8 text-center">
//           Vendor Registration
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-6">

//           <input name="business_name" placeholder="Company Name"
//             value={form.business_name} onChange={handleChange}
//             className="input" required />

//           <input name="contact_person" placeholder="Contact Person"
//             value={form.contact_person} onChange={handleChange}
//             className="input" required />

//           <input name="mobile" placeholder="Phone Number"
//             value={form.mobile} onChange={handleChange}
//             className="input" required />

//           <input name="email" type="email"
//             placeholder="Email"
//             value={form.email} onChange={handleChange}
//             className="input" required />

//           <input name="password" type="password"
//             placeholder="Password"
//             value={form.password} onChange={handleChange}
//             className="input" required />

//           <input name="confirm_password" type="password"
//             placeholder="Confirm Password"
//             value={form.confirm_password} onChange={handleChange}
//             className="input" required />

//           <button
//             disabled={loading}
//             className="w-full bg-[#206f53] text-white py-3 rounded-lg font-semibold">
//             {loading ? "Submitting..." : "Register"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// export default VendorRegister;
