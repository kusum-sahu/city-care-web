import {
  FaHeart,
  FaPhoneAlt,
  FaWhatsapp,
  FaCheckCircle,
  FaShieldAlt, FaMapMarkerAlt,
  FaBolt,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EnquiryModal from "../common/EnquiryModal";

const ServiceItemCard = ({ data }) => {
  const navigate = useNavigate();
  const { serviceType } = useParams();

  const [openEnquiry, setOpenEnquiry] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const isListingType = !!data.description;

  const handleViewDetails = () => {
    if (!data.id) {
      console.error("Missing service id", data);
      return;
    }
    navigate(`/service/${serviceType}/${data.id}`);
  };

const handleBookNow = () => {
  navigate(`/service/${serviceType}/${data.id}/slot`, {
    state: {
      service: data
    }
  });
};

  return (
    <>
      <div className="bg-[#f3f3f3] border border-[#eeeeee] rounded-md p-4 mb-6 relative transition-all hover:bg-white hover:shadow-xl">

        {/* ❤️ Wishlist */}
        <div
          onClick={() => setWishlisted(!wishlisted)}
          className={`absolute top-4 right-4 cursor-pointer text-xl transition
            ${wishlisted ? "text-red-600" : "text-gray-400"}
          `}
        >
          <FaHeart />
        </div>

        <div className="grid grid-cols-12 gap-4">

          {/* IMAGE */}
          <div className="col-span-12 md:col-span-4">
            <div className="bg-white border border-[#dedede] rounded p-3 h-[250px] flex items-center justify-center">
              <img
                src={data.images?.[0]}
                alt={data.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="col-span-12 md:col-span-8">

            {/* TITLE */}
            <h4 className="font-semibold text-lg mb-1 text-[#023a20]">
              {data.title}
            </h4>

            {/* 💰 PRICE + DURATION */}
            <div className="mb-2">
              <span className="text-xl font-bold text-black">
                ₹ {data.price}
              </span>
              {data.duration && (
                <span className="text-sm text-gray-500 ml-2">
                  • {data.duration} mins
                </span>
              )}
            </div>

            {/* DESCRIPTION + LOCATION */}
            {isListingType && (
              <>
                <p className="text-sm text-gray-600 mb-2">
                  {data.description}
                </p>
                <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500 text-sm" />
                  {data.location}
                </p>
              </>
            )}

            {/* ⭐ Rating + Badges */}
            <div className="flex flex-wrap items-center gap-3 text-sm mb-4">

              <span className="bg-green-700 text-white px-2 py-1 rounded font-medium">
                {data.rating}
              </span>

              <span className="text-gray-500">
                {data.reviews} Rating
              </span>

              {data.badges?.trust && (
                <span className="flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded text-xs">
                  <FaShieldAlt /> Trust
                </span>
              )}

              {data.badges?.verify && (
                <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-xs">
                  <FaCheckCircle /> Verify
                </span>
              )}

              {data.badges?.topSearch && (
                <span className="flex items-center gap-1 bg-indigo-700 text-white px-2 py-1 rounded text-xs">
                  <FaBolt /> Top Search
                </span>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap gap-3">

              {data.actions?.enquiry && (
                <button
                  onClick={() => setOpenEnquiry(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Send Enquiry
                </button>
              )}

              {data.actions?.call && (
                <button className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2">
                  <FaPhoneAlt /> Call Us
                </button>
              )}

              {data.actions?.whatsapp && (
                <button className="bg-white border px-4 py-2 rounded flex items-center gap-2">
                  <FaWhatsapp className="text-green-500" /> Chat
                </button>
              )}

              <button
                onClick={handleBookNow}
                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
              >
                Book Now
              </button>

              <button
                onClick={handleViewDetails}
                className="bg-[#023a20] text-white px-4 py-2 rounded hover:bg-[#012a18]"
              >
                View Details
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ENQUIRY MODAL */}
      <EnquiryModal
        open={openEnquiry}
        onClose={() => setOpenEnquiry(false)}
        serviceName={data.title}
      />
    </>
  );
};

export default ServiceItemCard;
