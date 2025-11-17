import Course from "../assets/College/Course.png";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import ProgramCard from "../components/core/Courses/ProgramCard";

function CategoryProgram() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Course}
          text="Academic Programmes"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="The best way to predict your future is to create it."
            textClassName="font-m1 text-center text-[16px] sm:text-[22px] md:text-[24px] lg:text-[28px] px-4"
          />
        </div>
      </div>
      <div className="w-[80%] mx-auto mt-32 mb-20">
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-center xl:text-[40px] lg:text-[40px] md:text-[35px] sm:text-[30px] xs:text-[25px] font-m1 font-extrabold text-bhawaniDark">
            Your journey of a thousand dreams begins with a single programme.
          </p>
          <div className="bg-bhawaniYellow w-[70%] h-[2px]"></div>
        </div>

        <div>
          <ProgramCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryProgram;
