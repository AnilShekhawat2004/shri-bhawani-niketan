import Employ from "../assets/College/Backside.webp";
import Dots from "../assets/ImageLine/Dots.png";
import Community from "../assets/Student/Community.jpg";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";

function Employment() {
  return (
    <div>
      <div>
        <LandingImage
          LineImage={Employ}
          text={"Employment At Bhawani"}
          className="absolute z-20"
          textClassName="text-[60px] text-center uppercase font-bold"
        />

        <RedBar
          className="absolute font-m1"
          text="Unleash your potential at Shri Bhawani Niketan College
                 a vibrant home for visionaries, educators, and changemakers of tomorrow!"
          textClassName="font-m1 text-center text-[22px]  flex justify-center translate-x-[150px] -translate-y-[20px]"
        />
      </div>

      <div className="mt-32 w-[80%] mx-auto">
        <div className="flex flex-col gap-6 justify-center items-center">
          <p className="text-[50px] font-verdana text-center font-extrabold text-bhawaniDark">
            Your Future is Here
          </p>
          <p className="font-verdana text-center text-[20px] w-[550px]">
            For over 75 years, Shri Bhawani Niketan College has been dedicated
            to nurturing excellence in education and character. Our committed
            faculty and staff create an inspiring environment for students to
            thrive. Discover exciting career opportunities and become a part of
            our growing legacy today.
          </p>
        </div>

        <div className="mt-20 flex items-center justify-center">
          <img src={Dots} alt="Dots" loading="lazy" className="w-[30px]"></img>
        </div>

        <div className="mt-32 flex flex-row items-center justify-center gap-10">
          <div className="bg-bhawaniLight w-[450px] h-[300px] shadow-xl flex items-center justify-center">
            <img
              src={Community}
              alt="Communtiy"
              loading="lazy"
              className="w-[400px] h-[250px] object-cover"
            ></img>
          </div>

          <div className="w-[550px] shadow-xl h-[400px] bg-bhawaniLight flex flex-col justify-center items-center gap-10">
            <p className="text-bhawaniDark font-bold text-[35px] font-verdana">
              A Community That Cares{" "}
            </p>
            <p className="w-[400px] font-verdana text-center text-[18px]">
              Shri Bhawani Niketan College fosters a supportive, respectful
              community where employees are valued, empowered, and inspired to
              grow personally and professionally every day
            </p>
          </div>
        </div>

        <div className="mt-32 bg-bhawaniDark text-white flex flex-col justify-center items-center gap-5 pt-6 pb-6">
          <p className="font-verdana font-bold text-[40px] ">
            Your Path to Joining Us Starts Here
          </p>

          <div className="flex flex-row gap-1 font-m1 text-center">
            <p className="text-[22px]">Phone : </p>
            <p className="text-[20px]">1234567890</p>
          </div>

          <div className="flex flex-row gap-1 font-m1 text-center">
            <p className="text-[22px]">Email : </p>
            <p className="text-[20px]">HR@bhawani.edu</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Employment;
