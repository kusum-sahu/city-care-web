
// import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

// const TopBar = () => {
//   return (
//     <div className="bg-gray-100 text-gray-800 text-sm">
//       <div className="max-w-7xl mx-auto px-4 py-1 flex flex-wrap items-center justify-between gap-3">

//         {/* Location */}
//         <div className="flex items-center gap-2 bg-white px-3 py-1 shadow-sm">
//           <FaMapMarkerAlt className="text-teal-500" />
//           <img
//             src="https://flagcdn.com/w20/in.png"
//             alt="India"
//             className="w-4 h-3"
//           />
//           <span className="text-gray-700 font-medium">
//             Bhubaneswar
//           </span>
//         </div>

//         {/* Offers */}
//         <div className="hidden md:flex flex-wrap gap-2 justify-center">
//           {[
//             "1 Day Painting Service",
//             "AC Repairing",
//             "Packer's & Movers",
//           ].map((text, i) => (
//             <span
//               key={i}
//               className="flex items-center gap-1 bg-[#3bb77e] text-white px-3 py-1 rounded-md text-xs"
//             >
//               <img
//                 src="/public/images/new_icon.gif"
//                 alt="New"
//                 className="w-5 h-5"
//               />
//               New {text}
//             </span>
//           ))}
//         </div>

//         <div className="flex items-stretch overflow-hidden rounded-md shadow-sm">

//           {/* Left Icon */}
//           <div className="bg-white px-3 py-1 flex items-center justify-center">
//             <FaPhoneAlt className="text-[#3bb77e]" />
//           </div>

//           {/* Right Text */}
//           <div className="bg-[#3bb77e] text-white px-5 py-1 font-medium">
//             Call: 01234 56789
//           </div>

//         </div>

//       </div>
//     </div>
//   );
// };

// export default TopBar;


import { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const TopBar = () => {
  const [city, setCity] = useState("Bhubaneswar");
  const [showModal, setShowModal] = useState(false);
  const [manualCity, setManualCity] = useState("");

  // Load saved city on page load
  useEffect(() => {
    const savedCity = localStorage.getItem("userCity");
    if (savedCity) {
      setCity(savedCity);
    }
  }, []);

  // Auto detect location
  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported in this browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();

          const detectedCity =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.state;

          setCity(detectedCity);
          localStorage.setItem("userCity", detectedCity);
          setShowModal(false);
        } catch (err) {
          alert("Unable to fetch location");
        }
      },
      () => alert("Location permission denied")
    );
  };

  // Manual city save
  const handleManualSave = () => {
    if (!manualCity.trim()) return;

    setCity(manualCity);
    localStorage.setItem("userCity", manualCity);
    setShowModal(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="bg-gray-100 text-gray-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-1 flex flex-wrap items-center justify-between gap-3">

          {/* LOCATION */}
          <div
            className="flex items-center gap-2 bg-white px-3 py-1 shadow-sm cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <FaMapMarkerAlt className="text-teal-500" />
            <img
              src="https://flagcdn.com/w20/in.png"
              alt="India"
              className="w-4 h-3"
            />
            <span className="text-gray-700 font-medium">
              {city}
            </span>
          </div>

          {/* OFFERS */}
          <div className="hidden md:flex flex-wrap gap-2 justify-center">
            {[
              "1 Day Painting Service",
              "AC Repairing",
              "Packer's & Movers",
            ].map((text, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-[#3bb77e] text-white px-3 py-1 rounded-md text-xs"
              >
                <img
                  src="/public/images/new_icon.gif"
                  alt="New"
                  className="w-5 h-5"
                />
                New {text}
              </span>
            ))}
          </div>

          {/* CALL */}
          <div className="flex items-stretch overflow-hidden rounded-md shadow-sm">
            <div className="bg-white px-3 py-1 flex items-center justify-center">
              <FaPhoneAlt className="text-[#3bb77e]" />
            </div>
            <div className="bg-[#3bb77e] text-white px-5 py-1 font-medium">
              Call: 01234 56789
            </div>
          </div>

        </div>
      </div>

      {/* LOCATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-80 p-5 rounded-lg shadow-lg">

            <h3 className="text-lg font-semibold mb-4">
              Select Your Location
            </h3>

            <button
              onClick={detectLocation}
              className="w-full bg-[#3bb77e] text-white py-2 rounded mb-3"
            >
              📍 Use my current location
            </button>

            <div className="text-center text-gray-400 text-sm mb-2">
              OR
            </div>

            <input
              type="text"
              placeholder="Enter city name"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              className="border w-full px-3 py-2 rounded mb-3"
            />

            <button
              onClick={handleManualSave}
              className="w-full border border-[#3bb77e] text-[#3bb77e] py-2 rounded"
            >
              Save Location
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default TopBar;
