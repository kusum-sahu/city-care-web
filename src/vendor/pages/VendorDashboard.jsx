import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  PlayCircle,
  IndianRupee,
  Calendar,
  Star,
  MapPin,
  ChevronRight,
  Plus,
  X,
  ChevronDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const VendorDashboard = () => {
  // Earnings chart data (weekly example)
  const earningsData = [
    { day: "Tue", earnings: 1200 },
    { day: "Wed", earnings: 2800 },
    { day: "Thu", earnings: 2100 },
    { day: "Fri", earnings: 4500 },
    { day: "Sat", earnings: 5200 },
    { day: "Sun", earnings: 4100 },
  ];

  // Sample pending/ongoing bookings
  const [bookings, setBookings] = useState({
    pending: [
      {
        id: "P001",
        customer: "Nisha Sharma",
        avatar: "https://i.pravatar.cc/48?img=5",
        service: "Hair Spa & Massage",
        amount: 299,
        time: "Today, 11:30 AM",
        distance: "3.5 km",
        location: "Assigned",
      },
      {
        id: "P002",
        customer: "Amit Kumar",
        avatar: "https://i.pravatar.cc/48?img=3",
        service: "Home Salon – Bridal Package",
        amount: 8947,
        time: "Today, 10:30 – 11:30 AM",
        distance: "1.2 km",
        location: "Assigned",
      },
    ],
    ongoing: [
      {
        id: "O001",
        customer: "Priya Jindal",
        avatar: "https://i.pravatar.cc/48?img=7",
        service: "Facial & Skin Treatment",
        amount: 2345,
        time: "Today, 9:00 – 10:00 AM",
        distance: "Assigned",
      },
    ],
  });

  // Sample completed (just for display)
  const completedCount = 8;

  // Recent reviews
  const reviews = [
    {
      name: "Nisha Sharma",
      avatar: "https://i.pravatar.cc/40?img=5",
      rating: 5,
      comment: "Great service! Very professional and punctual.",
      time: "2 days ago",
    },
    {
      name: "Priya Jindal",
      avatar: "https://i.pravatar.cc/40?img=7",
      rating: 4,
      comment: "Average experience, technician was late but did a decent job.",
      time: "4 days ago",
    },
    {
      name: "Rahul Singh",
      avatar: "https://i.pravatar.cc/40?img=8",
      rating: 5,
      comment: "Excellent work, will book again!",
      time: "6 days ago",
    },
  ];


  return (
    <div className="space-y-6">

      {/* Welcome Header */}
      {/* <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Welcome Simran!
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your bookings and earnings with ease.
        </p>
      </div>

      <button className="flex items-center gap-2 px-4 py-2 bg-[#1b7858] text-white rounded-lg hover:bg-[#145A41] transition shadow-sm">
        <Plus size={18} /> Add Slot
      </button>
    </div> */}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-gray-800">2</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <Clock size={22} className="text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Ongoing</p>
            <p className="text-2xl font-bold text-gray-800">3</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <PlayCircle size={22} className="text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={22} className="text-[#1b7858]" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Earnings This Week</p>
            <p className="text-2xl font-bold text-gray-800">₹5,200</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <IndianRupee size={22} className="text-[#1b7858]" />
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            {/* Header Section with Heading and Add Slot Button */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold text-[#145A41]">
                Slot Management
              </h2>
              <button className="flex items-center gap-2 px-3 py-1.5  bg-[#1b7858] text-white rounded-lg text-sm hover:bg-[#145A41] transition">
                <Plus size={14} /> Add Slot
              </button>
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {["Monday", "Tuesday", "Wednesday", "Thursday"].map((day) => (
                <div key={day}>
                  <p className="text-sm font-medium text-gray-700 mb-2">{day}</p>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span>8:00 AM</span>
                      <CheckCircle size={14} className="text-[#1b7858]" />
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                      <span>9:30 PM</span>
                      <CheckCircle size={14} className="text-[#1b7858]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Action */}
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1b7858] text-white rounded-lg text-sm hover:bg-[#145A41] transition">
              <Plus size={14} /> Block Day
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-blue-900 mb-5">Bookings</h2>

            {/* Pending */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  Pending ({bookings.pending.length})
                </h3>
                <span className="text-sm text-gray-500">₹{bookings.pending.reduce((sum, b) => sum + b.amount, 0)}</span>
              </div>
              <div className="space-y-4">
                {bookings.pending.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-blue-50/40 rounded-lg border border-blue-100 hover:border-blue-300 transition"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={booking.avatar}
                        alt={booking.customer}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                          <span>{booking.time}</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} /> {booking.distance}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-4 sm:mt-0">
                      <p className="font-medium text-gray-900">₹{booking.amount}</p>
                      <div className="flex gap-2">
                        <button className="px-4 py-1.5 bg-[#1b7858] text-white text-xs rounded hover:bg-[#145A41">
                          Accept
                        </button>
                        <button className="px-4 py-1.5 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200">
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  Ongoing ({bookings.ongoing.length})
                </h3>
              </div>
              <div className="space-y-4">
                {bookings.ongoing.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 transition"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={booking.avatar}
                        alt={booking.customer}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-sm text-gray-600">{booking.service}</p>
                        <p className="text-xs text-gray-500 mt-1">{booking.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                      <p className="font-medium text-gray-900">₹{booking.amount}</p>
                      <div className="flex gap-2 text-xs">
                        <button className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                          Mark Started
                        </button>
                        <button className="px-4 py-1.5 bg-[#1b7858] text-white rounded hover:bg-[#145A41">
                          Mark Completed
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          {/* Earnings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Earnings Overview
            </h3>

            <p className="text-2xl font-bold text-gray-800">₹1,320</p>
            <p className="text-sm text-gray-500 mb-6">Today</p>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={earningsData}>
                  <CartesianGrid stroke="#E5E7EB" vertical={false} />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#1b7858"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-5">
              Reviews
            </h3>

            <div className="space-y-4">
              {reviews.map((review, i) => (
                <div key={i} className="flex gap-3">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-800">
                      {review.name}
                    </p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          size={14}
                          className={
                            idx < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );


};

export default VendorDashboard;
