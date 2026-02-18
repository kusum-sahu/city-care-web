const physiotherapyData = {
  sidebar: {
    title: "Physiotherapy",
    categories: [
      { name: "All", img: "/images/service-item/select-all.png" },
      { name: "Orthopedic", img: "/images/physiotherapy/orthopedic.png" },
      { name: "Neurology", img: "/images/physiotherapy/neurology.png" },
      { name: "Paediatric", img: "/images/physiotherapy/paediatric.png" },
      { name: "Geriatric", img: "/images/physiotherapy/geriatric.png" },
      { name: "Sports Rehab", img: "/images/physiotherapy/sports-rehab.png" },
      { name: "Other", img: "/images/service-item/other.png" },
    ],
  },

  breadcrumb: [
    "Bhubaneswar",
    "Best Physiotherapist in Orissa",
    "Best Physiotherapist in Bhubaneswar",
  ],

  heading: "Popular Physiotherapists in Orissa, Bhubaneswar",

  services: [
    {
      category: "Orthopedic Physiotherapist",
      items: [
        {
          id: "dr-amit-ortho-physio",

          title: "Dr. Amit Orthopedic Physiotherapy Clinic",

          description:
            "Specialized physiotherapy treatment for knee pain, back pain and joint rehabilitation.",

          images: ["/images/physiotherapy/knee-pain.jpg"],

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
          id: "joint-care-physio",

          title: "Joint Care Physiotherapy Center",

          description:
            "Advanced orthopedic physiotherapy for neck pain, spine issues and post-surgery rehab.",

          images: ["/images/physiotherapy/neck-pain.jpg"],

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
      category: "Neurology Physiotherapist",
      items: [
        {
          id: "neuro-motion-physio",

          title: "Neuro Motion Physiotherapy Clinic",

          description:
            "Expert neurological physiotherapy for stroke, paralysis and Parkinson’s disease.",

          images: ["/images/physiotherapy/paralysis-stroke.jpg"],

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

        {
          id: "brain-spine-rehab",

          title: "Brain & Spine Rehab Center",

          description:
            "Comprehensive neuro rehabilitation including GBS and spinal injury recovery.",

          images: ["/images/physiotherapy/gbs.jpg"],

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

    {
      category: "Paediatric Physiotherapist",
      items: [
        {
          id: "kids-care-physio",

          title: "Kids Care Physiotherapy Clinic",

          description:
            "Paediatric physiotherapy for developmental delay and cerebral palsy therapy.",

          images: ["/images/physiotherapy/developmental-delay.jpg"],

          rating: 4.8,
          reviews: 105,

          badges: {
            trust: true,
            verify: true,
            topSearch: true,
          },

          location: "Unit-4, Bhubaneswar",

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

export default physiotherapyData;
