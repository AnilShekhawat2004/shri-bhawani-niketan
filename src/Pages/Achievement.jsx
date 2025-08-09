import React, { useEffect, useState } from "react";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import Footer from "../components/Common/Footer/Footer";
import Error from "./Error";
import { getAllAchievements } from "../services/operations/achievementAPI";
import Success from "../assets/Student/success.webp";

function Achievement() {
  const [loading, setLoading] = useState(true);
  const [achieve, setAchieve] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllAchievements();
        if (res && res.length > 0) {
          setAchieve(res);
        }
      } catch (error) {
        console.error("Error fetching achievement : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (achieve.length === 0) return <Error />;

  return (
    <div>
      <LandingImage
        LineImage={Success}
        text="Achievement"
        className="absolute z-20"
        textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
      />
      <RedBar
        className="absolute font-m1"
        textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
        text="The glory you see is built on moments that tested our limits we rose, we fought, and we conquered"
      />

      <div className="w-[80%] mx-auto flex flex-col gap-5 mt-32 items-center ">
        <p className="font-m1 font-bold text-[40px] text-bhawaniDark text-center">Our Pride</p>
        <div className="w-[60%] h-[2px] bg-bhawaniYellow "></div>
      </div>

      <div className="w-[80%] mt-20 mx-auto grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5 ">
        {achieve.map((item, achiever) => (
          <div
            key={achiever}
            className="relative w-[80%] h-[400px] mb-20 overflow-hidden shadow-xl rounded-lg lg:hover:shadow-2xl cursor-pointer"
          >
            <div className="absolute z-10 flex flex-col ml-3 translate-y-[300px]">
              <p className="text-bhawaniDark text-[25px] font-bold font-verdana">
                {item.title}
              </p>
              <p className="text-white text-[14px] font-verdana">
                {item.descritption}
              </p>
            </div>
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="absolute w-full h-full object-cover lg:hover:scale-110 transition-all duration-500"
            ></img>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Achievement;
