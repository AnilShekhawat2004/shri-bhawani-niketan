import { Link } from "react-router-dom";
import AboutUs from "../assets/College/SkyViewSbn.png";
import Dots from "../assets/ImageLine/Dots.png";
import ContentArea from "../assets/Logo/ContentArea.svg";
import ApplyImage from "../assets/Student/apply.jpeg";
import SButton from "../components/Common/Buttons/sButton";
import YButton from "../components/Common/Buttons/yButton";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
function Apply() {
  return (
    <div className="overflow-x-hidden">
      <div>
        <div className="relative">
          <LandingImage
            LineImage={ApplyImage}
            text="Belong to a community where you matter"
            className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
            textClassName="text-[20px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
          />

          <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
            <RedBar
              className="font-m1"
              text="Step into a space where learning meets purpose. At our college, you don’t just apply you claim your place in a community driven by growth, values, and opportunity."
              textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[5px]"
            />
          </div>
        </div>

        <div className="w-full h-auto mx-auto xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 flex flex-col items-center gap-10">
          <p className="xl:w-[50%] lg:w-[50%] w-[100%] xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[30px] text-[20px] font-verdana font-bold text-bhawaniDark text-center">
            A Community Waiting to Welcome You
          </p>
          <div className="bg-bhawaniYellow w-[60%] h-[2px]"></div>

          <p className="font-verdana text-center xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] xl:w-[55%] lg:w-[55%] md:w-[60%] w-[90%]">
            At Shri Bhawani Niketan College, we believe every journey begins
            with curiosity. If you're interested in joining us or have questions
            about admission, just drop your details below. Though the admission
            process takes place offline, we’ll personally reach out to help you
            with the next steps.
          </p>

          <Link to={"/contactUs"} className="w-[40%]">
            <YButton className="w-full">{"Apply Now"}</YButton>
          </Link>

          <img
            src={Dots}
            alt="Dots"
            loading="lazy"
            className="w-[30px] h-[150px] mt-10"
          ></img>

          <div className="xl:w-[85%] lg:w-[85%] md:w-[90%] w-[100%] flex xl:flex-row lg:flex-row md:flex-row flex-col mt-10 justify-center items-center gap-10">
            <div className="xl:w-[40%] lg:w-[40%] md:w-[50%] w-[90%] xl:h-[400px] lg:h-[400px] md:h-[400px] h-[300px] border border-gray-100 bg-white flex justify-center items-center shadow-2xl">
              <img
                src={AboutUs}
                alt="AboutUs"
                loading="lazy"
                className="w-[90%] xl:h-[320px] lg:h-[320px] h-[250px] object-cover"
              ></img>
            </div>

            <div className="xl:w-[40%] lg:w-[40%] md:w-[50%] w-[90%] xl:px-10 lg:px-10 md:px-8 sm:px-6 px-4 py-5 border border-gray-300  bg-gray-100 flex flex-col items-center gap-5 justify-center shadow-xl">
              <div className="w-full flex flex-col gap-2 justify-center items-center">
                <p className="font-m1 text-bhawaniDark xl:text-[35px] lg:text-[35px] md:text-[25px] text-[20px] font-bold">
                  Our Legacy, Your Future
                </p>
                <div className="bg-bhawaniYellow w-[70%] xl:h-[2px] lg:h-[2px] h-[1px]"></div>
              </div>

              <p className="font-verdana xl:text-[17px] lg:text-[17px] md:text-[15px] sm:text-[13px] text-[11px] w-[95%] text-center">
                Want to know us better before you apply? Dive into our story,
                explore our campus spirit, and see why students proudly call
                Shri Bhawani Niketan College their second home.
              </p>

              <Link to={"/aboutUs"} className="px-4 py-3">
                <SButton>{"Learn Now"}</SButton>
              </Link>
            </div>
          </div>

          <div className="w-full xl:h-[400px] lg:h-[400px] md:h-[300px] h-[150px] overflow-hidden relative mt-32 bg-bhawaniDark flex justify-center items-center">
            <img
              src={ContentArea}
              alt="ContentArea"
              loading="lazy"
              className="w-full xl:h-[550px] lg:h-[550px] md:h-[350px] h-full absolute object-cover"
            />

            <div className="absolute z-10 flex flex-col items-center justify-center gap-5 px-4">
              <p className="text-white font-bold font-m1 xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px]">
                Questions?
              </p>
              <div className="w-20 h-[2px] bg-bhawaniYellow"></div>

              <p className="xl:w-[52%] lg:w-[52%] md:w-[60%] w-[95%] text-white font-verdana xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[12px] text-center">
                Need help or have questions? Our admission counselor is here to
                assist you. Reach out at sbnboyscollege@gmail.com or call us at
                +91 141 2233863.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Apply;
