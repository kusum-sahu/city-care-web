import { useParams } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import axios from "axios";

import PublicLayout from "../../../layouts/PublicLayout";
import ServiceLayout from "../../../layouts/ServiceLayout";
import ServiceSidebar from "../../../components/service/ServiceSidebar";
import ServiceCategorySection from "../../../components/service/ServiceCategorySection";

const ServicePage = () => {
  const { serviceType } = useParams();

  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setActiveCategory("All");
    setActiveIndex(0);

    axios
      .get(`http://localhost:5000/api/services/${serviceType}`)
      .then((res) => {
        const data = res.data.data || [];

        const grouped = Object.values(
          data.reduce((acc, item) => {

            if (!acc[item.category_slug]) {
              acc[item.category_slug] = {
                category: item.category_name,
                slug: item.category_slug,
                items: [],
              };
            }

            // acc[item.category_slug].items.push({
            //   id: item.id,
            //   title: item.name,
            //   description: item.description,
            //   price: item.price,
            //   duration: item.duration_minutes,
            //   images: [item.image],
            //   rating: 4.8,
            //   reviews: 120,
            //   location: "Bhubaneswar",
            //   actions: {
            //     enquiry: true,
            //     call: true,
            //     whatsapp: true,
            //     viewDetails: true,
            //   },
            // });

            acc[item.category_slug].items.push({
              id: item.id,
              title: item.name,
              description: item.description,
              price: item.price,
              duration: item.duration_minutes,
              images: [item.image],
              rating: item.rating,
              reviews: item.reviews,
              badges: item.badges,
              actions: item.actions,
              location: "Bhubaneswar",
            });
            return acc;
          }, {})
        );
        setServices(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Service fetch error:", err);
        setServices([]);
        setLoading(false);
      });
  }, [serviceType]);


  const filteredServices = useMemo(() => {
    if (activeCategory === "All") return services;

    return services.filter(
      (group) => group.category === activeCategory
    );
  }, [activeCategory, services]);

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <PublicLayout>
      <ServiceLayout />

      <section className="bg-[#f6fbff] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">

            {/* LEFT SIDEBAR */}
            <div className="col-span-12 md:col-span-3">
              <ServiceSidebar
                title={serviceType}
                categories={[
                  { name: "All", img: "/images/service-item/select-all.png" },
                  ...services.map((s) => ({
                    name: s.category,
                    img: "/images/service-item/other.png",
                  })),
                ]}
                activeIndex={activeIndex}
                onSelect={(name, index) => {
                  setActiveCategory(name);
                  setActiveIndex(index);
                }}
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="col-span-12 md:col-span-9 bg-white p-4 rounded shadow-sm">

              {loading ? (
                <div className="text-center py-20 text-gray-500">
                  Loading services...
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  No service available
                </div>
              ) : (
                <ServiceCategorySection services={filteredServices} />
              )}

            </div>

          </div>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServicePage;
