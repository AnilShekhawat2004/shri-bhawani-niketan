import Employ from "../assets/College/Backside.webp";
import Dots from "../assets/ImageLine/Dots.png";
import Community from "../assets/Student/Community.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Employment() {
  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Employ}
          text={"Employment At Bhawani"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-[450px] xs:h-[300px]"
          textClassName="text-[25px] sm:text-[40px] lg:text-[60px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="Unleash your potential at Shri Bhawani Niketan College
                 a vibrant home for visionaries, educators, and changemakers of tomorrow!"
            textClassName="font-m1 text-center xs:pt-[2px] text-[12px] sm:text-[19px] md:text-[24px] lg:text-[28px] px-4"
          />
        </div>
      </div>

      <div className="x;:mt-32 lg:mt-32 mt-20 w-[80%] mx-auto">
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="xl:text-[50px] lg:text-[50px] md:text-[40px] sm:text-[35px] xs:text-[25px] font-verdana text-center font-extrabold text-bhawaniDark">
            Your Future is Here
          </p>
          <p className="font-verdana text-center xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] xl:w-[550px] lg:w-[550px] md:w-[450px] sm:w-[350px] xs:w-[300px]">
            For over 75 years, Shri Bhawani Niketan College has been dedicated
            to nurturing excellence in education and character. Our committed
            faculty and staff create an inspiring environment for students to
            thrive. Discover exciting career opportunities and become a part of
            our growing legacy today.
          </p>
        </div>

        <div className="xl:mt-20 lg:mt-20 md:mt-16 sm:mt-14 xs:mt-11 flex items-center justify-center">
          <img src={Dots} alt="Dots" loading="lazy" className="xl:w-[30px] lg:w-[30px] md:w-[25px] sm:w-[22px] xs:w-[18px]"></img>
        </div>

        <div className="xl:mt-32 lg:mt-28 md:mt-20 sm:mt-14 xs:mt-10 flex xl:flex-row lg:flex-row flex-col items-center justify-center gap-10">
          <div className="bg-bhawaniLight xl:w-[450px] lg:w-[450px] md:w-[400px] w-[350px] xl:h-[300px] lg:h-[300px] md:h-[250px] h-[200px] shadow-xl flex items-center justify-center">
            <img
              src={Community}
              alt="Communtiy"
              loading="lazy"
              className="xl:w-[400px] lg:w-[400px] md:w-[350px] w-[300px] xl:h-[250px] lg:h-[250px] md:h-[200px] h-[150px] object-cover"
            ></img>
          </div>

          <div className="xl:w-[550px] lg:w-[550px] md:w-[450px] sm:w-[400px] xs:w-[350px] shadow-xl xl:h-[400px] lg:h-[400px] md:h-[300px] h-[250px] bg-bhawaniLight flex flex-col justify-center items-center xl:gap-10 lg:gap-10 md:gap-7 sm:gap-6 xs:gap-4">
            <p className="text-bhawaniDark font-bold xl:text-[35px] lg:text-[35px] md:text-[30px] sm:text-[25px] text-[20px] font-verdana">
              A Community That Cares{" "}
            </p>
            <p className="xl:w-[400px] lg:w-[400px] w-[300px] font-verdana text-center xl:text-[18px] lg:text-[18px] md:text-[16px] text-[14px]">
              Shri Bhawani Niketan College fosters a supportive, respectful
              community where employees are valued, empowered, and inspired to
              grow personally and professionally every day
            </p>
          </div>
        </div>

        <div className="mt-32 bg-bhawaniDark text-white flex flex-col justify-center items-center gap-5 py-6 px-5">
          <p className="font-verdana font-bold xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] xs:text-[20px] text-center">
            Your Path to Joining Us Starts Here
          </p>

          <div className="flex flex-row gap-1 font-m1 text-center">
            <p className="xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px]">Phone : </p>
            <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px]">1234567890</p>
          </div>

          <div className="flex flex-row gap-1 font-m1 text-center">
            <p className="xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px]">Email : </p>
            <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px]">HR@bhawani.edu</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Employment;
