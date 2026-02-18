import React, { useState } from 'react';
import { FaChevronCircleRight, FaPlay } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import NextPreviousNavBtn from "../common/NextPreviousNavBtn";

const RecentAdCard = ({ image }) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition h-full">
      <img
        src={image}
        alt="Recent Ad"
        className="w-full h-48 object-cover"
      />
    </div>
  );
};

const RecentVideoCard = ({ video, poster }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-sm h-full">
      <video
        className="w-full h-56 object-cover"
        controls
        poster={poster}
      >
        <source src={video} type="video/mp4" />
      </video>
      <div className="absolute top-4 right-4 bg-black/70 text-green-400 p-3 rounded-full pointer-events-none">
        <FaPlay />
      </div>
    </div>
  );
};

/* ---------- MAIN SECTION ---------- */
const RecentAds = () => {
  const imageAds = [
    "/public/images/rp-1.webp",
    "/public/images/rp-5.webp",
    "/public/images/rp-7.webp",
    "/public/images/rp-1.webp",
    "/public/images/rp-5.webp",
  ];

  const videoAds = [
    "/public/images/about-sonydig.mp4",
    "/public/images/about-sonydig.mp4",
    "/public/images/about-sonydig.mp4",
  ];

  const [imgPrevEl, setImgPrevEl] = useState(null);
  const [imgNextEl, setImgNextEl] = useState(null);
  const [vidPrevEl, setVidPrevEl] = useState(null);
  const [vidNextEl, setVidNextEl] = useState(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-[30px]">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Recent Ads
        </h2>
        <a className="flex items-center gap-2 text-green-600 text-sm font-medium cursor-pointer">
          View All Product <FaChevronCircleRight />
        </a>
      </div>

      {/* Image Slider */}
      <div className="relative group mb-10">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: imgPrevEl,
            nextEl: imgNextEl,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          className="w-full"
        >
          {imageAds.map((img, index) => (
            <SwiperSlide key={index}>
              <RecentAdCard image={img} />
            </SwiperSlide>
          ))}
        </Swiper>
        <NextPreviousNavBtn
          type="prev"
          ref={setImgPrevEl}
        />
        <NextPreviousNavBtn
          type="next"
          ref={setImgNextEl}
        />
      </div>

      {/* Video Slider */}
      <div className="relative group">
        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: vidPrevEl,
            nextEl: vidNextEl,
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
          }}
          loop={true}
          className="w-full"
        >
          {videoAds.map((vid, index) => (
            <SwiperSlide key={index}>
              <RecentVideoCard
                video={vid}
                poster="/public/images/video-poster.jpg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <NextPreviousNavBtn
          type="prev"
          ref={setVidPrevEl}
        />
        <NextPreviousNavBtn
          type="next"
          ref={setVidNextEl}
        />
      </div>
    </section>
  );
};

export default RecentAds;
