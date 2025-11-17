import { Link } from "react-router-dom";
import Dots from "../assets/ImageLine/Dots.png";
import Gift from "../assets/ImageLine/gift.jpg";
import ContentArea from "../assets/Logo/ContentArea.svg";
import Giveimage from "../assets/Student/Give.jpg";
import YButton from "../components/Common/Buttons/yButton";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Give() {
  return (
    <div className="overflow-x-hidden">
      <div>
        <div className="relative">
          <LandingImage
            LineImage={Giveimage}
            text="Give"
            className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
            textClassName="text-[25px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
          />

          <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
            <RedBar
              className="font-m1"
              text="Give students the wings to fly your support builds their path to success, leadership, and a future filled with possibilities."
              textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[5px]"
            />
          </div>
        </div>

        <div className="xl:mt-[150px] lg:mt-[150px] mt-20 mx-auto flex flex-col items-center xl:w-[80%] lg:w-[80%] md:w-[85%] w-[100%] gap-3">
          <p className="xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] font-bold text-bhawaniDark font-verdana">
            Your gift changes lives.
          </p>
          <p className="xl:text-[18px] lg:text-[18px] md:text-[16px] text-[14px] font-verdana text-center xl:w-[80%] lg:w-[80%] md:w-[85%] w-[100%]">
            Rooted in tradition and driven by innovation, Shri Bhawani Niketan
            College empowers students to lead with purpose and serve with heart.
            Your generosity fuels this mission and transforms lives.
          </p>
          <Link to="/give/payment" className="w-[40%] flex justify-center">
            <YButton className="w-full mt-10">{"Give Now"}</YButton>
          </Link>
        </div>

        <img
          src={Dots}
          alt="Dots"
          loading="lazy"
          className="w-[30px] xl:h-[180px] lg:h-[180px] md:h-[150px] h-[130px] mx-auto xl:mt-32 lg:mt-32 md:mt-28 mt-20"
        ></img>

        <div className="relative w-full h-[560px] flex justify-center items-center xl:mt-32 lg:mt-32 mt-20 bg-bhawaniDark ">
          <img
            src={ContentArea}
            alt="ContentArea"
            loading="lazy"
            className="absolute w-full h-full object-cover"
          ></img>

          <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col justify-center items-center xl:gap-20 lg:gap-20 md:gap-20 gap-3 pt-3 absolute z-10 xl:w-[70%] lg:w-[70%] md:w-[70%] w-[90%] h-[420px] bg-white rounded-3xl">
            <img
              src={Gift}
              alt="Gift"
              loading="lazy"
              className="xl:w-[40%] lg:w-[40%] md:w-[40%] sm:w-[65%] w-[90%] rounded-3xl xl:h-[300px] lg:h-[300px] md:h-[300px] h-[200px] shadow-2xl"
            ></img>

            <div className="xl:w-[40%] lg:w-[40%] md:w-[40%] sm:w-[65%] w-[90%] h-[300px] flex flex-col items-center justify-center gap-2">
              <p className="font-m1 text-bhawaniDark xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] font-bold">
                Planned Gifts
              </p>
              <div className="bg-bhawaniYellow xl:h-[2px] lg:h-[2px] md:h-[2px] h-[1px] w-[70%]"></div>
              <p className="font-verdana xl:text-[17px] lg:text-[17px] md:text-[15px] sm:text-[13px] text-[11px] text-center mt-2">
                A planned gift is a powerful legacy—one that nurtures student
                potential, supports their dreams, and strengthens Shri Bhawani
                Niketan College’s mission to educate, inspire, and serve. Your
                foresight empowers generations of learners to thrive and lead
                with purpose."
              </p>
            </div>
          </div>
        </div>

        <div className="xl:mt-32 lg:mt-32 md:mt-28 mt-20 mx-auto flex flex-col items-center justify-center gap-5 bg-bhawaniLight px-10 xl:w-[60%] lg:w-[60%] md:w-[70%] w-[90%] h-[300px] rounded-2xl">
          <p className="font-bold xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] text-bhawaniDark font-m1">
            Contact Us
          </p>
          <div className="w-[40%] h-[2px] bg-bhawaniYellow"></div>
          <p className="xl:text-[18px] lg:text-[18px] md:text-[16px] text-[14px] font-verdana text-center">
            Have questions or need guidance on making a planned gift? We're here
            to help reach out to us to explore how your generosity can make a
            lasting difference for our students.
          </p>
          <p className="text-[16px] font-verdana text-center">
            sbnboyscollege@gmail.com or +91 141 2233863
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Give;
