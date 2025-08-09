import React from "react";
import Image from "../../../../assets/Student/Student.png";
import RButton from "../../../Common/Buttons/rButton";
import { Link, useNavigate } from "react-router-dom";

function StudentApply() {
  const navigate = useNavigate();

  return (
    <div className="relative mt-32 lg:h-[600px] md:h-[500px] h-[400px] group">

      {/* Solid White Inner Shadow on Hover */}
      <div
        className="absolute inset-0 z-30 pointer-events-none transition-all duration-500 group-hover:border-bhawaniRed group-hover:border-[1px]"
      >
        <div className="w-full h-full transition-all duration-500 lg:group-hover:shadow-[inset_0_0_0_20px_white]" />
      </div>

      {/* Background Image */}
      <img
        src={Image}
        alt="Student"
        className="absolute w-full h-full object-cover z-0"
      />

      {/* Black Tint (Left Side Only) */}
      <div className="absolute left-0 top-0 w-[50%] h-full z-10 transition-all duration-700 ease-in-out lg:group-hover:bg-black lg:group-hover:opacity-30" />

      {/* Text Content */}
      <div className="absolute left-0 top-0 z-20 flex flex-col justify-center items-center gap-5 text-white w-[50%] h-full font-helvetica 
           bg-gradient-to-r from-black/80 via-black/30 to-transparent">

        <div className="flex flex-col lg:group-hover:-translate-y-24 lg:ml-0 ml-48 transition-all duration-[1s] delay-150">
          <p className="text-[17px] lg:ml-0 ml-2 lg:-translate-x-[45px] lg:translate-y-[85px]">Lock In Your Place</p>
          <p className="lg:text-[60px] md:text-[45px] text-[35px] lg:-translate-x-14 lg:translate-y-[90px] font-m1 font-bold leading-tight w-[400px]">
            Confirm Your Enrollment
          </p>
        </div>

        <p className="text-[21px] w-[600px] translate-x-[50px] absolute opacity-0 leading-tight translate-y-[110px]
            lg:group-hover:opacity-100 delay-150 transition-all duration-500">
          Your college adventure is just one click away lock in your admission
          today and start planning for the experiences, friendships, and future
          success that await you.
        </p>

        <Link to={"/apply"} className="lg:-translate-x-[152px] lg:translate-y-[100px] text-[17px]">
          <RButton text="Take The Next Step" onclick={() => navigate("/")} className="w-[200px] h-[50px]"/>
        </Link>
      </div>
    </div>
  );
}

export default StudentApply;
