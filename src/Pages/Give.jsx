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
    <div>
      <div>
        <LandingImage
          LineImage={Giveimage}
          text="Give"
          className="absolute z-20"
          textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
        />
        <RedBar
          className="absolute font-m1"
          textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
          text="Give students the wings to fly your support builds their path to success, leadership, and a future filled with possibilities."
        />

        <div className="mt-32 mx-auto flex flex-col items-center w-[80%] gap-3">
          <p className="text-[45px] font-bold text-bhawaniDark font-verdana">
            Your gift changes lives.
          </p>
          <p className="text-[18px] font-verdana text-center w-[80%]">
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
          className=" w-[40px] h-[180px] mx-auto mt-32"
        ></img>

        <div className="relative w-full lg:h-[560px] flex justify-center items-center mt-32 bg-bhawaniDark ">
          <img
            src={ContentArea}
            alt="ContentArea"
            loading="lazy"
            className="absolute w-full h-full"
          ></img>

          <div className="flex justify-center items-center gap-20 absolute z-10 w-[70%] h-[400px] bg-white rounded-3xl">
            <img
              src={Gift}
              alt="Gift"
              loading="lazy"
              className="w-[40%] rounded-3xl h-[300px] shadow-2xl"
            ></img>

            <div className="w-[40%] h-[300px] flex flex-col items-center justify-center gap-2">
              <p className="font-m1 text-bhawaniDark text-[45px] font-bold">
                Planned Gifts
              </p>
              <div className="bg-bhawaniYellow h-[2px] w-[70%]"></div>
              <p className="font-verdana text-[17px] text-center mt-2">
                A planned gift is a powerful legacy—one that nurtures student
                potential, supports their dreams, and strengthens Shri Bhawani
                Niketan College’s mission to educate, inspire, and serve. Your
                foresight empowers generations of learners to thrive and lead
                with purpose."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-32 mx-auto flex flex-col items-center justify-center gap-5 bg-bhawaniLight px-10 w-[60%] h-[300px] rounded-2xl">
          <p className="font-bold text-[45px] text-bhawaniDark font-m1">
            Contact Us
          </p>
          <div className="w-[40%] h-[2px] bg-bhawaniYellow"></div>
          <p className="text-[18px] font-verdana text-center">
            Have questions or need guidance on making a planned gift? We're here
            to help reach out to us to explore how your generosity can make a
            lasting difference for our students.
          </p>
          <p className="text-[16px] font-verdana">
            sbnboyscollege@gmail.com or +91 141 2233863
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Give;
