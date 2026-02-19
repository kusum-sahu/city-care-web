import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaUpload, FaTimes } from "react-icons/fa";

const VendorRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    business_name: "",
    contact_person: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    service_type_id: "",
    experience_years: "",
    service_area: "",
    district: "",
    bank_name: "",
    account_number: "",
    ifsc_code: "",
  });

  const [files, setFiles] = useState({
    profile_image: null,
    id_proof: null,
  });

  const [previews, setPreviews] = useState({
    profile_image: null,
    id_proof: null,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Fetch service types
  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/services/types");
        if (res.data.success) {
          setServiceTypes(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch service types");
      }
    };
    fetchServiceTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFiles((prev) => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = (field) => {
    setFiles((prev) => ({ ...prev, [field]: null }));
    setPreviews((prev) => ({ ...prev, [field]: null }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.business_name.trim()) {
      newErrors.business_name = "Business name is required";
    }

    if (!formData.contact_person.trim()) {
      newErrors.contact_person = "Contact person name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.service_type_id) {
      newErrors.service_type_id = "Service type is required";
    }

    if (!formData.experience_years) {
      newErrors.experience_years = "Experience is required";
    } else if (parseInt(formData.experience_years) < 0) {
      newErrors.experience_years = "Experience must be 0 or more";
    }

    if (!formData.service_area.trim()) {
      newErrors.service_area = "Service area is required";
    }

    if (!formData.district.trim()) {
      newErrors.district = "District is required";
    }

    if (!formData.bank_name.trim()) {
      newErrors.bank_name = "Bank name is required";
    }

    if (!formData.account_number.trim()) {
      newErrors.account_number = "Account number is required";
    }

    if (!formData.ifsc_code.trim()) {
      newErrors.ifsc_code = "IFSC code is required";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifsc_code.toUpperCase())) {
      newErrors.ifsc_code = "Invalid IFSC code format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          formDataToSend.append(key, formData[key]);
        }
      });

      // Add files
      if (files.profile_image) {
        formDataToSend.append("profile_image", files.profile_image);
      }
      if (files.id_proof) {
        formDataToSend.append("id_proof", files.id_proof);
      }

      const res = await axios.post(
        "http://localhost:5000/api/vendor-auth/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Registration successful!");
        
        // Reset form
        setFormData({
          business_name: "",
          contact_person: "",
          mobile: "",
          email: "",
          password: "",
          confirmPassword: "",
          service_type_id: "",
          experience_years: "",
          service_area: "",
          district: "",
          bank_name: "",
          account_number: "",
          ifsc_code: "",
        });
        setFiles({ profile_image: null, id_proof: null });
        setPreviews({ profile_image: null, id_proof: null });

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/login/b2b");
        }, 2000);
      }
    } catch (err) {
      console.error("Registration Error:", err.response?.data);
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again."
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
              Company Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name *
                </label>
                <input
                  name="business_name"
                  value={formData.business_name}
                  onChange={handleChange}
                  placeholder="Your Business Name"
                  className={`w-full p-3 border rounded-md ${
                    errors.business_name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.business_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.business_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person Name *
                </label>
                <input
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleChange}
                  placeholder="Contact Person Name"
                  className={`w-full p-3 border rounded-md ${
                    errors.contact_person ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.contact_person && (
                  <p className="text-red-500 text-xs mt-1">{errors.contact_person}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="business@example.com"
                  className={`w-full p-3 border rounded-md ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number *
                </label>
                <input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className={`w-full p-3 border rounded-md ${
                    errors.mobile ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.mobile && (
                  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className={`w-full p-3 border rounded-md ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password *
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full p-3 border rounded-md ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>
          </div>

          {/* Service Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
              Service Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type *
                </label>
                <select
                  name="service_type_id"
                  value={formData.service_type_id}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-md ${
                    errors.service_type_id ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                >
                  <option value="">-- Select Service Type --</option>
                  {serviceTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.service_type_id && (
                  <p className="text-red-500 text-xs mt-1">{errors.service_type_id}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience (Years) *
                </label>
                <input
                  name="experience_years"
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={handleChange}
                  placeholder="Years of experience"
                  className={`w-full p-3 border rounded-md ${
                    errors.experience_years ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.experience_years && (
                  <p className="text-red-500 text-xs mt-1">{errors.experience_years}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Area *
                </label>
                <input
                  name="service_area"
                  value={formData.service_area}
                  onChange={handleChange}
                  placeholder="Areas you serve"
                  className={`w-full p-3 border rounded-md ${
                    errors.service_area ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.service_area && (
                  <p className="text-red-500 text-xs mt-1">{errors.service_area}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  District *
                </label>
                <input
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className={`w-full p-3 border rounded-md ${
                    errors.district ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">{errors.district}</p>
                )}
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
              Banking Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Name *
                </label>
                <input
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  placeholder="Bank Name"
                  className={`w-full p-3 border rounded-md ${
                    errors.bank_name ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.bank_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.bank_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account Number *
                </label>
                <input
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  placeholder="Account Number"
                  className={`w-full p-3 border rounded-md ${
                    errors.account_number ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none`}
                />
                {errors.account_number && (
                  <p className="text-red-500 text-xs mt-1">{errors.account_number}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code *
                </label>
                <input
                  name="ifsc_code"
                  value={formData.ifsc_code}
                  onChange={handleChange}
                  placeholder="IFSC Code (e.g., SBIN0001234)"
                  className={`w-full p-3 border rounded-md ${
                    errors.ifsc_code ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-[#206f53] focus:border-transparent outline-none uppercase`}
                  style={{ textTransform: "uppercase" }}
                />
                {errors.ifsc_code && (
                  <p className="text-red-500 text-xs mt-1">{errors.ifsc_code}</p>
                )}
              </div>
            </div>
          </div>

          {/* File Uploads */}
          <div>
            <h3 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
              Documents
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                {previews.profile_image ? (
                  <div className="relative">
                    <img
                      src={previews.profile_image}
                      alt="Profile preview"
                      className="w-full h-48 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("profile_image")}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, "profile_image")}
                    />
                  </label>
                )}
              </div>

              {/* ID Proof */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID Proof (Aadhaar/PAN)
                </label>
                {previews.id_proof ? (
                  <div className="relative">
                    <img
                      src={previews.id_proof}
                      alt="ID proof preview"
                      className="w-full h-48 object-cover rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile("id_proof")}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FaUpload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleFileChange(e, "id_proof")}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#206f53] hover:bg-[#145A41] text-white px-8 py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
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
