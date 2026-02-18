// ================= WhyChooseUsItem =================
const WhyChooseUsItem = ({ icon, title }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <img
        src={icon}
        alt={title}
        className="h-16 mb-3"
      />
      <p className="text-sm font-medium text-gray-800">
        {title}
      </p>
    </div>
  );
};

// ================= WhyChooseUs =================
const WhyChooseUs = () => {
  const data = [
    { title: "Trained Professional", icon: "/public/images/service-icon/mechanic.png" },
    { title: "100%-Guarantee", icon: "/public/images/service-icon/Guarantee.png" },
    { title: "Best Price Best Work", icon: "/public/images/service-icon/best-price.png" },
    { title: "Service Warranty", icon: "/public/images/service-icon/warranty.png" },
    { title: "Certified", icon: "/public/images/service-icon/certified.png" },
    { title: "Trained Professional", icon: "/public/images/service-icon/mechanic.png" },
  ];

  return (
    <section className="bg-[#e6f1f8]">
      <div className="max-w-7xl mx-auto px-4 py-[30px]">
       {/* <div className="max-w-7xl mx-auto px-4 pt-10 pb-14"> */}
        <h2 className="text-2xl font-semibold mb-10 text-gray-900">
          Why Choose Us ?
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
          {data.map((item, index) => (
            <WhyChooseUsItem
              key={index}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
