import React, { useState } from "react";
import {
  User,
  Shield,
  Bell,
  IndianRupee,
  Edit2,
  Mail,
  Phone,
  MapPin,
  Building,
  Globe,
  CheckCircle2,X,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Settings() {
  // State for controlling which section's edit modal is open
  const [activeEditSection, setActiveEditSection] = useState(null);

  // Sample user data (you can fetch from API later)
  const userData = {
    name: "Ashok Sharma",
    email: "ashok.sharma@example.com",
    phone: "+91 98765 43210",
    address: "Bhubaneswar, Odisha, India",
    profilePhoto: null, // can be URL later
    passwordLastChanged: "3 months ago",
    twoFactorEnabled: true,
    notifications: "Order updates, Payment alerts, Support replies",
    bankName: "HDFC Bank",
    accountNumber: "•••• •••• 1234",
    upiId: "ashoksharma@okhdfcbank",
  };

  const openEditModal = (section) => {
    setActiveEditSection(section);
  };

  const closeEditModal = () => {
    setActiveEditSection(null);
  };

  const handleSave = (section) => {
    // Here you would send API request
    toast.success(`${section} updated successfully!`);
    closeEditModal();
  };

  // Simple Edit Modal (you can expand it per section later)
  const EditModal = ({ isOpen, onClose, section }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Edit {section}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-5">
            {section === "Profile Information" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={userData.phone}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.address}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {section === "Account Security" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="2fa" defaultChecked={userData.twoFactorEnabled} />
                  <label htmlFor="2fa" className="text-sm text-gray-600">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </>
            )}

            {section === "Notification Settings" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Order Updates</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Payment Alerts</span>
                  <input type="checkbox" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Support Replies</span>
                  <input type="checkbox" defaultChecked />
                </div>
              </div>
            )}

            {section === "Payout Details" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.bankName}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.accountNumber}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    UPI ID
                  </label>
                  <input
                    type="text"
                    defaultValue={userData.upiId}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => handleSave(section)}
              className="px-6 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your account information, security, notifications and payout details
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="space-y-6 max-w-4xl">

        {/* Profile Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-shadow">
          <div className="p-6 flex items-start gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <User size={32} className="text-green-700" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  <p className="text-sm text-gray-600">Update your personal details</p>
                </div>
                <button
                  onClick={() => openEditModal("Profile Information")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg text-sm font-medium transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-500" />
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-500" />
                  <span>{userData.phone}</span>
                </div>
                <div className="flex items-center gap-3 md:col-span-2">
                  <MapPin size={18} className="text-gray-500" />
                  <span>{userData.address}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-shadow">
          <div className="p-6 flex items-start gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield size={32} className="text-blue-700" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Account Security</h3>
                  <p className="text-sm text-gray-600">Change password & enable 2FA</p>
                </div>
                <button
                  onClick={() => openEditModal("Account Security")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg text-sm font-medium transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>Password last changed: {userData.passwordLastChanged}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span>2FA: {userData.twoFactorEnabled ? "Enabled" : "Disabled"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-shadow">
          <div className="p-6 flex items-start gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <Bell size={32} className="text-amber-700" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Notification Settings</h3>
                  <p className="text-sm text-gray-600">Manage your notifications</p>
                </div>
                <button
                  onClick={() => openEditModal("Notification Settings")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg text-sm font-medium transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <p className="text-sm text-gray-600">
                Currently receiving: {userData.notifications}
              </p>
            </div>
          </div>
        </div>

        {/* Payout Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow transition-shadow">
          <div className="p-6 flex items-start gap-5">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <IndianRupee size={32} className="text-emerald-700" />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Payout Details</h3>
                  <p className="text-sm text-gray-600">Update your payout information</p>
                </div>
                <button
                  onClick={() => openEditModal("Payout Details")}
                  className="flex items-center gap-2 px-4 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg text-sm font-medium transition"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
              </div>

              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-gray-500" />
                  <span>Bank: {userData.bankName} •••• {userData.accountNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={18} className="text-gray-500" />
                  <span>UPI: {userData.upiId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Edit Modal (one modal reused for all sections) */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity ${
          activeEditSection ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {activeEditSection && (
          <div className="bg-white rounded-xl p-6 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Edit {activeEditSection}
              </h2>
              <button
                onClick={closeEditModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content changes based on section */}
            {activeEditSection === "Profile Information" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  defaultValue={userData.name}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email"
                  defaultValue={userData.email}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  defaultValue={userData.phone}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  defaultValue={userData.address}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            )}

            {activeEditSection === "Account Security" && (
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="2fa" defaultChecked={userData.twoFactorEnabled} />
                  <label htmlFor="2fa" className="text-sm text-gray-600">
                    Enable Two-Factor Authentication
                  </label>
                </div>
              </div>
            )}

            {activeEditSection === "Notification Settings" && (
              <div className="space-y-3">
                {["Order Updates", "Payment Alerts", "Support Replies"].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{item}</span>
                    <input type="checkbox" defaultChecked />
                  </div>
                ))}
              </div>
            )}

            {activeEditSection === "Payout Details" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Bank Name"
                  defaultValue={userData.bankName}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="Account Number"
                  defaultValue={userData.accountNumber}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <input
                  type="text"
                  placeholder="UPI ID"
                  defaultValue={userData.upiId}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>
            )}

            <div className="mt-8 flex gap-3 justify-end">
              <button
                onClick={closeEditModal}
                className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave(activeEditSection)}
                className="px-6 py-2 bg-[#145A41] hover:bg-[#0E3F2E] text-white rounded-lg transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}