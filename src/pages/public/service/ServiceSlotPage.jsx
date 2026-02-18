import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { ChevronRight } from "lucide-react";

import PublicLayout from "../../../layouts/PublicLayout";
import ServiceLayout from "../../../layouts/ServiceLayout";

const ServiceSlotPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const passedService = location.state?.service;

  const [serviceInfo, setServiceInfo] = useState({
    title: passedService?.title || "",
    price: passedService?.price || 0,
    duration: passedService?.duration || 0
  });


  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d.toISOString().split("T")[0],
      day: d.toLocaleDateString("en-US", { weekday: "short" }),
      date: d.getDate(),
    };
  });

  useEffect(() => {
    setLoading(true);
    setSelectedSlot(null);

    axios
      .get(`http://localhost:5000/api/services/${serviceId}/slots`, {
        params: { date: selectedDate }
      })
      .then((res) => {
        setAvailableSlots(res.data.slots || []);
        // ✅ Dynamic Price yahan set ho raha hai
        setServiceInfo({
          title: res.data.service_name || "Select slot",
          price: res.data.service_price || 0,
          duration: res.data.service_duration || 0,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching slots:", err);
        setAvailableSlots([]);
        setLoading(false);
      });
  }, [serviceId, selectedDate]);

  return (
    <PublicLayout>
      <ServiceLayout />

      {/* pb-24 use kiya hai taaki extra blank space khatam ho jaye */}
      <section className="bg-[#f8f9fa] pt-6 pb-10">
        <div className="max-w-2xl mx-auto px-4">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              {serviceInfo.title}
            </h1>
            <p className="text-gray-500 mt-1">
              Your service will take approx. {serviceInfo.duration} mins
            </p>
          </div>

          {/* DATE SELECTOR */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Select Date
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dates.map((item) => (
                <button
                  key={item.full}
                  onClick={() => setSelectedDate(item.full)}
                  className={`flex-shrink-0 w-16 py-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-1
                    ${selectedDate === item.full
                      ? "border-[#023a20] bg-[#023a20] text-white"
                      : "border-gray-100 bg-white text-gray-600"
                    }`}
                >
                  <span className="text-[10px] font-medium uppercase">{item.day}</span>
                  <span className="text-lg font-bold">{item.date}</span>
                </button>
              ))}
            </div>
          </div>

          {/* TIME SLOTS */}
          <div className="mb-10">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
              Select Time
            </h3>

            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#023a20]"></div>
              </div>
            ) : (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = selectedSlot?.start_time === slot.start_time;
                  return (
                    <button
                      key={slot.start_time}
                      onClick={() => setSelectedSlot(slot)}
                      className={`py-2 px-1 rounded-lg border-2 transition-all text-center flex flex-col items-center justify-center
                        ${isSelected
                          ? "border-[#023a20] bg-[#023a20] text-white"
                          : "border-gray-200 bg-white"
                        }`}
                    >
                      <p className={`text-[11px] font-bold ${isSelected ? "text-white" : "text-gray-800"}`}>
                        {slot.label.split(" - ")[0]}
                      </p>
                      <p className={`text-[8px] font-medium mt-0.5 ${isSelected ? "text-green-100" : "text-gray-400"}`}>
                        Available
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* STICKY FOOTER - Border hat gaya, Shadow add kiya */}
        <div className="fixed bottom-0 left-0 right-0 bg-white z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div className="max-w-2xl mx-auto flex items-center justify-between px-6 py-4">
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-wider">
                Total Price
              </p>
              <p className="text-2xl font-black text-gray-900 leading-none">
                {/* ₹0 ke bajaye actual price display */}
                ₹{serviceInfo.price}
              </p>
            </div>

            <button
              onClick={() => navigate("/booking/summary", {
                state: {
                  serviceInfo: {
                    id: passedService?.id,   // 👈 VERY IMPORTANT
                    title: serviceInfo.title,
                    price: serviceInfo.price,
                    duration: serviceInfo.duration
                  },
                  slot: selectedSlot,
                  selectedDate
                }
              })
              }
              disabled={!selectedSlot}
              className={`group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all active:scale-95
                ${selectedSlot
                  ? "bg-[#023a20] text-white shadow-lg shadow-green-900/20"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
            >
              Proceed to Pay
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServiceSlotPage;

