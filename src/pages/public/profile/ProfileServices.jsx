const services = [
  {
    id: 1,
    title: "Switchbox installation (15+ amp)",
    type: "Installation only",
    price: 239,
    date: "Completed on Apr 29",
    img: "/images/service-item/switch-1.png",
  },
  {
    id: 2,
    title: "AC switchbox installation",
    type: "Installation only",
    price: 319,
    date: "Completed on Apr 29",
    img: "/images/service-item/modular-mcb-ac-box.jpg",
  },
  {
    id: 3,
    title: "Fan installation",
    type: "Installation only",
    price: 279,
    date: "Completed on Apr 29",
    img: "/images/service-item/fan-repair2.jpg",
  },
  {
    id: 4,
    title: "Bulb / Tubelight holder installation",
    type: "Installation only",
    price: 239,
    date: "Completed on Apr 29",
    img: "/images/service-item/holder.png",
  },
  {
    id: 5,
    title: "Doorbell installation",
    type: "Installation only",
    price: 239,
    date: "Completed on Apr 29",
    img: "/images/service-item/doorbell.jpg",
  },
  {
    id: 6,
    title: "Inverter installation",
    type: "Installation only",
    price: 559,
    date: "Completed on Apr 29",
    img: "/images/service-item/invertor.png",
  },
];

const ProfileServices = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          My Services
        </h2>

        <div className="space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border p-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

                {/* LEFT: IMAGE + TITLE */}
                <div className="md:col-span-5 flex items-center gap-4">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <h5 className="font-semibold text-gray-800">
                      {service.title}
                    </h5>
                    <span className="text-sm text-gray-500">
                      {service.type}
                    </span>
                  </div>
                </div>

                {/* PRICE */}
                <div className="md:col-span-2 text-gray-800 font-semibold">
                  ₹ {service.price}
                </div>

                {/* STATUS */}
                <div className="md:col-span-3">
                  <p className="font-semibold text-gray-700">
                    {service.date}
                  </p>
                  <small className="text-green-600">
                    Your service has been completed
                  </small>
                </div>

                {/* RATING */}
                <div className="md:col-span-2">
                  <p className="text-sm font-semibold mb-1">
                    Rate Your Service
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="cursor-pointer text-gray-300 hover:text-yellow-400 text-lg"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProfileServices;
