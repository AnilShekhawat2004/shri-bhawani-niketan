import Chairman from "../assets/About Us/chairman.jpg";
import King1 from "../assets/About Us/King.jpg";
import Principal from "../assets/About Us/principal.jpg";
import King2 from "../assets/About Us/Queen.jpg";
import Secretary from "../assets/About Us/secretary.jpg";
import Coridor from "../assets/College/Coridor.png";
import AboutUs from "../assets/College/SkyViewSbn.png";
import CommonCard from "../components/Common/commonCard";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import Message from "../components/Common/message";
import RedBar from "../components/Common/redBar";

function About() {
  return (
    <div className="overflow-x-hidden">
      <div>
        <div className="relative">
          <LandingImage
            LineImage={AboutUs}
            text={"Every story has a beginning this is ours."}
            className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
            textClassName="text-[20px] sm:text-[30px] lg:text-[50px] text-center uppercase font-bold"
          />

          <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
            <RedBar
              className="font-m1"
              text="In 1942, Shri Bhawani Niketan Shiksha Samiti was founded in Jaipur by Maharaja Sawai Man Singh Ji-II. The society, committed to providing quality education, aims to cultivate 
              skilled, morally grounded individuals for the nation."
              textClassName="font-m1 text-center text-[10px] sm:text-[16px] md:text-[24px] lg:text-[25px] xs:max-w-[600px] lg:pt-9 sm:pt-5 px-4 xs:pt-[2px]"
            />
          </div>
        </div>

        <div className="xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 xl:w-[80%] lg:w-[80%] md:w-[80%] w-[95%] mx-auto">
          <CommonCard
            position="left"
            LineImage={King1}
            heading="Our Legacy and Vision"
            text="Established in 1942 by Late His Highness Maharaja Sawai 
            Man Singh Ji-II of Jaipur, Shri Bhawani Niketan Shiksha Samiti 
            (SBNSS) is a visionary society committed to delivering world-class 
            education and nurturing excellence in human potential. Founded on 
            the belief that education fosters dignity, self-respect, and 
            integrity, SBNSS has remained dedicated to building individuals 
            with rational thinking, moral character, and professional commitment."
            className=""
            OverClassName="xl:translate-y-[60px] lg:translate-y-[60px] md:translate-y-[60px] translate-y-0 xl:-translate-x-[50px] lg:-translate-x-[50px] md:-translate-x-[50px] translate-x-0"
          />

          <CommonCard
            position="right"
            LineImage={King2}
            heading="Empowering Students Through Excellence"
            text="Over the years, SBNSS has evolved into a vibrant educational 
            ecosystem with more than 10,000 students known for their brilliance 
            and competitive spirit. With a strong focus on technical and professional 
            education, it combines academic rigor, innovative teaching, and modern 
            infrastructure. The diverse student community enriches the learning 
            experience, fostering a dynamic and inclusive environment that prepares 
            students for success in a globalized world."
            className="xl:mt-32 lg:mt-32 md:mt-28 mt-20"
            OverClassName="xl:translate-y-[120px] lg:translate-y-[120px] md:translate-y-[120px] translate-y-0 xl:translate-x-[50px] lg:translate-x-[50px] md:translate-x-[50px] translate-x-0"
          />

          <CommonCard
            position="left"
            LineImage={Coridor}
            heading="Empowering Students Through Excellence"
            text="Shri Bhawani Niketan College, established in 1997, offers 
            undergraduate and postgraduate courses in Arts, Commerce, and 
            Science. With a legacy of academic excellence, the college also 
            shines in sports, NCC, NSS, and Rover Ranger activities, fostering 
            holistic development, national service, and vibrant participation 
            in inter-university and national-level events."
            className="xl:mt-[220px] lg:mt-[220px] md:mt-[180px] mt-20"
            OverClassName="xl:translate-y-[100px] lg:translate-y-[100px] md:translate-y-[100px] translate-y-0 xl:-translate-x-[40px] lg:-translate-x-[40px] md:-translate-x-[40px] translate-x-0"
          />
        </div>

        <div className="xl:mt-[250px] lg:mt-[250px] md:mt-[200px] mt-20 flex flex-col gap-[70px]">
          <div className="flex flex-col items-center">
            <p className="text-center xl:text-[50px] lg:text-[50px] md:text-[35px] sm:text-[25px] text-[20px] font-m1 font-bold text-bhawaniDark">
              Voices That Shape Futures
            </p>
            <div className="w-[30%] h-[2px] bg-bhawaniYellow"></div>
          </div>

          <div className="w-[80%] grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mx-auto place-items-center">
            <Message
              LineImage={Chairman}
              heading="Chairman"
              name="Nagendra Singh Bagar"
              text="Believe in your dreams, stay disciplined, and 
              rise above challenges your journey here is the 
              beginning of something extraordinary"
              className=""
              delay={0}
            />

            <Message
              LineImage={Secretary}
              heading="Secretary"
              name="Sudarshan Singh Surpura"
              text="Make every day count. Learn fearlessly, 
              grow relentlessly, and remember your future 
              is shaped by what you do today."
              className=""
              delay={0.3}
            />

            <Message
              LineImage={Principal}
              heading="Principal"
              name="Dr. Mahesh Hapawat"
              text="You are the heartbeat of this institution. 
              Strive for excellence, stay curious, and let 
              your actions define your legacy."
              className=""
              delay={0.6}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default About;
