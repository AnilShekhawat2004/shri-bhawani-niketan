import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Success from "../assets/Student/success.webp";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import { getAllAchievements } from "../services/operations/achievementAPI";
import Error from "./Error";

function Achievement() {
  const [loading, setLoading] = useState(0);
  const [achieve, setAchieve] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllAchievements();
        let filteredAchieveData = res.filter((item) =>
          item.status.includes("Published")
        );
        if (filteredAchieveData && filteredAchieveData.length > 0) {
          setAchieve(filteredAchieveData);
        }
      } catch (error) {
        console.error("Error fetching achievement : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchData();
  }, []);

  const BackUpto = ["/dashboard/achievement"].some((path) =>
    location.pathname.includes(path)
  );

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (achieve.length === 0) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className={`relative ${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
        <LandingImage
          LineImage={Success}
          text="Achievement"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[25px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="The glory you see is built on moments that tested our limits we rose, we fought, and we conquered"
            textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[500px] px-4 xs:pt-[5px]"
          />
        </div>
      </div>

      <div
        onClick={() => navigate(-1)}
        className={
          BackUpto
            ? "absolute z-50 flex gap-2 justify-center items-center px-4 py-3 bg-bhawaniRed shadow-md rounded-lg translate-y-10 translate-x-[80px] cursor-pointer"
            : "hidden"
        }
      >
        <FaArrowLeft className=" text-white" />
        <p className="text-white">Back To Dashboard</p>
      </div>

      <div>
        <div className="xl:w-[80%] lg:w-[80%] md:w-[80%] w-[100%] mx-auto flex flex-col gap-5 xl:mt-[150px] lg:mt-[150px] md:mt-28 mt-20 items-center ">
          <p className="font-m1 font-bold xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px] text-bhawaniDark text-center">
            Our Pride
          </p>
          <div className="w-[60%] h-[2px] bg-bhawaniYellow "></div>
        </div>

        <div className="w-[80%] mt-20 mx-auto grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
          {achieve.map((item, achiever) => (
            <div
              key={achiever}
              className="relative mx-auto xl:w-[80%] lg:w-[80%] md:w-[80%] sm:w-[60%] w-[100%] xl:h-[400px] lg:h-[400px] md:h-[400px] h-[300px] xl:mb-20 lg:mb-20 md:mb-16 sm:mb-10 mb-7 overflow-hidden shadow-xl rounded-lg xl:shadow-2xl lg:hover:shadow-2xl cursor-pointer"
            >
              <div className="absolute z-10 flex flex-col ml-3 bottom-0 left-0 mb-3">
                <p className="text-bhawaniDark xl:text-[25px] lg:text-[25px] md:text-[20px] text-[18px] font-bold font-verdana">
                  {item.title}
                </p>
                <p className="text-white xl:text-[14px] lg:text-[14px] md:text-[14px] text-[12px] font-verdana">
                  {item.descritption}
                </p>
              </div>
              <img
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
                className="absolute w-full h-full object-cover xl:hover:scale-110 lg:hover:scale-110 transition-all duration-500"
              ></img>
            </div>
          ))}
        </div>
      </div>
      {!BackUpto && <Footer />}
    </div>
  );
}

export default Achievement;
