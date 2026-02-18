import React, { useState, useMemo } from "react";
import {
  Search,
  Star,
  Trash2,
  Check,
  Pencil,
} from "lucide-react";

const reviewsData = [
  {
    id: 1,
    user: "Mukesh Kumar",
    contact: "+91 9876543210",
    service: "House Cleaning",
    rating: 5,
    review: "Excellent service! The cleaners were thorough and professional.",
    date: "Apr 15, 2024",
    status: "approved",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    id: 2,
    user: "Isha Sharma",
    contact: "+91 9876532100",
    service: "Plumbing Service",
    rating: 4,
    review: "Good plumber, fixed the issue quickly.",
    date: "Apr 10, 2024",
    status: "pending",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    id: 3,
    user: "Vijay Mehta",
    contact: "+91 9876509870",
    service: "Appliance Repair",
    rating: 3,
    review: "Service was okay. Took longer than expected.",
    date: "Mar 7, 2024",
    status: "enabled",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    id: 4,
    user: "Sneha Kapoor",
    contact: "beautyblisspa.com",
    service: "Car Repair",
    rating: 5,
    review: "Very satisfied with the repair. Car runs smoothly.",
    date: "Mar 25, 2024",
    status: "enabled",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    id: 5,
    user: "Rakesh Singh",
    contact: "+91 9876512345",
    service: "Pest Control",
    rating: 2,
    review: "Not satisfied. The problem returned again.",
    date: "Mar 20, 2024",
    status: "enabled",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

const ReviewsRatings = () => {
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("All Services");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");

  const services = ["All Services", ...new Set(reviewsData.map(r => r.service))];
  const ratings = ["All Ratings", 5, 4, 3, 2, 1];

  const filteredReviews = useMemo(() => {
    return reviewsData.filter(r => {
      const matchSearch =
        r.user.toLowerCase().includes(search.toLowerCase()) ||
        r.service.toLowerCase().includes(search.toLowerCase());

      const matchService =
        serviceFilter === "All Services" || r.service === serviceFilter;

      const matchRating =
        ratingFilter === "All Ratings" || r.rating === Number(ratingFilter);

      return matchSearch && matchService && matchRating;
    });
  }, [search, serviceFilter, ratingFilter]);

  return (
    <div className="p-6 space-y-6">

      {/* Page Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Reviews & Ratings
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-xl shadow-sm border">
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          {services.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={ratingFilter}
          onChange={(e) => setRatingFilter(e.target.value)}
        >
          {ratings.map(r => (
            <option key={r}>{r}</option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by user or service"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Service</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Review</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredReviews.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                {/* User */}
                <td className="p-4 flex gap-3 items-center">
                  <img
                    src={r.avatar}
                    alt={r.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{r.user}</p>
                    <p className="text-xs text-gray-500">{r.contact}</p>
                    {r.status === "approved" && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-green-100 text-green-700">
                        Approved
                      </span>
                    )}
                  </div>
                </td>

                {/* Service */}
                <td className="p-4">{r.service}</td>

                {/* Rating */}
                <td className="p-4">
                  <div className="flex gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star
                        key={i}
                        size={16}
                        className={i <= r.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                    <span className="ml-1 text-gray-600">{r.rating}</span>
                  </div>
                </td>

                {/* Review */}
                <td className="p-4 text-gray-600 max-w-xs">
                  {r.review}
                </td>

                {/* Date */}
                <td className="p-4">{r.date}</td>

                {/* Actions */}
                <td className="p-4 flex gap-2">
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#145A41] text-white text-xs">
                    <Check size={14} /> Approve
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-xs">
                    <Pencil size={14} /> Edit
                  </button>
                  <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border text-red-500 text-xs">
                    <Trash2 size={14} /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 text-sm text-gray-500">
          <p>Showing {filteredReviews.length} Reviews</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded">Previous</button>
            <button className="px-3 py-1 bg-[#145A41] text-white rounded">1</button>
            <button className="px-3 py-1 border rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsRatings;

