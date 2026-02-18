import React, { useState } from "react";
import { Search, Star } from "lucide-react";

const Reviews = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const reviews = [
    {
      id: 1,
      name: "Nisha Sharma",
      rating: 5,
      service: "AC Repair",
      comment:
        "Great service, very professional and punctual. Excellent job done.",
      time: "2 days ago",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
    {
      id: 2,
      name: "Sumit Kumar",
      rating: 5,
      service: "AC Service",
      comment:
        "Excellent work as always. My AC is working perfectly after service.",
      time: "5 days ago",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
    {
      id: 3,
      name: "Priya Jindal",
      rating: 3,
      service: "AC Service",
      comment:
        "Average experience, technician arrived late but completed the job.",
      time: "1 week ago",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
    {
      id: 4,
      name: "Rahul Singh",
      rating: 4,
      service: "Water Purifier",
      comment:
        "Highly recommend! Punctual and efficient service.",
      time: "3 weeks ago",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
  ];

  /* ===== Filter Logic ===== */

  const filteredReviews = reviews
    .filter((review) =>
      searchQuery === ""
        ? true
        : review.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          review.comment
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    )
    .filter((review) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "With Issues")
        return review.rating <= 3;
      return review.rating === parseInt(activeFilter);
    });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Reviews
        </h2>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchQuery}
            onChange={(e) =>
              setSearchQuery(e.target.value)
            }
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "5", "4", "3", "With Issues"].map(
          (filter) => (
            <button
              key={filter}
              onClick={() =>
                setActiveFilter(filter)
              }
              className={`px-4 py-1.5 text-sm rounded-full transition ${
                activeFilter === filter
                  ? "text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
              style={
                activeFilter === filter
                  ? {
                      backgroundColor: "#1b7858",
                    }
                  : {}
              }
            >
              {filter === "5"
                ? "⭐ 5 Stars"
                : filter === "4"
                ? "⭐ 4 Stars"
                : filter === "3"
                ? "⭐ 3 Stars"
                : filter}
            </button>
          )
        )}
      </div>

      {/* Review Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {filteredReviews.length === 0 ? (
          <div className="col-span-full text-center py-10 text-gray-500">
            No reviews found
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition"
            >

              {/* Top Section */}
              <div className="flex items-start gap-3">
                <img
                  src={review.avatar}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {review.name}
                      </h4>
                      <p className="text-xs text-gray-500">
                        {review.time}
                      </p>
                    </div>

                    <button className="text-sm font-medium text-red-500 hover:underline">
                      Dispute
                    </button>
                  </div>

                  {/* Stars */}
                  <div className="flex mt-2">
                    {[...Array(5)].map(
                      (_, index) => (
                        <Star
                          key={index}
                          size={16}
                          className={
                            index <
                            review.rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      )
                    )}
                  </div>

                  {/* Comment */}
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    {review.comment}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    Service:{" "}
                    <span className="font-medium text-gray-700">
                      {review.service}
                    </span>
                  </p>

                </div>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Reviews;
