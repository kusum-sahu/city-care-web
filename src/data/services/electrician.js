// const electricianData = {
//   sidebar: {
//     title: "Electrician",
//     categories: [
//       { name: "All", img: "/images/service-item/select-all.png" },
//       { name: "Switch & socket", img: "/images/service-item/Switch & socket.jpg" },
//       { name: "Fan", img: "/images/service-item/fan.png" },
//       { name: "Light", img: "/images/service-item/light.png" },
//       { name: "Wiring", img: "/images/service-item/waring.png" },
//       { name: "Doorbell", img: "/images/service-item/doorbell.png" },
//       { name: "Inverter & stabiliser", img: "/images/service-item/inverter.png" },
//       { name: "MCB & submeter", img: "/images/service-item/mcb.png" },
//       { name: "Appliance", img: "/images/service-item/appliance.png" },
//       { name: "Other", img: "/images/service-item/other.png" },
//     ],
//   },

//   breadcrumb: [
//     "Bhubaneswar",
//     "Best Electrician Service in Orissa",
//     "Best Electrician Service in Bhubaneswar",
//   ],

//   heading: "Popular Electricians in Orissa, Bhubaneswar",

//   services: [
//     {
//       category: "Switch & socket",
//       items: [
//         {
//           title: "Switchbox installation (15+ amp)",
//           images: ["/images/service-item/Switch & socket.jpg"],
//           points: [
//             "Installation only",
//             "Switch box & spare parts sourced separately",
//           ],
//           rating: "4.8",
//           reviews: 120,
//           price: 239,
//           badges: {
//             trust: true,
//             verify: true,
//             topSearch: true,
//           },
//         },
//         {
//           title: "AC switchbox installation",
//           images: ["/images/service-item/acswitch.jpg"],
//           points: [
//             "Installation only",
//             "AC switch box sourced separately",
//           ],
//           rating: "4.8",
//           reviews: 120,
//           price: 239,
//           badges: {
//             trust: true,
//             verify: true,
//             topSearch: false,
//           },
//         },
//       ],
//     },

//     {
//       category: "Fan",
//       items: [
//         {
//           title: "Fan installation",
//           images: ["/images/service-item/fan-repair1.webp"],
//           points: [
//             "Installation only",
//             "Spare parts sourced separately",
//           ],
//           rating: "4.8",
//           reviews: 120,
//           price: 79,
//           badges: {
//             trust: true,
//             verify: true,
//             topSearch: true,
//           },
//         },
//       ],
//     },
//   ],
// };

// export default electricianData;


const electricianData = {
  sidebar: {
    title: "Electrician",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Residential Electrician", img: "/images/service-item/light.png" },
      { name: "Commercial Electrician", img: "/images/service-item/appliance.png" },
      { name: "Wiring & Repair", img: "/images/service-item/waring.png" },
      { name: "Inverter & Stabiliser", img: "/images/service-item/inverter.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Best Electrician Service in Orissa",
    "Best Electrician Service in Bhubaneswar",
  ],

  heading: "Popular Electricians in Orissa, Bhubaneswar",

  services: [
    {
      category: "Residential Electrician",
      items: [
        {
          id: "smart-electric-services",

          title: "Smart Electric Services",

          description:
            "Certified residential electrician for switch, fan, light & wiring installation with quick service.",

          images: ["/images/service-item/light.png"],

          rating: 4.8,
          reviews: 120,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Sahid Nagar, Bhubaneswar",

          actions: {
            enquiry: true,
            call: true,
            whatsapp: true,
            viewDetails: true,
          },
        },

        {
          id: "homefix-electrician",

          title: "HomeFix Electrician",

          description:
            "Expert home electrician for fan installation, switchboard repair & lighting solutions.",

          images: ["/images/service-item/fan.png"],

          rating: 4.7,
          reviews: 98,

          badges: {
            trust: true,
            verify: true,
            topSearch: false,
          },

          location: "Jaydev Vihar, Bhubaneswar",

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
      category: "Commercial Electrician",
      items: [
        {
          id: "pro-electro-solutions",

          title: "Pro Electro Solutions",

          description:
            "Commercial electrician services for offices, shops & buildings including MCB & sub-meter setup.",

          images: ["/images/service-item/mcb.png"],

          rating: 4.9,
          reviews: 145,

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

    {
      category: "Wiring & Repair",
      items: [
        {
          id: "safe-wire-electrician",

          title: "Safe Wire Electrician",

          description:
            "Complete house wiring, rewiring & fault repair using high quality materials.",

          images: ["/images/service-item/waring.png"],

          rating: 4.8,
          reviews: 110,

          badges: {
            trust: true,
            verify: true,
            topSearch: false,
          },

          location: "Khandagiri, Bhubaneswar",

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

export default electricianData;
