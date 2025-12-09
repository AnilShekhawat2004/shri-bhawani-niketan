import { useEffect, useRef, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { Swiper, SwiperSlide } from "swiper/react";
import BottomSection from "./bottomSection";
import sliderData from "./sliderData";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Import required modules
import { Autoplay, EffectFade, Navigation } from "swiper/modules";

function HomeSlider() {
  const [active, setActive] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    console.log("Component Mounted");
    return () => {
      console.log("Component Unmounted");
    };
  }, []);

  return (
    <div className="text-white relative">
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          speed={1200}
          fadeEffect={{ crossFade: true }}
          modules={[EffectFade, Autoplay, Navigation]}
          onSlideChange={(swiper) => setActive(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {sliderData.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative z-10 w-full overflow-hidden lg:h-[740px]">
                <img
                  src={slide.url}
                  alt={slide.title}
                  className="w-full h-full object-cover ease-in-out duration-1000"
                  loading="lazy"
                  decoding="async"
                  draggable="false"
                />
                <div
                  className="font-helvetica text-2xl lg:bg-black lg:bg-opacity-50 font-semibold absolute inset-0 flex 
                  flex-col items-center justify-center text-white z-20 gap-10"
                >
                  <div className="flex flex-col items-center justify-center xl:gap-6 lg:gap-5 md:gap-3 sm:gap-1 xs:gap-[1px] lg:-translate-y-8 md:-translate-y-6 sm:-translate-y-4 xs:translate-y-6">
                    <h3 className="xl:text-[20px] lg:text-[18px] md:text-[15px] sm:text-[12px] xs:text-[10px]">
                      WELCOME TO SHRI BHAWANI NIKETAN INSTITUTE
                    </h3>
                    <h1 className="uppercase xl:text-[60px] lg:text-[50px] md:text-[40px] sm:text-[25px] xs:text-[18px]">
                      {slide.title}
                    </h1>
                  </div>

                  <div className="w-full flex flex-row justify-between -translate-y-8 ">
                    <button
                      onClick={() => swiperRef.current?.slidePrev()}
                      className="flex pl-5 xs:pl-1 justify-start"
                    >
                      <SlArrowLeft className="lg:text-3xl transition-all duration-300 ease-in-out hover:-translate-x-2" />
                    </button>
                    <button
                      onClick={() => swiperRef.current?.slideNext()}
                      className="flex pr-5 xs:pr-1 justify-end"
                    >
                      <SlArrowRight className="lg:text-3xl transition-all duration-300 ease-in-out hover:translate-x-2" />
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="lg:absolute lg:z-20 lg:-translate-y-[255px]">
          <BottomSection />
        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
