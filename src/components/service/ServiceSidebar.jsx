const ServiceSidebar = ({ title, categories, activeIndex = 0, onSelect }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">
        {title}
      </h3>

      <div className="grid grid-cols-3 gap-4">
        {categories.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect(item.name, i)}
            className={`group flex flex-col overflow-hidden rounded-xl border cursor-pointer transition-all
              ${
                i === activeIndex
                  ? "border-emerald-500 ring-1 ring-emerald-500"
                  : "border-gray-200 hover:border-emerald-500"
              }`}
          >
            {/* Image */}
            <div className="bg-gray-100 p-4 flex items-center justify-center h-24">
              <img
                src={item.img}
                alt={item.name}
                className="max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>

            {/* Name */}
            <div className="bg-white p-2 flex items-center justify-center min-h-[48px]">
              <p className="text-[11px] font-medium text-gray-600 text-center">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSidebar;
