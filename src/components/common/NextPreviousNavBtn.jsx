import { forwardRef } from "react";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const NextPreviousNavBtn = forwardRef(({ type = "next", className = "", ...props }, ref) => {
  const isNext = type === "next";

  return (
    <button
      ref={ref}
      {...props}
      className={`
        ${isNext ? "swiper-next-btn right-4 translate-x-10" : "swiper-prev-btn left-4 -translate-x-10"}
        absolute top-1/2 -translate-y-1/2 z-50
        w-7 h-7
        border-2 border-[#023a20]
        rounded-full
        flex items-center justify-center
        text-[#023a20]
        bg-white/80
        hover:bg-[#023a20] hover:text-white
        shadow-md

        opacity-0
        transition-all duration-300 ease-out
        group-hover:opacity-100
        group-hover:translate-x-0

        ${className}
      `}
    >
      {isNext ? <GoArrowRight size={18} /> : <GoArrowLeft size={18} />}
    </button>
  );
});

export default NextPreviousNavBtn;
