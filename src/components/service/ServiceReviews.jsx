import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const ServiceReviews = ({ rating = 4.8, reviews = 152 }) => {
  const navigate = useNavigate();
  const { serviceType, serviceId } = useParams(); // ✅ VERY IMPORTANT

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">

      <h3 className="text-lg font-semibold mb-4">
        Reviews & Ratings
      </h3>
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-green-700 text-white px-4 py-3 rounded text-xl font-bold">
          {rating}
        </div>

        <div>
          <p className="font-semibold">{reviews} Rating</p>
          <p className="text-sm text-gray-500">
            JD rating index based on {reviews} ratings across the web
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex text-gray-300">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} />
          ))}
        </div>

        <button
          onClick={() =>
            navigate(`/service/${serviceType}/${serviceId}/rate`)
          }
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Give Rating
        </button>
      </div>
      {[1, 2].map((_, i) => (
        <div key={i} className="border-t pt-4 mt-4">
          <div className="flex justify-between mb-2">
            <div>
              <p className="font-medium">Rudra Narayana Sahoo</p>
              <p className="text-xs text-gray-500">70 reviews</p>
            </div>
            <span className="text-xs text-gray-500">14 Feb 2024</span>
          </div>

          <div className="flex text-orange-400 mb-2">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      ))}
    </div>
  );
};

export default ServiceReviews;
