import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const banners = [
  "/images/banner/cleaning-bnr1.png",
  "/images/cleaning-bnr2.png",
  "/images/nursing-bnr-1.png",
  "/images/nursing-bnr-2.png",
  "/images/physio-bnr-1.png",
  "/images/physio-bnr-2.png",
  "/images/plumber-bnr-adv1.png",
  "/images/car2.png",
];

const BannerSlider = () => {
  return (
    /* FULL WIDTH GREY STRIP */
    <section className="bg-[#efefef] py-10">
      
      {/* CENTER CONTAINER (like screenshot) */}
      <div className="max-w-8xl mx-auto px-6">
        
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="overflow-hidden"
        >
          {banners.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt="Banner"
                className="
                  w-full
                 h-[150px]
                  md:h-[180px]
                  lg:h-[200px]
                  object-cover
                  rounded-none
                "
              />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default BannerSlider;
