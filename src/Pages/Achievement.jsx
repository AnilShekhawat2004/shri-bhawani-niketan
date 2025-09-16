import { useEffect, useState } from "react";
import Success from "../assets/Student/success.webp";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import { getAllAchievements } from "../services/operations/achievementAPI";
import Error from "./Error";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Achievement() {
  const [loading, setLoading] = useState(true);
  const [achieve, setAchieve] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const BackUpto = ["/dashboard/achievement"].some((path) =>
    location.pathname.includes(path)
  );

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (achieve.length === 0) return <Error />;

  return (
    <div>
      <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
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
        <div className="w-[80%] mx-auto flex flex-col gap-5 mt-32 items-center ">
          <p className="font-m1 font-bold text-[40px] text-bhawaniDark text-center">
            Our Pride
          </p>
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
      </div>
      {!BackUpto && <Footer />}
    </div>
  );
}

export default Achievement;
