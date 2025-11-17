import { motion } from "framer-motion";
import { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SButton from "../../../Common/Buttons/sButton";
import "./imageLine.css";

function ImageLine({ text, buttonText, LineImage, LinkPage }) {
  const [imageVisible, setImageVisible] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative w-full h-[140px]  bg-bhawaniShine mt-24 mb-10">
      {/* Animated Image */}
      <motion.img
        src={LineImage}
        alt="Line"
        loading="lazy"
        initial={{ x: -200, y: -16, opacity: 0 }}
        whileInView={{ x: 0, y: -16, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.5 }}
        onAnimationComplete={() => setImageVisible(true)}
        className="absolute top-0 left-0 h-[130px] md:h-[150px] lg:h-[168px] sm:h-[130px] xs:h-[130px] xl:w-[1000px] lg:w-[900px] md:w-[700px] sm:w-full xs:w-full object-cover clip-parallelogram"
      />

      {/* Gradient Overlay */}
      <div className="absolute lg:h-[168px] md:h-[150px] h-[130px] lg:w-[900px] md:w-[650px] sm:w-[500px] xs:w-[450px] w-full top-0 left-0 -translate-y-4 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-0 pointer-events-none"></div>

      {/* Text and Button - appear after image animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }} // delay matches image duration
        viewport={{ once: true, amount: 0.5 }}
        className="absolute z-20 flex lg:flex-row flex-col items-center lg:justify-between lg:mt-0 mt-5 lg:w-[900px] md:w-[650px] w-[500px] h-[128px] text-white"
      >
        <p className="absolute z-20 font-m1 font-bold text-[20px] sm:text-[22px] md:text-[30px] lg:text-[40px] left-1/2 xs:-translate-x-[175px] sm:left-auto sm:translate-x-0 sm:ml-[40px] md:ml-[80px] lg:ml-[130px] text-center sm:text-left">
          {text}
        </p>

        <Link
          to={LinkPage}
          className="lg:translate-x-[950px] md:translate-x-[400px] md:mt-0 lg:mt-0 mt-[75px]"
        >
          <SButton
            onclick={() => navigate("/")}
            className="px-5 py-6 text-[17px] sm:px-3 sm:py-3 sm:text-[16px] xs:px-3 xs:py-3 xs:text-[15px]"
          >
            {buttonText}
            <IoMdArrowDropright className="text-[22px]" />
          </SButton>
        </Link>
      </motion.div>
    </div>
  );
}

export default ImageLine;
