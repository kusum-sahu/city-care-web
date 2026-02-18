import React, { useState } from 'react';
import { FaChevronCircleRight, FaFolderOpen, FaUser, FaCalendarAlt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import NextPreviousNavBtn from "../common/NextPreviousNavBtn";

/* ================= BLOG CARD (LEFT) ================= */
const BlogCard = ({ image, date, month, title, desc }) => {
  return (
    <div className="bg-[#f4fbff] rounded-xl overflow-hidden shadow-sm h-full">
      {/* Image */}
      <div className="relative">
        <img src={image} alt={title} className="w-full h-56 object-cover" />

        {/* Date badge */}
        <div className="absolute top-3 left-3 bg-green-600 text-white text-center px-3 py-2 rounded-md leading-tight">
          <div className="text-lg font-bold">{date}</div>
          <div className="text-xs uppercase">{month}</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <ul className="flex gap-4 text-xs text-gray-500 mb-3">
          <li className="flex items-center gap-1">
            <FaFolderOpen /> Marketing
          </li>
          <li className="flex items-center gap-1">
            <FaUser /> John Doe
          </li>
        </ul>

        <h4 className="font-semibold text-green-700 mb-2">
          {title}
        </h4>

        <p className="text-sm text-gray-600 line-clamp-3">
          {desc}
        </p>

        <a className="inline-flex items-center gap-1 text-green-600 text-sm mt-3">
          View <FaChevronCircleRight />
        </a>
      </div>
    </div>
  );
};

/* ================= POPULAR BLOG ITEM (RIGHT) ================= */
const PopularBlogItem = ({ image, date, text }) => {
  return (
    <div className="flex gap-3 pb-4 border-b last:border-b-0">
      <img
        src={image}
        alt=""
        className="w-20 h-20 rounded-md object-cover"
      />
      <div>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
          <FaCalendarAlt />
          {date}
        </div>
        <p className="text-sm text-gray-700 leading-snug">
          {text}
        </p>
      </div>
    </div>
  );
};

/* ================= MAIN SECTION ================= */
const RecentBlogs = () => {
  const blogs = [
    {
      image: "/public/images/SEO TIPS.jpg",
      date: "24",
      month: "JUN",
      title: "Mastering Local SEO Strategies for Better Visibility",
      desc:
        "Welcome to the dynamic world of local SEO, where mastering the right strategies can skyrocket the visibility of your small business online.",
    },
    {
      image: "/public/images/Machine-learing.jpg",
      date: "24",
      month: "JUN",
      title: "Mastering Local SEO Strategies for Better Visibility",
      desc:
        "Welcome to the dynamic world of local SEO, where mastering the right strategies can skyrocket the visibility of your small business online.",
    },
    {
      image: "/public/images/digital_marketing.jpg",
      date: "24",
      month: "JUN",
      title: "Mastering Local SEO Strategies for Better Visibility",
      desc:
        "Welcome to the dynamic world of local SEO, where mastering the right strategies can skyrocket the visibility of your small business online.",
    },
    {
      image: "/public/images/SEO TIPS.jpg",
      date: "24",
      month: "JUN",
      title: "Mastering Local SEO Strategies for Better Visibility",
      desc:
        "Welcome to the dynamic world of local SEO, where mastering the right strategies can skyrocket the visibility of your small business online.",
    },
  ];

  const popularBlogs = [
    {
      image: "/public/images/SEO TIPS.jpg",
      date: "Feb, 01 2024",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, modi molestias?",
    },
    {
      image: "/public/images/digital_marketing.jpg",
      date: "Jan, 01 2001",
      text:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, modi molestias?",
    },
  ];

  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-[30px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Blog
        </h2>
        <a className="flex items-center gap-2 text-green-600 text-sm font-medium">
          View All Blogs <FaChevronCircleRight />
        </a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 relative group">
          <Swiper
            modules={[Navigation]}
            loop={true}
            slidesPerView={3}
            spaceBetween={24}
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 3 },
            }}
            className="h-full"
          >
            {blogs.map((blog, index) => (
              <SwiperSlide key={index} className="h-auto">
                <BlogCard {...blog} />
              </SwiperSlide>
            ))}
          </Swiper>

          <NextPreviousNavBtn type="prev" ref={setPrevEl} />
          <NextPreviousNavBtn type="next" ref={setNextEl} />
        </div>

        {/* RIGHT POPULAR BLOG */}
        <div className="lg:col-span-4">
          <div className="bg-[#eaf4ff] rounded-lg p-5 mb-4">
            <h4 className="font-semibold text-gray-800">
              Popular Blog
            </h4>
          </div>

          <div className="bg-[#f4fbff] rounded-lg p-5 space-y-4">
            {popularBlogs.map((item, index) => (
              <PopularBlogItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentBlogs;
