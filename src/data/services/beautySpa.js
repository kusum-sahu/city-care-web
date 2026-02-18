const beautySpaData = {
  sidebar: {
    title: "Beauty & Spa",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Salon", img: "/images/beauty/blowdry.png" },
      { name: "Massage", img: "/images/beauty/massage.png" },
      { name: "Hair Care", img: "/images/beauty/hair-care.png" },
      { name: "Facial", img: "/images/beauty/facial.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Best Beauty Spa Service in Orissa",
    "Best Beauty Spa Service in Bhubaneswar",
  ],

  heading: "Popular Beauty & Spa Services in Orissa, Bhubaneswar",

  services: [
    {
      category: "Beauty Salon",
      items: [
        {
          id: "glamour-beauty-spa",

          title: "Glamour Beauty Spa",

          description:
            "Professional beauty & salon services with experienced stylists and premium products.",

          images: ["/images/beauty/blowdry-curl.jpg"],

          rating: 4.8,
          reviews: 120,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Jaydev Vihar, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },

        {
          id: "elite-beauty-studio",

          title: "Elite Beauty Studio",

          description:
            "Complete beauty care including haircut, facial, spa & massage by certified professionals.",

          images: ["/images/beauty/haircut-style.jpg"],

          rating: 4.7,
          reviews: 98,

          badges: {
            trust: true,
            verify: true,
            topSearch: false,
          },

          location: "Sahid Nagar, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },
      ],
    },

    {
      category: "Massage & Therapy",
      items: [
        {
          id: "relax-zone-spa",

          title: "Relax Zone Spa & Massage",

          description:
            "Relaxing body massage & therapy sessions to relieve stress and body pain.",

          images: ["/images/beauty/massage.png"],

          rating: 4.9,
          reviews: 140,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Patia, Bhubaneswar",

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

export default beautySpaData;
