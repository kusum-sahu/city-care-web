const priestData = {
  sidebar: {
    title: "Priest Service",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Daily Puja", img: "/images/priest/daily-puja.png" },
      { name: "Archana", img: "/images/priest/archana.png" },
      { name: "Abhisekam", img: "/images/priest/abhisekam.png" },
      { name: "Ceremonies", img: "/images/priest/ceremony.png" },
      { name: "Gruha Pujas", img: "/images/priest/gruha-puja.png" },
      { name: "Homams", img: "/images/priest/homam.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Best Priest Service in Orissa",
    "Best Priest Service in Bhubaneswar",
  ],

  heading: "Popular Priests in Orissa, Bhubaneswar",

  services: [
    {
      category: "Daily Puja Services",
      items: [
        {
          id: "pandit-sharma-daily-puja",

          title: "Pandit Sharma – Daily Puja Specialist",

          description:
            "Experienced priest for daily home & office puja with proper Vedic rituals.",

          images: ["/images/priest/daily-home-puja.jpg"],

          rating: 4.8,
          reviews: 120,

          badges: {
            trust: true,
            verify: true,
            topSearch: false,
          },

          location: "Old Town, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },

        {
          id: "pandit-mishra-office-puja",

          title: "Pandit Mishra – Office & Commercial Puja",

          description:
            "Professional priest for office puja, shop opening puja and daily rituals.",

          images: ["/images/priest/daily-office-puja.jpg"],

          rating: 4.7,
          reviews: 95,

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
      category: "Archana & Temple Services",
      items: [
        {
          id: "pandit-rath-shiva-archana",

          title: "Pandit Rath – Shiva Archana Specialist",

          description:
            "Special archana services for Lord Shiva with complete pooja vidhi.",

          images: ["/images/priest/shiva-archana.jpg"],

          rating: 4.9,
          reviews: 135,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Lingaraj Temple Area, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },

        {
          id: "pandit-acharya-hanuman-archana",

          title: "Pandit Acharya – Hanuman Archana",

          description:
            "Archana & special pooja services for Sri Anjaneya (Hanuman Ji).",

          images: ["/images/priest/anjaneya-archana.jpg"],

          rating: 4.8,
          reviews: 110,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Unit-3, Bhubaneswar",

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
      category: "Gruha Puja & Ceremonies",
      items: [
        {
          id: "pandit-nayak-gruha-puja",

          title: "Pandit Nayak – Gruha Pravesh & Homam",

          description:
            "Gruha pravesh, vastu puja, homam & marriage ceremony specialist.",

          images: ["/images/priest/gruha-puja.png"],

          rating: 4.9,
          reviews: 150,

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

export default priestData;
