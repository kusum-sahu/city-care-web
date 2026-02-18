import { FaChevronCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ServiceCategoryCard = ({ name, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="
        group
        rounded-2xl p-6 flex flex-col items-center justify-center
        cursor-pointer border border-transparent
        bg-orange-50
        transition-all duration-300 ease-in-out

        hover:bg-green-100
        hover:border-green-400
        hover:shadow-lg
        hover:scale-105
      "
    >
      <img
        src={icon}
        alt={name}
        className="h-14 w-14 mb-4"
      />

      <p className="
        text-sm font-medium text-gray-800 text-center
        group-hover:text-green-700
      ">
        {name}
      </p>
    </div>
  );
};

const ServiceCategory = () => {
  const navigate = useNavigate();

const services = [
  {
    name: "Electrician",
    icon: "/public/images/service-icon/electrician.png",
    path: "/service/electrician",
    active: true,
  },
  {
    name: "Priest",
    icon: "/public/images/service-icon/priest.png",
    path: "/service/priest",
  },
  {
    name: "Driver",
    icon: "/public/images/service-icon/driver.png",
    path: "/service/driver",
  },
  {
    name: "Plumber",
    icon: "/public/images/service-icon/plumber.png",
    path: "/service/plumber",
  },
  {
    name: "Physiotherapy",
    icon: "/public/images/service-icon/physical-therapy.png",
    path: "/service/physiotherapy",
  },
  {
    name: "Beauty Spa",
    icon: "/public/images/service-icon/Beauty Spa.png",
    path: "/service/beauty-spa",
  },
  {
    name: "Popular Categories",
    icon: "/public/images/service-icon/Popular Categories.png",
    path: "/categories",
  },
];

  return (
    <section className="max-w-7xl mx-auto px-4 py-[30px]">
    {/* <section className="max-w-7xl mx-auto px-4 pt-10 pb-4"> */}
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Service Category
        </h2>
        <a className="flex items-center gap-2 text-green-600 text-sm font-medium">
          View All Product <FaChevronCircleRight />
        </a>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
        {services.map((service, index) => (
          <ServiceCategoryCard
            key={index}
            name={service.name}
            icon={service.icon}
            active={service.active}
            onClick={() => navigate(service.path)}
          />
        ))}
      </div>
    </section>
  );
};

export default ServiceCategory;
