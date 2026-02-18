// import { useParams } from "react-router-dom";
// import PublicLayout from "../../../layouts/PublicLayout";
// import ServiceLayout from "../../../layouts/ServiceLayout";
// // data
// import electricianData from "../../../data/services/electrician";
// import driverData from "../../../data/services/driver";
// import plumberData from "../../../data/services/plumber";
// import priestData from "../../../data/services/priest";
// import physiotherapyData from "../../../data/services/physiotherapy";
// import beautySpaData from "../../../data/services/beautySpa";
// // components
// import ServiceProfileHeader from "../../../components/service/ServiceProfileHeader";
// import ServiceGallery from "../../../components/service/ServiceGallery";
// import ServiceReviews from "../../../components/service/ServiceReviews";

// const SERVICE_MAP = {
//   electrician: electricianData,
//   driver: driverData,
//   plumber: plumberData,
//   priest: priestData,
//   physiotherapy: physiotherapyData,
//   "beauty-spa": beautySpaData,
// };

// const ServiceDetailsPage = () => {
//   const { serviceType, serviceId } = useParams();
//   const data = SERVICE_MAP[serviceType];

//   if (!data) return <div className="p-10">Service not found</div>;

//   const serviceItem = data.services
//     .flatMap((cat) => cat.items)
//     .find((item) => item.id === serviceId);

//   if (!serviceItem) return <div className="p-10">Details not found</div>;
// return (
//   <PublicLayout>
//     <ServiceLayout />

//     <section className="bg-[#f6fbff] py-8">
//   <div className="max-w-7xl mx-auto px-4">

//     {/* WHITE MAIN BLOCK */}
//     <div className="bg-white border border-gray-300 rounded-lg">

//       {/* BREADCRUMB */}
//       <div className="text-sm text-gray-500 px-6 pt-4">
//         Bhubaneswar › Best plumber in Orissa Assembly ›{" "}
//         <span className="text-gray-800 font-medium">
//           Best plumber in Bhubaneswar
//         </span>
//       </div>

//       {/* PAGE HEADING */}
//       <h2 className="text-2xl font-semibold px-6 py-4">
//         Popular Best plumber in Orissa, Bhubaneswar
//       </h2>

//       {/* PROFILE HEADER */}
//       <ServiceProfileHeader data={serviceItem} />

//     </div>

//     {/* BELOW SECTIONS */}
//     <ServiceGallery images={serviceItem.images} />
//     <ServiceReviews rating={serviceItem.rating} reviews={serviceItem.reviews} />

//   </div>
// </section>

//   </PublicLayout>
// );

// };

// export default ServiceDetailsPage;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import PublicLayout from "../../../layouts/PublicLayout";
import ServiceLayout from "../../../layouts/ServiceLayout";

import ServiceProfileHeader from "../../../components/service/ServiceProfileHeader";
import ServiceGallery from "../../../components/service/ServiceGallery";
import ServiceReviews from "../../../components/service/ServiceReviews";

const ServiceDetailsPage = () => {
  const { serviceId } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/services/details/${serviceId}`)
      .then((res) => {
        const s = res.data.data;

        setService({
          id: s.id,
          title: s.name,
          description: s.description,
          price: s.price,
          duration: s.duration_minutes,
          rating: 4.8,          
          reviews: 152,
          images: ["/images/default.png"], 
          location: "Bhubaneswar",
          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },
          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
          },
        });

        setLoading(false);
      })
      .catch(() => {
        setService(null);
        setLoading(false);
      });
  }, [serviceId]);

  if (loading) {
    return <div className="p-10 text-center">Loading service details...</div>;
  }

  if (!service) {
    return <div className="p-10 text-center">Service not found</div>;
  }

  return (
    <PublicLayout>
      <ServiceLayout />

      <section className="bg-[#f6fbff] py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white border border-gray-300 rounded-lg">
            <div className="text-sm text-gray-500 px-6 pt-4">
              Bhubaneswar › {service.title}
            </div>
            <h2 className="text-2xl font-semibold px-6 py-4">
              {service.title}
            </h2>
            <ServiceProfileHeader data={service} />
          </div>
          <ServiceGallery images={service.images} />
          <ServiceReviews
            rating={service.rating}
            reviews={service.reviews}
          />
        </div>
      </section>
    </PublicLayout>
  );
};

export default ServiceDetailsPage;
