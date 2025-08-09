import React from "react";
import History from "../../../../assets/Course/History.jpg";
import Geography from "../../../../assets/Course/Geography.jpg";
import Zoology from "../../../../assets/Course/Zoology.jpg";
import MButton from "../../../Common/Buttons/mButton";
import { Link } from "react-router-dom";
import { IoMdArrowDropright } from "react-icons/io";
import { motion } from "framer-motion";

function CourseDoors() {
  return (
    <div className="mt-32 mx-auto flex lg:flex-row flex-col-reverse justify-center items-center lg:w-[1205px] lg:h-[687px] ml-30 gap-32">
      {/* Section 1 */}
      <div className="lg:w-[687px] lg:h-[687px] md:w-[600px] md:h-[600px] w-[450px] h-[450px]">
        <div className="group relative cursor-pointer lg:w-[687px] lg:h-[344px] md:w-[560px] md:h-[280px] w-[450px] h-[200px] overflow-hidden">
          {/* Motion Overlay - Covers initially, then moves out */}
          <motion.div
            initial={{ x: "0%" }} // Start fully covering the image
            whileInView={{ x: "100%" }} // Moves out to the right when in view
            transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
            viewport={{ once: true }}
            className="z-10 absolute top-0 left-0 w-full h-full bg-bhawaniDark opacity-100"
          />

          {/* Background Image */}
          <img src={History} alt="History" className="absolute z-0 w-full h-full object-cover" />

          {/* Gradient & Text */}
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/100 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-black/50 z-20">
            <div className="absolute inset-0 w-28 translate-x-10 lg:translate-y-5  text-white font-helvetica group-hover:-translate-y-3 transition-all duration-500">
              <p className="lg:text-[13px] text-[10px] opacity-70">PAST & LEGACY</p>
              <p className="lg:text-[35px] text-[28px] -translate-y-[6px]">History</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="group relative cursor-pointer lg:w-[343.5px] lg:h-[344px] md:w-[280px] md:h-[280px] w-[225px] h-[200px] overflow-hidden">
            
            <motion.div
              initial={{ y: "0%" }} // Start fully covering the image
              whileInView={{ y: "100%" }} // Moves out to the right when in view
              transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
              viewport={{ once: true }}
              className="z-10 absolute top-0 left-0 w-full h-full bg-black opacity-100"
            />
            <img src={Zoology} alt="Zoology" className="absolute w-[343.5px] h-[344px] object-cover" />
            <div className="absolute z-10 bottom-0 w-full h-1/3 bg-gradient-to-t from-black/100 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-black/50">
              <div className="absolute inset-0 translate-x-10 lg:translate-y-5 text-white font-helvetica group-hover:-translate-y-3 transition-all duration-500">
                <p className="lg:text-[13px] text-[10px] opacity-70">WILD & LIFE</p>
                <p className="lg:text-[35px] text-[28px] -translate-y-[6px]">Zoology</p>
              </div>
            </div>
          </div>

          <div className="group relative cursor-pointer lg:w-[343.5px] lg:h-[344px] md:w-[280px] md:h-[280px] w-[225px] h-[200px] overflow-hidden">

            <motion.div
              initial={{ y: "0%" }} // Start fully covering the image
              whileInView={{ y: "-100%" }} // Moves out to the right when in view
              transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
              viewport={{ once: true }}
              className="z-10 absolute top-0 left-0 w-full h-full bg-gray-500 opacity-100"
            />
            <img src={Geography} alt="Geography" className="absolute w-[343.5px] h-[344px] object-cover" />
            <div className="absolute z-10 bottom-0 w-full h-1/3 bg-gradient-to-t from-black/100 via-black/50 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700 shadow-lg shadow-black/50">
              <div className="absolute inset-0 translate-x-10 lg:translate-y-5 text-white font-helvetica group-hover:-translate-y-3 transition-all duration-500">
                <p className="lg:text-[13px] text-[10px] opacity-70">EARTH & BEYOND</p>
                <p className="lg:text-[35px] text-[28px] -translate-y-[6px]">Geography</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col justify-center items-center font-helvetica gap-4 lg:gap-7">
        <p className="text-[17px] text-gray-500 text-center lg:-translate-x-[52px]">Unravel the past and shape the future</p>
        <p className="lg:text-[50px] md:text-[40px] lg:text-left text-center text-[30px] font-bold leading-tight font-m1">Shri Bhawani Niketan Opens Doors</p>
        <p className="text-[20px] w-[85%] lg:w-full text-gray-500 lg:text-left text-center">
          Our faculty lead students to reach further, to achieve their goals and to effect change in the professions and passions they pursue.
        </p>
        <div className="translate-y-4 lg:-translate-x-24">
          <Link to="/course">
            <MButton text="Find Your Program">
              <IoMdArrowDropright className="translate-x-20 translate-y-[0.5px]" />
            </MButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseDoors;
