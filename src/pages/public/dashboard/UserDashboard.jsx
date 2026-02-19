import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingCart, FaHistory, FaCog } from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">User Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div
            onClick={() => navigate("/profile")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#206f53] rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">My Profile</h3>
                <p className="text-gray-500">View and edit your profile</p>
              </div>
            </div>
          </div>

          {/* Bookings Card */}
          <div
            onClick={() => navigate("/profile/services")}
            className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <FaShoppingCart className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">My Bookings</h3>
                <p className="text-gray-500">View your service bookings</p>
              </div>
            </div>
          </div>

          {/* History Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center">
                <FaHistory className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Booking History</h3>
                <p className="text-gray-500">View past bookings</p>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                <FaCog className="text-white text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Settings</h3>
                <p className="text-gray-500">Manage your settings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
