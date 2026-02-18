import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import NextPreviousNavBtn from "../common/NextPreviousNavBtn";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  return (
    <section className="relative w-full py-6 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto relative group">

        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: '.swiper-next-btn',
            prevEl: '.swiper-prev-btn',
          }}
          pagination={{ clickable: true }}
          className="rounded-[40px] overflow-hidden"
        >
          <SwiperSlide>
            <div className="relative bg-[#f5f0e5] min-h-[450px] md:h-[550px] flex items-center p-8 md:p-16">
              <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center w-full z-10">
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <h1 className="text-7xl md:text-9xl font-serif text-gray-700 leading-none">Big</h1>
                    <h1 className="text-7xl md:text-9xl font-serif text-[#f28e6a] leading-none">Sale</h1>
                    <div className="absolute -top-4 -right-20 bg-[#cca35e] text-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg transform rotate-12">
                      <span className="text-[10px] uppercase font-bold">Up To</span>
                      <span className="text-3xl font-bold">50%</span>
                      <span className="text-sm font-bold">OFF</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800 tracking-tight uppercase">
                      Comfy & Stylish
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-sm text-sm leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <div className="relative flex justify-center items-center h-full min-h-[400px]">
                  <div className="relative z-10 border-[12px] border-[#cca35e] w-64 md:w-80 h-[400px] md:h-[480px] overflow-hidden shadow-xl">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600" alt="Model 1" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 md:-right-4 z-20 border-[8px] border-[#fde2e2] w-44 md:w-56 h-64 md:h-80 overflow-hidden shadow-2xl">
                    <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=500" alt="Model 2" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative bg-[#e5f5f0] h-[550px] flex items-center justify-center">
              <h2 className="text-4xl font-bold text-teal-700">New Arrivals</h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <NextPreviousNavBtn type="prev" />
        <NextPreviousNavBtn type="next" />
      </div>
    </section>
  );
};

export default Banner;