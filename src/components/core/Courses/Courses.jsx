import React, { useEffect, useState } from "react";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";
import Error from "../../../Pages/Error";
import Footer from "../../Common/Footer/Footer";
import RButton from "../../Common/Buttons/rButton"
import { apiConnector } from "../../../services/apiconnector";
import { fetchCourseCategories } from "../../../services/operations/courseAPI";
import { courseCategoryProgramEndpoints } from "../../../services/apis";
import { Link, useParams } from "react-router-dom";

function Courses() {
  const [loading, setLoading] = useState(true);
  const { courseCatName } = useParams();
  const [catProgramId, setCatProgramId] = useState("");
  const [catProDetails, setCatProDetails] = useState(null);
  const [courseData, setCourseData] = useState([]);

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const getAllCatProgram = async () => {
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
        setLoading(false);
      }
    };

    getAllCatProgram();
  }, [courseCatName]);

  useEffect(() => {
    const getCourseData = async () => {
      try {
        const res = await fetchCourseCategories(catProgramId);
        const filtered = res.filter((item) =>
          item.categoryProgram.includes(catProgramId)
        );
        setCourseData(filtered);
      } catch (error) {
        console.log("Error in fetching course : ", error);
      } finally {
        setLoading(false);
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
        {catProDetails && (
          <div>
            <LandingImage
              LineImage={catProDetails.image}
              text={catProDetails.name}
              className="absolute z-20"
              textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
            />
            <RedBar
              className="absolute font-m1"
              textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
              text={catProDetails.description}
            />
          </div>
        )}
      </div>

      <div className="w-[85%] mx-auto mt-32 group grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10">
        {courseData.map(course => (
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
               <p className="text-bhawaniDark font-m1 font-bold text-[30px]">{course.name}</p>
               <p className="text-[16px] font-sans">{getLimitedDescription(course.description, 15)}</p>
               <Link to={`/course/${courseCatName}/${course._id}`}><RButton className="w-[40%]">Learn More</RButton></Link>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Courses;
