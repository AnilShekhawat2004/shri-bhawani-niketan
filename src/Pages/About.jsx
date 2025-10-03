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
    <div className="">
      <div>
        <div>
          <LandingImage
            LineImage={AboutUs}
            text={"Every story has a beginning this is ours."}
            className="absolute z-20"
            textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
          />

          <RedBar
            className="absolute font-m1"
            textClassName="font-m1 text-center flex justify-center text-[22px] translate-x-[150px] -translate-y-[20px]"
            text="In 1942, Shri Bhawani Niketan Shiksha Samiti was founded 
                    in Jaipur by Maharaja Sawai Man Singh Ji-II. The society, 
                    committed to providing quality education, aims to cultivate 
                    skilled, morally grounded individuals for the nation."
          />
        </div>

        <div className="mt-32 w-[80%] mx-auto">
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
            OverClassName="translate-y-[60px] -translate-x-[50px]"
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
            className="mt-32"
            OverClassName=" translate-y-[120px] translate-x-[50px]"
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
            className="mt-[220px]"
            OverClassName=" translate-y-[100px] -translate-x-[40px]"
          />
        </div>

        <div className="mt-[250px] flex flex-col gap-[70px]">
          <div className="flex flex-col items-center">
            <p className="text-center text-[50px] font-m1 font-bold text-bhawaniDark">
              Voices That Shape Futures
            </p>
            <div className="w-[30%] h-[2px] bg-bhawaniYellow"></div>
          </div>

          <div className="w-[80%] flex flex-row gap-4 mx-auto">
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
