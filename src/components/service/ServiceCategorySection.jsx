import ServiceItemCard from "./ServiceItemCard";

const ServiceCategorySection = ({ services = [] }) => {

  // 🔴 NO CATEGORY / NO SERVICE AT ALL
  if (!services.length) {
    return (
      <div className="text-center py-20 text-gray-500">
        <p className="text-lg font-semibold">
          No service available
        </p>
        <p className="text-sm mt-1">
          Please select another category
        </p>
      </div>
    );
  }

  return (
    <>
      {services.map((group, i) => {

        // 🟡 CATEGORY EXISTS BUT EMPTY
        if (!group.items || group.items.length === 0) {
          return (
            <div key={i} className="mb-10">
              <h3 className="text-lg font-semibold mb-4">
                {group.category}
              </h3>

              <p className="text-gray-500 text-sm">
                No service available in this category
              </p>
            </div>
          );
        }

        return (
          <div key={i} className="mb-10">
            <h3 className="text-lg font-semibold mb-4">
              {group.category}
            </h3>

            {group.items.map((item, index) => (
              <ServiceItemCard
                key={index}
                data={item}
              />
            ))}
          </div>
        );
      })}
    </>
  );
};

export default ServiceCategorySection;
