import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaEdit, FaBuilding, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaWallet, FaBank } from "react-icons/fa";

const VendorProfile = () => {
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login/b2b");
      return;
    }

    try {
      const res = await axios.get("http://localhost:5000/api/vendors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setVendor(res.data.data);
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const maskAccountNumber = (accountNumber) => {
    if (!accountNumber) return "Not provided";
    const last4 = accountNumber.slice(-4);
    return `****${last4}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#206f53] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto">
        {/* Profile Header Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-[#206f53] to-[#145A41] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  {vendor.profile_image ? (
                    <img
                      src={`http://localhost:5000/uploads/${vendor.profile_image}`}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#206f53] text-3xl font-bold">
                      {vendor.business_name?.charAt(0).toUpperCase() || "V"}
                    </div>
                  )}
                  {vendor.verification_status === "verified" && (
                    <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-1 border-2 border-white">
                      <FaStar className="text-white text-xs" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{vendor.business_name}</h1>
                  <p className="text-green-100 mt-1">{vendor.contact_person}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {vendor.rating ? (
                      <>
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{vendor.rating}</span>
                        <span className="text-green-100">
                          ({vendor.total_reviews || 0} reviews)
                        </span>
                      </>
                    ) : (
                      <span className="text-green-100">No ratings yet</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-sm text-green-100">Wallet Balance</p>
                  <p className="text-2xl font-bold">
                    ₹{vendor.wallet_balance || "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Business Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                  Business Information
                </h2>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaBuilding className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Business Name</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.business_name || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaUser className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Contact Person</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.contact_person || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaEnvelope className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaPhone className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Mobile</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.mobile || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Service & Location */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                  Service Details
                </h2>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaBuilding className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Service Type</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.service_type_name || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaStar className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Experience</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.experience_years || 0} years
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Service Area</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.service_area || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <FaMapMarkerAlt className="text-[#206f53] text-xl mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">District</p>
                    <p className="font-semibold text-gray-800">
                      {vendor.district || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bank Details */}
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaBank className="text-[#206f53]" />
                Banking Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <p className="font-semibold text-gray-800">
                    {vendor.bank_name || "Not provided"}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Account Number</p>
                  <p className="font-semibold text-gray-800">
                    {maskAccountNumber(vendor.account_number)}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">IFSC Code</p>
                  <p className="font-semibold text-gray-800">
                    {vendor.ifsc_code || "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-8 border-t">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Earnings</p>
                  <p className="text-2xl font-bold text-[#206f53]">
                    ₹{vendor.total_earnings || "0.00"}
                  </p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Wallet Balance</p>
                  <p className="text-2xl font-bold text-blue-600">
                    ₹{vendor.wallet_balance || "0.00"}
                  </p>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">Commission Rate</p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {vendor.commission_rate || 0}%
                  </p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Verification</p>
                  <p
                    className={`text-lg font-bold ${
                      vendor.verification_status === "verified"
                        ? "text-green-600"
                        : vendor.verification_status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                    }`}
                  >
                    {vendor.verification_status === "verified"
                      ? "Verified"
                      : vendor.verification_status === "rejected"
                        ? "Rejected"
                        : "Pending"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
