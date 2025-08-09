import React, { useEffect, useState } from "react";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";
import Footer from "../../Common/Footer/Footer";
import { useParams } from "react-router-dom";
import { apiConnector } from "../../../services/apiconnector";
import { photoEndpoints } from "../../../services/apis";
import { getAllPhotos } from "../../../services/operations/imageAPI";
import Error from "../../../Pages/Error";
import Masonry from "react-masonry-css";

function CampusImg() {
  const [loading, setLoading] = useState(true);
  const { campusLifeName } = useParams();
  const [imgCatId, setImgCatId] = useState("");
  const [imgCategory, setImgCategory] = useState(null);
  const [campusData, setCampusData] = useState([]);

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getAllCampCat = async () => {
      try {
        const res = await apiConnector(
          "GET",
          photoEndpoints.PHOTO_CATEGORIES_API
        );
        const imgCat_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === campusLifeName
        )[0];
        setImgCatId(imgCat_id._id);
        setImgCategory(imgCat_id);
      } catch (error) {
        console.log("Error fetching Campus id : ", error);
      } finally {
        setLoading(false);
      }
    };

    getAllCampCat();
  }, [campusLifeName]);

  useEffect(() => {
    const getCampusImgDetails = async () => {
      try {
        const res = await getAllPhotos(imgCatId);
        const filtered = res.filter((item) =>
          item.imageCategory.includes(imgCatId)
        );
        setCampusData(filtered);
      } catch (error) {
        console.log("Error in fetching campus image : ", error);
      } finally {
        setLoading(false);
      }
    };

    if (imgCatId) {
      getCampusImgDetails();
    }
  }, [imgCatId]);

  useEffect(() => {
    if (!loading && campusData.length === 0) {
      const timeout = setTimeout(() => {
        setShowError(true);
      }, 4000); // 4 seconds delay before showing error
      return () => clearTimeout(timeout);
    }
  }, [loading, campusData]);

  if (loading)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (showError) return <Error />;

  return (
    <div>
      <div className="relative">
        {imgCategory && (
          <div>
            <LandingImage
              LineImage={imgCategory.image}
              text={imgCategory.name}
              className="absolute z-20"
              textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
            />
            <RedBar
              className="absolute font-m1"
              textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
              text={imgCategory.description}
            />
          </div>
        )}
      </div>
      <div className="mt-32 w-[90%] mx-auto">
        <Masonry
          breakpointCols={{
            default: 3,
            700: 2,
            500: 1,
          }}
          className="flex -ml-4"
          columnClassName="pl-4"
        >
          {campusData.map((campus) => (
            <div key={campus._id} className="mb-4">
              <img
                src={campus.thumbnail}
                alt="Campus life"
                loading="lazy"
                className="w-full rounded-lg shadow-lg lg:hover:scale-105 lg:hover:shadow-2xl transition-all duration-300"
              />
            </div>
          ))}
        </Masonry>
      </div>
      <Footer />
    </div>
  );
}

export default CampusImg;
