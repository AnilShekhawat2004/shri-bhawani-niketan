import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import Footer from "../components/Common/Footer/Footer";
import Course from "../assets/College/Course.png";
import ProgramCard from "../components/core/Courses/ProgramCard"

function CategoryProgram() {

  return (
    <div>
      <LandingImage
        LineImage={Course}
        text="Academic Programmes"
        className="absolute z-20"
        textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
      />
      <RedBar
        className="absolute font-m1"
        textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
        text="The best way to predict your future is to create it."
      />
      <div className="w-[80%] mx-auto mt-32 mb-20">
        <div className="flex flex-col gap-3 justify-center items-center">
            <p className="text-[40px] font-m1 font-extrabold text-bhawaniDark">Your journey of a thousand dreams begins with a single programme.</p>
            <div className="bg-bhawaniYellow w-[70%] h-[2px]"></div>
        </div>

        <div>
            <ProgramCard/>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CategoryProgram;
