import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Campus from "../assets/College/CampusLife.png";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import { fetchPhotoCategories } from "../services/operations/imageAPI";
import Error from "./Error";

function CampusLife() {
  const [loading, setLoading] = useState(0);
  const [imgCategory, setImgCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await fetchPhotoCategories();
        if (res && res.length > 0) {
          setImgCategory(res);
        }
      } catch (error) {
        console.error("Error fetching the image category : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchData();
  }, []);

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (imgCategory.length === 0) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Campus}
          text="Campus Life"
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
        />
        <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="At Shri Bhawani Niketan, college life isn't just lived it's celebrated, remembered, and carried in the soul long after the final bell rings."
            textClassName="font-m1 text-center text-[12px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[450px] px-4 xs:pt-[2px]"
          />
        </div>
      </div>

      <div className="w-[80%] mx-auto xl:mt-32 lg:mt-32 md:mt-28 mt-20">
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="xl:text-[40px] lg:text-[40px] md:text-[35px] sm:text-[30px] xs:text-[25px] font-m1 font-extrabold text-bhawaniDark text-center">
            Campus Life: The Spirit That Connects Us
          </p>
          <div className="bg-bhawaniYellow w-[70%] h-[2px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 xl:mt-32 lg:mt-32 md:mt-28 mt-20">
          {imgCategory.map((imageCat) => (
            <Link
              to={`/campusLife/${imageCat._id}`}
              key={imageCat._id}
              className="bg-gray-100 w-[80%] mx-auto xl:h-[120px] lg:h-[120px] h-[100px] flex justify-center items-center border-8 border-bhawaniLight shadow-lg lg:hover:shadow-2xl cursor-pointer transition-all duration-500"
            >
              <p className="xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] text-[16px] text-bhawaniDark font-verdana font-bold">
                {imageCat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CampusLife;
