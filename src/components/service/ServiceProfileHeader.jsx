import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaStar,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const ServiceProfileHeader = ({ data }) => {
  const navigate = useNavigate();

  if (!data) return null;

  return (
    <div className="bg-white p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="text-2xl font-semibold text-[#023a20] mb-2">
            {data.title}
          </h1>
          {data.description && (
            <p className="text-gray-600 mb-3">
              {data.description}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
            <span className="bg-green-700 text-white px-2 py-1 rounded font-medium">
              {data.rating}
            </span>

            <div className="flex text-orange-400">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-gray-500">
              {data.reviews} Rating
            </span>

            {data.badges?.trust && (
              <span className="bg-orange-400 text-white px-2 py-1 rounded text-xs">
                Trust
              </span>
            )}

            {data.badges?.verify && (
              <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">
                Verify
              </span>
            )}

            {data.badges?.topSearch && (
              <span className="bg-indigo-900 text-white px-2 py-1 rounded text-xs">
                Top Search
              </span>
            )}
          </div>
          {data.location && (
            <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-gray-500" />
              {data.location}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mt-4">

            {data.actions?.enquiry && (
              <button className="bg-green-500 text-white px-4 py-2 rounded">
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
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="border rounded-lg overflow-hidden">

            <div className="bg-[#023a20] text-white text-center py-2 font-semibold">
              Address
            </div>

            <div className="p-4 text-sm text-gray-700 space-y-3">
              <p>
                Plot Number -101, Market Street,<br />
                Sahid Nagar, Bhubaneswar – 751007<br />
                (Near Bishnu Mandir)
              </p>

              <div className="border-t pt-3 flex items-center gap-2 cursor-pointer">
                <FaEnvelope className="text-green-700" />
                Send Inquiry By Mail
              </div>
              <div className="border-t pt-3">
                <button
                  onClick={() =>
                    navigate(`/service/${data.type}/${data.id}/rate`)
                  }
                  className="text-green-700 font-medium"
                >
                  ⭐ Tap to Rate
                </button>
              </div>

              <div className="border-t pt-3 cursor-pointer">
                🌐 View Website
              </div>

              <div className="border-t pt-3 cursor-pointer">
                🧾 GSTIN: 21AEDFS6685JIZP
              </div>

              <div className="border-t pt-3 cursor-pointer flex items-center gap-2">
                <FaMapMarkerAlt /> View On Map
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ServiceProfileHeader;
