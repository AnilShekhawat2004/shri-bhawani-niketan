import VisitCollege from "../assets/College/Visit.png";
import Dots from "../assets/ImageLine/Dots.png";
import Content from "../assets/Logo/ContentArea.svg";
import TwoVisit from "../assets/Student/TwoVisit.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Visit() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={VisitCollege}
          text={"Campus Tours"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[25px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Step into the vibrant world of our campus where energy, passion, and success come together to create an unforgettable experience!"
            textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[5px]"
          />
        </div>
      </div>

      <div className="w-[100%] mx-auto h-full xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 flex flex-col items-center gap-5 justify-center">
        <p className="xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] font-bold font-verdana text-center text-bhawaniDark">
          We can't wait to meet you.
        </p>
        <div className="w-[30%] xl:h-[2px] lg:h-[2px] h-[1px] bg-bhawaniYellow"></div>
        <p className="mt-5 xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] font-verdana xl:w-[60%] lg:w-[60%] md:w-[70%] w-[90%] text-center">
          At Shri Bhawani Niketan College, discover a campus full of energy,
          creativity, and ambition where students are empowered to excel,
          collaborate, and shape their futures with knowledge, passion, and
          purpose.
        </p>
        <img
          src={Dots}
          alt="Dots"
          loading="lazy"
          className="w-[30px] mt-12"
        ></img>

        <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col gap-20 xl:w-[80%] lg:w-[80%] w-[95%] h-auto items-center xl:mt-24 lg:mt-24 mt-16">
          <img
            src={TwoVisit}
            alt="Student"
            loading="lazy"
            className="xl:w-[50%] lg:w-[50%] md:w-[50%] w-[95%] xl:h-[350px] lg:h-[350px] md:h-[350px] sm:h-[350px] h-[250px] object-cover rounded-xl"
          ></img>

          <div className="flex flex-col gap-5 w-full justify-center items-center">
            <p className="xl:text-[35px] lg:text-[35px] md:text-[25px] sm:text-[20px] text-[18px] text-bhawaniDark font-verdana font-bold">
              Individual Campus Tours
            </p>
            <div className="w-[30%] xl:h-[2px] lg:h-[2px] h-[1px] bg-bhawaniYellow"></div>
            <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-center font-verdana">
              Discover what Shri Bhawani Niketan College has to offer by
              exploring our vibrant campus! We’re excited to welcome you and
              your family or friends to experience the spirit of our
              institution. From dynamic academic programs and inspiring faculty
              to comfortable facilities and a culture rooted in excellence,
              there’s so much to see and feel. Come walk our grounds, connect
              with our community, and witness how we prepare students to thrive
              with confidence and purpose. Feel free to visit us anytime—we’re
              always happy to have you!
            </p>
          </div>
        </div>

        <div className="relative w-full xl:h-[350px] lg:h-[350px] md:h-[350px] sm:h-[350px] h-[250px] bg-bhawaniDark mt-24">
          <img
            src={Content}
            alt="Content area"
            className="absolute w-full h-full object-cover"
          ></img>

          <div className="absolute flex flex-col xl:gap-8 lg:gap-8 md:gap-8 sm:gap-7 gap-5 z-10 justify-center items-center mt-10 ">
            <p className="font-bold xl:text-[45px] lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] text-bhawaniYellow">
              Questions?
            </p>
            <div className=" w-[25%] xl:h-[2px] lg:h-[2px] h-[1px] bg-bhawaniYellow"></div>
            <p className="font-verdana xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] text-[14px] text-white xl:w-[55%] lg:w-[55%] md:w-[60%] w-[90%] text-center">
              If you have questions about individual or group tours, please
              contact the Office of Admissions at sbnboyscollege@gmail.com or
              +91 141 2233863.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Visit;
