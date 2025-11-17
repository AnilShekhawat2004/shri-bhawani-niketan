import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Masonry from "react-masonry-css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Error from "../../../Pages/Error";
import {
  fetchPhotoCategories,
  getAllPhotos,
} from "../../../services/operations/imageAPI";
import Footer from "../../Common/Footer/Footer";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";

function CampusImg() {
  const [loading, setLoading] = useState(0);
  const { campusLifeName } = useParams();
  const [imgCatId, setImgCatId] = useState("");
  const [imgCategory, setImgCategory] = useState(null);
  const [campusData, setCampusData] = useState([]);
  const [showError, setShowError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const getAllCampCat = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await fetchPhotoCategories();
        const imgCat_id = res.find((item) => item._id === campusLifeName);
        setImgCatId(imgCat_id._id);
        setImgCategory(imgCat_id);
      } catch (error) {
        console.log("Error fetching Campus id : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    getAllCampCat();
  }, [campusLifeName]);

  useEffect(() => {
    const getCampusImgDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllPhotos(imgCatId);
        const filtered = res.filter((item) =>
          item.imageCategory.includes(imgCatId)
        );
        setCampusData(filtered);
      } catch (error) {
        console.log("Error in fetching campus image : ", error);
      } finally {
        setLoading(prev => prev - 1)
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

  const BackUpto = ["/dashboard/photos"].some((path) =>
    location.pathname.includes(path)
  );

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (showError) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        {imgCategory && (
          <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
            <LandingImage
              LineImage={imgCategory.image}
              text={imgCategory.name}
              className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
              textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
            />
            <div className="absolute bottom-0 left-0 w-full z-20 xs: sm:translate-y-10 md:translate-y-18 lg:translate-y-24">
              <RedBar
                className="font-m1"
                text={imgCategory.description}
                textClassName="font-m1 text-center text-[14px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:max-w-[450px] px-4 xs:pt-[4px]"
              />
            </div>
          </div>
        )}
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
      <div className="xl:mt-32 lg:mt-32 md:mt-28 mt-20 w-[90%] mx-auto">
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
      {!BackUpto && <Footer />}
    </div>
  );
}

export default CampusImg;
