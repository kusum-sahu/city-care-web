import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect,} from "react";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname = location.pathname;

  const loginType =
    pathname === "/login/b2b"
      ? "B2B"
      : pathname === "/login/b2c"
      ? "B2C"
      : "NORMAL";

const handleLogin = async (e) => {
  e.preventDefault();

  const form = e.target;

  const payload = {
    email: form.email.value,
    password: form.password.value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Login successful 🎉");

      // ✅ Store token
      localStorage.setItem("token", data.token);

      // ✅ Clear form
      form.reset();

      // ✅ Redirect based on role
      const decoded = JSON.parse(atob(data.token.split(".")[1]));

      if (decoded.role === "Admin") {
        navigate("/admin/dashboard");
      } else if (decoded.role === "Vendor") {
        navigate("/vendor/dashboard");
      } else {
        navigate("/");
      }

    } else {
      toast.error(data.message || "Invalid credentials");
    }
  } catch (error) {
    toast.error("Server error");
  }
};
// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     navigate("/");
//   }
// }, []);

useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const decoded = JSON.parse(atob(token.split(".")[1]));

  if (decoded.role === "Admin") {
    navigate("/admin/dashboard");
  } else if (decoded.role === "Vendor") {
    navigate("/vendor/dashboard");
  } else {
    navigate("/");
  }

}, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-lg">
        <div
          className="hidden lg:flex relative bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login.jpg')" }}>
          <div className="absolute inset-0 bg-[#206f53]"></div>
          <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
            <img src="/images/citycare.png" alt="logo" className="w-36" />
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome</h1>
              <p className="text-lg">
                Get access to your Orders, Wishlist and Recommendations.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 text-white flex items-center">
          <div className="w-full px-8 sm:px-12 py-10">

            <h3 className="text-2xl font-semibold text-center mb-6">
              {loginType === "B2B"
                ? "B2B Login"
                : loginType === "B2C"
                ? "B2C Login"
                : "Login"}
            </h3>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm text-gray-300">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full mt-1 p-3 rounded bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300">Password</label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full mt-1 p-3 rounded bg-gray-800 border border-gray-700 focus:border-green-500 outline-none"
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-[#145A41] cursor-pointer" />
                  Remember Me
                </label>
                <span className="text-blue-400 cursor-pointer">
                  Forgot Password ?
                </span>
              </div>

              <button className="w-full bg-[#206f53] hover:bg-[#145A41] transition p-3 rounded font-semibold cursor-pointer">
                Sign In
              </button>
            </form>


            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?
              <span
                className="text-[#258764] ml-1 cursor-pointer"
                onClick={() =>
                  navigate(
                    loginType === "B2B"
                      ? "/signup/b2b"
                      : loginType === "B2C"
                      ? "/signup/b2c"
                      : "/signup"
                  )
                }
              >
                Sign Up / Create Account
              </span>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   // 🔹 Detect Login Type
//   const loginType =
//     pathname === "/login/b2b"
//       ? "B2B"
//       : pathname === "/login/admin"
//       ? "ADMIN"
//       : "B2C"; // Default user OTP

//   // 🔹 OTP States
//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);

//   // 🔹 Vendor/Admin States
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   /* =====================================================
//       USER OTP LOGIN FLOW
//   ===================================================== */

//   const sendOtp = async () => {
//     if (!mobile) return alert("Enter mobile number");

//     try {
//       setLoading(true);
//       await axios.post("http://localhost:5000/api/auth/send-otp", { mobile });
//       setStep(2);
//       alert("OTP sent successfully");
//     } catch (err) {
//       alert("Failed to send OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp) return alert("Enter OTP");

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         { mobile, otp }
//       );

//       localStorage.setItem("token", res.data.token);

//       navigate("/"); // Redirect to dashboard
//     } catch (err) {
//       alert("Invalid or expired OTP");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//       VENDOR / ADMIN LOGIN
//   ===================================================== */

//   const handleVendorLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return alert("Email & password required");
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.token);

//       if (loginType === "B2B") {
//         navigate("/vendor/dashboard");
//       } else {
//         navigate("/admin/dashboard");
//       }

//     } catch (err) {
//       alert("Invalid credentials or not approved");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =====================================================
//       UI
//   ===================================================== */

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

//         <h2 className="text-2xl font-bold text-center mb-6 text-[#023a20]">
//           {loginType === "B2B"
//             ? "Vendor Login"
//             : loginType === "ADMIN"
//             ? "Admin Login"
//             : "User Login"}
//         </h2>

//         {/* ================= USER OTP ================= */}
//         {loginType === "B2C" && (
//           <>
//             {step === 1 && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter Mobile Number"
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value)}
//                   className="w-full p-3 border rounded mb-4"
//                 />

//                 <button
//                   onClick={sendOtp}
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white p-3 rounded"
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full p-3 border rounded mb-4"
//                 />

//                 <button
//                   onClick={verifyOtp}
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white p-3 rounded"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>
//               </>
//             )}
//           </>
//         )}

//         {/* ================= VENDOR / ADMIN ================= */}
//         {(loginType === "B2B" || loginType === "ADMIN") && (
//           <form onSubmit={handleVendorLogin} className="space-y-4">

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#023a20] text-white p-3 rounded"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         )}

