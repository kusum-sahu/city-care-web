import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const districts = [
  "Angul", "Boudh", "Bhadrak", "Bolangir", "Bargarh", "Balasore",
  "Cuttack", "Debagarh", "Dhenkanal", "Ganjam", "Gajapati",
  "Jharsuguda", "Jajpur", "Jagatsinghpur", "Khordha", "Keonjhar",
  "Kalahandi", "Kandhamal", "Koraput", "Kendrapara", "Malkangiri",
  "Mayurbhanj", "Nabarangpur", "Nuapada", "Nayagarh", "Puri", "Rayagada"
];

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [autoDistrict, setAutoDistrict] = useState("");
  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const rawDistrict =
            data.address.county ||
            data.address.state_district ||
            data.address.city ||
            "";

          const cleanedDistrict = rawDistrict
            .replace(" District", "")
            .replace(" district", "")
            .trim();

          if (districts.includes(cleanedDistrict)) {
            setAutoDistrict(cleanedDistrict);
          }
        } catch (err) {
          console.log("District fetch failed");
        }
      },
      () => console.log("Location denied")
    );
  }, []);


  // 🔑 SIGNUP TYPE FROM URL
  const pathname = location.pathname;

  const signupType =
    pathname === "/signup/b2b"
      ? "B2B"
      : pathname === "/signup/b2c"
        ? "B2C"
        : "NORMAL";

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = e.target;

  const payload = {
    name: form.name.value,
    mobile: form.mobile.value,
    email: form.email.value,
    password: form.password.value,
    role_id: form.role_id.value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success("Account created successfully 🎉");

      form.reset(); // ✅ Clear form fields
    } else {
      toast.error(data.message || "Registration failed");
    }
  } catch (error) {
    toast.error("Server error");
  }
};

setTimeout(() => {
  navigate("/login");
}, 2000);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 rounded-xl overflow-hidden shadow-lg">

        {/* LEFT IMAGE */}
        <div
          className="hidden lg:flex relative bg-cover bg-center"
          style={{ backgroundImage: "url('/images/login.jpg')" }}
        >
          <div className="absolute inset-0 bg-[#206f53]"></div>

          <div className="relative z-10 flex flex-col justify-between h-full p-10 text-white">
            <img src="/images/citycare.png" alt="logo" className="w-36" />

            <div>
              <h1 className="text-4xl font-bold mb-4">
                You're new here!
              </h1>
              <p className="text-lg">
                Sign in with your email and personal details to get started!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-gray-900 text-white flex items-center">
          <div className="w-full px-8 sm:px-12 py-10">

            <h3 className="text-2xl font-semibold text-center mb-6">
              {signupType === "B2B"
                ? "Business Sign Up"
                : signupType === "B2C"
                  ? "B2C Sign Up"
                  : "Sign Up"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input name="name" placeholder="Name"
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 border-gray-700 focus:border-green-500 outline-none" />

              <input name="mobile" placeholder="Mobile No."
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 border-gray-700 focus:border-green-500 outline-none" />
              <select
                name="role_id"
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-green-500 outline-none"
              >
                <option value="">-- Select Role --</option>
                <option value="2">User</option>
                <option value="3">Vendor</option>
              </select>

              <select
                name="district"
                value={autoDistrict}
                onChange={(e) => setAutoDistrict(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 focus:border-green-500 outline-none"
              >
                <option value="">-- Select District --</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>


              <input name="email" type="email" placeholder="Email"
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 border-gray-700 focus:border-green-500 outline-none" />

              <input name="password" type="password" placeholder="Password"
                className="w-full p-3 bg-gray-800 rounded border border-gray-700 border-gray-700 focus:border-green-500 outline-none" />

              <button className="w-full bg-[#206f53] hover:bg-[#145A41] p-3 rounded cursor-pointer">
                Create Account
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?
              <span
                className="text-[#258764] ml-1 cursor-pointer"
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
