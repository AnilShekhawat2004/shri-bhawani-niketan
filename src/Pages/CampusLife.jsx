import React, { useEffect, useState } from "react";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import Footer from "../components/Common/Footer/Footer";
import Error from "./Error";
import { fetchPhotoCategories } from "../services/operations/imageAPI";
import Campus from "../assets/College/CampusLife.png";
import { Link } from "react-router-dom";

function CampusLife() {
  const [loading, setLoading] = useState(true);
  const [imgCategory, setImgCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchPhotoCategories();
        if (res && res.length > 0) {
          setImgCategory(res);
        }
      } catch (error) {
        console.error("Error fetching the image category : ", error);
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
  if (imgCategory.length === 0) return <Error />;

  return (
    <div>
      <LandingImage
        LineImage={Campus}
        text="Campus Life"
        className="absolute z-20"
        textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
      />
      <RedBar
        className="absolute font-m1"
        textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
        text="At Shri Bhawani Niketan, college life isn't just lived it's celebrated, remembered, and carried in the soul long after the final bell rings."
      />

      <div className="w-[80%] mx-auto mt-32">
        <div className="flex flex-col gap-3 justify-center items-center">
           <p className="text-[40px] font-m1 font-extrabold text-bhawaniDark">Campus Life: The Spirit That Connects Us</p>
           <div className="bg-bhawaniYellow w-[70%] h-[2px]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-y-10 mt-32">
           {imgCategory.map(imageCat => (
            <Link
              to={`/campusLife/${imageCat.name.split(" ").join("-").toLowerCase()}`}
              key={imageCat._id}
              className="bg-gray-100 w-[80%] lg:h-[120px] flex justify-center items-center border-8 border-bhawaniLight shadow-lg lg:hover:shadow-2xl cursor-pointer transition-all duration-500"
            >
              <p className="text-[22px] text-bhawaniDark font-verdana font-bold">{imageCat.name}</p>
            </Link>
           ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CampusLife;