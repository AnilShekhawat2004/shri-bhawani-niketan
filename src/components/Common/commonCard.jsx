import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function CommonCard({
  position,
  LineImage,
  heading,
  text,
  OverClassName,
  className,
}) {
  const isLeft = position === "left";

  // Set up scroll-triggered animation
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className={`flex xl:gap-0 lg:gap-0 md:gap-0 gap-8 ${
        isLeft ? "xl:flex-row lg:flex-row md:flex-row flex-col" : "xl:flex-row-reverse lg:flex-row-reverse md:flex-row-reverse flex-col"
      } items-center ${className}`}
    >
      {/* Image Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative xl:w-[650px] lg:w-[650px] md:w-[550px] sm:w-[450px] w-full xl:h-[400px] lg:h-[400px] h-[280px] flex items-center justify-center"
      >
        {/* Blurred Background */}
        <img
          src={LineImage}
          alt="Blurred"
          loading="lazy"
          className="absolute inset-0 w-full h-full rounded-2xl blur-[6px] z-0"
        />
        {/* Foreground Image */}
        <img
          src={LineImage}
          alt="Clear"
          loading="lazy"
          className="relative z-10 xl:w-[380px] lg:w-[380px] w-full h-full object-contain rounded-md"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="xl:w-[650px] lg:w-[650px] md:w-[550px] sm:w-[450px] w-full h-auto"
      >
        <div
          className={`bg-bhawaniLight2 rounded-2xl shadow-lg xl:p-10 lg:p-10 md:p-8 sm:p-6 p-4 flex flex-col items-center justify-center gap-5 ${OverClassName}`}
        >
          <p className="text-bhawaniDark font-m1 font-bold text-center xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px]">
            {heading}
          </p>
          <hr className="w-[60%] border-t-2 border-bhawaniYellow" />
          <p className="font-verdana xl:text-[18px] lg:text-[18px] md:text-[16px] text-[12px]">{text}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default CommonCard;
