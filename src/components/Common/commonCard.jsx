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
      className={`flex ${
        isLeft ? "flex-row" : "flex-row-reverse"
      } items-center ${className}`}
    >
      {/* Image Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative w-[650px] h-[400px] flex items-center justify-center"
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
          className="relative z-10 w-[380px] h-full object-contain rounded-md"
        />
      </motion.div>

      {/* Content Section */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="w-[650px] h-auto"
      >
        <div
          className={`bg-bhawaniLight2 rounded-2xl shadow-lg p-10 flex flex-col items-center justify-center gap-5 ${OverClassName}`}
        >
          <p className="text-bhawaniDark font-m1 font-bold text-center text-[40px]">
            {heading}
          </p>
          <hr className="w-[300px] border-t-2 border-bhawaniYellow" />
          <p className="font-verdana text-[18px]">{text}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default CommonCard;
