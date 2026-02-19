import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const pathname = location.pathname;
  const signupType =
    pathname === "/signup/b2b"
      ? "B2B"
      : pathname === "/signup/b2c"
        ? "B2C"
        : "NORMAL";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
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

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter valid 6-digit pincode";
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
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.replace(/\D/g, ""),
        password: formData.password,
        role_id: signupType === "B2B" ? 3 : 2, // 3 = Vendor, 2 = User
        address: formData.address.trim(),
        city: formData.city.trim(),
        pincode: formData.pincode.trim(),
      };

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Account created successfully! 🎉");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          address: "",
          city: "",
          pincode: "",
        });
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-lg">
        {/* LEFT IMAGE */}
        <div
          className="hidden lg:flex relative bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#206f53] opacity-90"></div>
          <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
            <img src="/images/citycare.png" alt="logo" className="w-36" />
            <div>
              <h1 className="text-4xl font-bold mb-4">Join CityCare</h1>
              <p className="text-lg">
                Create your account and get access to professional services at your doorstep.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-900 text-white flex items-center">
          <div className="w-full px-8 sm:px-12 py-10">
            <h3 className="text-2xl font-semibold text-center mb-6">
              {signupType === "B2B" ? "Business Sign Up" : "Create Account"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-300">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.name ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none`}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-300">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.email ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none`}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Mobile */}
              <div>
                <label className="text-sm text-gray-300">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.mobile ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none`}
                />
                {errors.mobile && (
                  <p className="text-red-400 text-xs mt-1">{errors.mobile}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="text-sm text-gray-300">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.password ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none`}
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="text-sm text-gray-300">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none`}
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-sm text-gray-300">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="2"
                  className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                    errors.address ? "border-red-500" : "border-gray-700"
                  } focus:border-green-500 outline-none resize-none`}
                />
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* City & Pincode */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                      errors.city ? "border-red-500" : "border-gray-700"
                    } focus:border-green-500 outline-none`}
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-300">Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="6-digit pincode"
                    maxLength="6"
                    className={`w-full mt-1 p-3 rounded bg-gray-800 border ${
                      errors.pincode ? "border-red-500" : "border-gray-700"
                    } focus:border-green-500 outline-none`}
                  />
                  {errors.pincode && (
                    <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#206f53] hover:bg-[#145A41] transition p-3 rounded font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?
              <span
                className="text-[#258764] ml-1 cursor-pointer hover:underline"
                onClick={() =>
                  navigate(
                    signupType === "B2B"
                      ? "/login/b2b"
                      : signupType === "B2C"
                        ? "/login/b2c"
                        : "/login"
                  )
                }
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
