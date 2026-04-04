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
import LoaderOverlay from "../../Common/LoaderOverlay";

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
      setLoading((prev) => prev + 1);
      try {
        const res = await fetchPhotoCategories();
        const imgCat_id = res.find((item) => item._id === campusLifeName);
        setImgCatId(imgCat_id._id);
        setImgCategory(imgCat_id);
      } catch (error) {
        console.log("Error fetching Campus id : ", error);
      } finally {
        setLoading((prev) => prev - 1);
      }
    };

    getAllCampCat();
  }, [campusLifeName]);

  useEffect(() => {
    const getCampusImgDetails = async () => {
      setLoading((prev) => prev + 1);
      try {
        const res = await getAllPhotos(imgCatId);
        const filtered = res.filter((item) =>
          item.imageCategory.includes(imgCatId),
        );
        setCampusData(filtered);
      } catch (error) {
        console.log("Error in fetching campus image : ", error);
      } finally {
        setLoading((prev) => prev - 1);
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
    location.pathname.includes(path),
  );

  if (showError) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"} relative`}>
        {imgCategory && (
          <div className="relative">
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

        {BackUpto && (
          <div
            onClick={() => navigate(-1)}
            className="fixed z-50 top-32 left-10 flex items-center gap-3 px-5 py-3
                  bg-white/20 backdrop-blur-md border border-white/30
                  shadow-lg rounded-xl cursor-pointer
                  hover:bg-bhawaniRed transition-all duration-300 group"
          >
            <FaArrowLeft className="text-white group-hover:translate-x-[-3px] transition" />
            <p className="text-white font-m1">Back To Dashboard</p>
          </div>
        )}
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
      {loading > 0 && <LoaderOverlay />}
    </div>
  );
}

export default CampusImg;
