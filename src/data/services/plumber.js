const plumberData = {
  sidebar: {
    title: "Plumber",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Bathroom", img: "/images/plumber/bathroom.png" },
      { name: "Kitchen", img: "/images/plumber/kitchen.png" },
      { name: "Pipeline", img: "/images/plumber/pipeline.png" },
      { name: "Water Tank", img: "/images/plumber/water-tank.png" },
      { name: "Toilet Repair", img: "/images/plumber/toilet.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Best Plumber in Orissa",
    "Best Plumber in Bhubaneswar",
  ],

  heading: "Popular Plumber in Orissa, Bhubaneswar",

  services: [
    {
      category: "Top Plumbers",
      items: [
        {
          title: "Rudra Narayana Sahoo",
          images: ["/images/plumber/plumber-1.jpg"],
          description:
            "Experienced plumber offering professional bathroom, kitchen, and pipeline repair services with quick response and affordable pricing.",
          rating: "4.8",
          reviews: 120,
          location: "Khordha Jagamara, Bhubaneswar",

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            details: true,
          },
        },

        {
          title: "Satyajit Plumbing Services",
          images: ["/images/plumber/plumber-2.jpg"],
          description:
            "Reliable plumbing solutions for homes and offices including leakage fixing, toilet repair, and water tank maintenance.",
          rating: "4.7",
          reviews: 98,
          location: "Patia, Bhubaneswar",

          badges: {
            trust: true,
            verify: true,
            topSearch: false,
          },

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            details: true,
          },
        },
      ],
    },
  ],
};

export default plumberData;