//         {/* Signup Link */}
//         {loginType === "B2C" && (
//           <p className="text-center mt-6 text-sm">
//             New user?{" "}
//             <span
//               className="text-green-600 cursor-pointer"
//               onClick={() => navigate("/signup")}
//             >
//               Sign Up
//             </span>
//           </p>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Login;


// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import toast, { Toaster } from "react-hot-toast";

// const Login = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const pathname = location.pathname;

//   const loginType =
//     pathname === "/login/b2b"
//       ? "B2B"
//       : pathname === "/login/admin"
//         ? "ADMIN"
//         : "B2C";

//   const [mobile, setMobile] = useState("");
//   const [otp, setOtp] = useState("");
//   const [step, setStep] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(0);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   /* ================= TIMER ================= */

//   useEffect(() => {
//     if (timer > 0) {
//       const interval = setInterval(() => {
//         setTimer((prev) => prev - 1);
//       }, 1000);

//       return () => clearInterval(interval);
//     }
//   }, [timer]);

//   const validateMobile = (number) => {
//     const mobileRegex = /^[6-9]\d{9}$/;
//     return mobileRegex.test(number);
//   };


//   /* ================= SEND OTP ================= */

//   const sendOtp = async () => {

//     if (!mobile) {
//       return toast.error("Mobile number required");
//     }

//     if (!validateMobile(mobile)) {
//       return toast.error("Enter valid 10-digit mobile number");
//     }

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:5000/api/auth/send-otp",
//         { mobile }
//       );

//       toast.success("OTP sent successfully");
//       setStep(2);
//       setTimer(60);

//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to send OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   /* ================= RESEND OTP ================= */

//   const resendOtp = async () => {
//     if (timer > 0) return;

//     try {
//       await axios.post(
//         "http://localhost:5000/api/auth/resend-otp",
//         { mobile }
//       );

//       toast.success("OTP resent successfully");
//       setTimer(60);

//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Failed to resend OTP"
//       );
//     }
//   };

//   /* ================= VERIFY OTP ================= */

//   const verifyOtp = async () => {
//     if (!otp) {
//       return toast.error("Enter OTP");
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         { mobile, otp }
//       );

//       localStorage.setItem("token", res.data.token);

//       toast.success("Login successful");

//       setTimeout(() => {
//         navigate("/");
//       }, 1000);

//     } catch (err) {
//       toast.error(
//         err.response?.data?.message || "Invalid OTP"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= VENDOR / ADMIN LOGIN ================= */

//   const handleVendorLogin = async (e) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return toast.error("Email & password required");
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "http://localhost:5000/api/auth/login",
//         { email, password }
//       );

//       localStorage.setItem("token", res.data.token);

//       toast.success("Login successful");

//       setTimeout(() => {
//         if (loginType === "B2B") {
//           navigate("/vendor/dashboard");
//         } else {
//           navigate("/admin/dashboard");
//         }
//       }, 1000);

//     } catch (err) {
//       toast.error(
//         err.response?.data?.message ||
//         "Invalid credentials or not approved"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

//       <Toaster position="top-right" />

//       <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

//         <h2 className="text-2xl font-bold text-center mb-6 text-[#023a20]">
//           {loginType === "B2B"
//             ? "Vendor Login"
//             : loginType === "ADMIN"
//               ? "Admin Login"
//               : "User Login"}
//         </h2>

//         {/* USER OTP LOGIN */}
//         {loginType === "B2C" && (
//           <>
//             {step === 1 && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter Mobile Number"
//                   value={mobile}
//                   maxLength="10"
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\D/g, "");
//                     setMobile(value);
//                   }}
//                   className="w-full p-3 border rounded mb-2"
//                 />

//                 {mobile && !validateMobile(mobile) && (
//                   <p className="text-red-500 text-sm mb-2">
//                     Enter valid 10-digit mobile number
//                   </p>
//                 )}
//                 <button
//                   onClick={sendOtp}
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white p-3 rounded"
//                 >
//                   {loading ? "Sending..." : "Send OTP"}
//                 </button>
//               </>
//             )}

//             {step === 2 && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   className="w-full p-3 border rounded mb-4"
//                 />

//                 <button
//                   onClick={verifyOtp}
//                   disabled={loading}
//                   className="w-full bg-green-600 text-white p-3 rounded"
//                 >
//                   {loading ? "Verifying..." : "Verify OTP"}
//                 </button>

//                 <div className="text-center mt-3 text-sm">
//                   {timer > 0 ? (
//                     <span className="text-gray-500">
//                       Resend OTP in {timer}s
//                     </span>
//                   ) : (
//                     <button
//                       onClick={resendOtp}
//                       className="text-green-600"
//                     >
//                       Resend OTP
//                     </button>
//                   )}
//                 </div>
//               </>
//             )}
//           </>
//         )}

//         {/* VENDOR / ADMIN LOGIN */}
//         {(loginType === "B2B" || loginType === "ADMIN") && (
//           <form onSubmit={handleVendorLogin} className="space-y-4">

//             <input
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded"
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded"
//             />

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-[#023a20] text-white p-3 rounded"
//             >
//               {loading ? "Logging in..." : "Login"}
//             </button>
//           </form>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Login;
