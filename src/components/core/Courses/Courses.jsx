import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Error from "../../../Pages/Error";
import { apiConnector } from "../../../services/apiconnector";
import { courseCategoryProgramEndpoints } from "../../../services/apis";
import { fetchCourseCategories } from "../../../services/operations/courseAPI";
import RButton from "../../Common/Buttons/rButton";
import Footer from "../../Common/Footer/Footer";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";

function Courses() {
  const [loading, setLoading] = useState(0);
  const { courseCatName } = useParams();
  const [catProgramId, setCatProgramId] = useState("");
  const [catProDetails, setCatProDetails] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getAllCatProgram = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await apiConnector(
          "GET",
          courseCategoryProgramEndpoints.SHOW_ALL_CATEGORYPROGRAM_API
        );
        const catPro_id = res?.data?.data?.filter(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === courseCatName
        )[0];
        setCatProgramId(catPro_id._id);
        setCatProDetails(catPro_id);
      } catch (error) {
        console.log("Error fetching course category : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    getAllCatProgram();
  }, [courseCatName]);

  useEffect(() => {
    const getCourseData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await fetchCourseCategories(catProgramId);
        const filtered = res.filter((item) =>
          item.categoryProgram.includes(catProgramId)
        );
        setCourseData(filtered);
      } catch (error) {
        console.log("Error in fetching course : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    if (catProgramId) {
      getCourseData();
    }
  }, [catProgramId]);

  useEffect(() => {
    if (!loading && courseData.length === 0) {
      const timeout = setTimeout(() => {
        setShowError(true);
      }, 4000); // 4 seconds delay before showing error
      return () => clearTimeout(timeout);
    }
  }, [loading, courseData]);

  const getLimitedDescription = (text, wordLimit = 20) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

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
        {catProDetails && (
          <div>
            <LandingImage
              LineImage={catProDetails.image}
              text={catProDetails.name}
              className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
              textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
            />
            <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
              <RedBar
                className="font-m1"
                text={catProDetails.description}
                textClassName="font-m1 text-center text-[16px] sm:text-[22px] md:text-[24px] lg:text-[28px] px-4"
              />
            </div>
          </div>
        )}
      </div>

      <div className="w-[85%] mx-auto xl:mt-[150px] lg:mt-[150px] mt-24 group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {courseData.map((course) => (
          <div
            key={course._id}
            className="w-[90%] lg:h-[500px] bg-gray-100 rounded-2xl shadow-lg 
            lg:hover:shadow-2xl lg:hover:-translate-y-3 transition-all duration-500"
          >
            <img
              src={course.image}
              alt={course.name}
              loading="lazy"
              className="w-full h-[50%] object-cover rounded-t-2xl"
            ></img>

            <div className="mt-3 ml-4 grid grid-cols-1 gap-3">
              <p className="text-bhawaniDark font-m1 font-bold xl:text-[30px] lg:text-[30px] md:text-[25px] sm:text-[20px] xs:text-[15px]">
                {course.name}
              </p>
              <p className="xl:text-[16px] lg:text-[16px] md:text-[15px] sm:text-[14px] xs:text-[12px] font-sans">
                {getLimitedDescription(course.description, 15)}
              </p>
              <Link to={`/course/${courseCatName}/${course._id}`}>
                <RButton className="w-[40%] xl:px-4 lg:px-4 md:px-3 px-2 xl:py-3 lg:py-3 md:py-2 py-1 xl:text-[15px] lg:text-[15px] md:text-[14px] sm:text-[13px] text-[11px]">Learn More</RButton>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
