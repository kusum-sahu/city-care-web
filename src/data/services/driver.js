const driverData = {
  sidebar: {
    title: "Driver",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Driving School", img: "/images/driver/driving-school.png" },
      { name: "Car Training", img: "/images/driver/car-training.png" },
      { name: "Two Wheeler", img: "/images/driver/two-wheeler.png" },
      { name: "Commercial", img: "/images/driver/commercial.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Motor Training Schools in Bhubaneswar",
    "Motor Training Schools in Orissa Assembly",
  ],

  heading: "Popular Motor Training Schools in Orissa Assembly, Bhubaneswar",

  services: [
    {
      category: "Driving School",
      items: [
        {
          id: "driveasy-training-lab", // ✅ REQUIRED

          title: "Driveasy Training Lab",

          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque pariatur minima, molestiae soluta non!",

          images: ["/images/driver/driver-license.png"],

          rating: 4.8,
          reviews: 120,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Khordha Jagamara, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },

        {
          id: "driveasy-training-lab-2", // ✅ UNIQUE ID

          title: "Driveasy Training Lab",

          description:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem atque pariatur minima, molestiae soluta non!",

          images: ["/images/driver/driver-license.png"],

          rating: 4.8,
          reviews: 120,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Khordha Jagamara, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },
      ],
    },
  ],
};

export default driverData;
