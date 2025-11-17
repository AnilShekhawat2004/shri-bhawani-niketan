import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Red from "../../../assets/ImageLine/Red.png";
import Yellow from "../../../assets/ImageLine/Yellow.png";
import ContentArea from "../../../assets/Logo/ContentArea.svg";
import Error from "../../../Pages/Error";
import {
  fetchCourseCategories,
  getAllCourses,
} from "../../../services/operations/courseAPI";
import YButton from "../../Common/Buttons/yButton";
import Footer from "../../Common/Footer/Footer";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";

function CourseDetails() {
  const [loading, setLoading] = useState(0);
  const [courseCatDetails, setCourseCatDetails] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await fetchCourseCategories();

        const filtered = res.filter((item) => item._id.includes(courseId));

        setCourseCatDetails(filtered[0]);
      } catch (error) {
        console.log("Error fetching course details", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllCourses(courseId);

        const filtered = res.filter((item) => item.category.includes(courseId));

        setCourseData(filtered);
      } catch (error) {
        console.log("Error in fetching the course details", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const BackUpto = ["/dashboard/courses"].some((path) =>
    location.pathname.includes(path)
  );

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (courseData.length === 0) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
        {courseCatDetails && (
          <div className="relative">
            <LandingImage
              LineImage={courseCatDetails.image}
              text={courseCatDetails.name}
              className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
              textClassName="text-[30px] sm:text-[40px] lg:text-[50px] text-center uppercase font-bold"
            />

            <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
              <RedBar
                className="font-m1"
                text={courseCatDetails.description}
                textClassName="font-m1 text-center text-[12px] sm:text-[18px] md:text-[24px] lg:text-[28px] xs:pt-[3px] px-4"
              />
            </div>
          </div>
        )}

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
      </div>

      <div className="mt-32">
        {courseData.map((course) => (
          <div key={course._id}>
            <div className="w-[85%] mx-auto flex flex-col justify-center items-center gap-2">
              <p className="font-m1 font-bold xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] xs:text-[20px] text-bhawaniDark">
                {course.courseName} at Bhawani
              </p>
              <div className="bg-bhawaniYellow w-[35%] h-[3px]"></div>

              <p className="font-verdana xl:w-[60%] lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[13px] text-center mt-5">
                {course.courseDescription}
              </p>
            </div>

            <div className="bg-bhawaniRed flex flex-col items-center justify-center gap-5 mt-32 w-full h-[auto] pt-10 pb-10 pl-20 pr-20">
              <p className="text-bhawaniYellow font-m1 xl:text-[35px] lg:text-[35px] md:text-[25px] text-[20px] font-bold">
                Course Fee Structure
              </p>

              <p className="xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] font-m2 text-white text-center">
                Supporting Your Dreams with Transparency
              </p>

              <p className="text-white font-m2 xl:w-[50%] lg:w-[50%] md:w-[60%] w-[100%] xl:text-[18px] lg:text-[18px] md:text-[16px] sm:text-[14px] xs:text-[12px] text-center">
                We believe quality education should come with clarity. Here's a
                thoughtful overview of the course fees designed to support your
                journey, not burden it.
              </p>

              <div className="lg:w-[45%] grid sm:grid-cols-1 lg:grid-cols-4 gap-2 justify-center items-center mt-5">
                <div className="flex xl:flex-col lg:flex-col flex-row xl:gap-2 lg:gap-2 md:gap-[62px] gap-8">
                  <p className="text-bhawaniYellow font-m1 xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] ">
                    Years
                  </p>
                  <p className="text-bhawaniYellow font-m1 xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[16px] ">
                    Amount
                  </p>
                </div>
                {course.fees.map((fees, index) => (
                  <div
                    key={index}
                    className="flex lg:flex-row justify-center items-center lg:gap-[50px]"
                  >
                    <div className="lg:w-[1px] lg:h-[50px] bg-bhawaniYellow"></div>
                    <div className="flex xl:flex-col lg:flex-col flex-row xl:gap-0 lg:gap-0 md:gap-[80px] gap-[50px] justify-center items-center">
                      <p className="text-white font-m1 xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px]">
                        {fees.year}
                      </p>
                      <p className="text-white font-m1 xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px]">
                        ₹{fees.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="xl:w-[50%] lg:w-[50%] md:w-[60%] w-[80%] mx-auto font-m2 xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] mt-32 text-center">
              As you’ve seen, the yearly course fees are shared above. But to
              make things even clearer and more convenient, we’ve also broken
              them down semester-wise below so you can understand everything at
              a glance. If there’s ever any doubt, we’re always here to support
              and guide you.
            </p>

            <div className="flex flex-col items-center justify-center gap-5 mt-10 w-full h-[auto] pt-10 pb-10 pl-20 pr-20">
              <p className="text-bhawaniDark font-m1 xl:text-[35px] lg:text-[35px] md:text-[25px] sm:text-[20px] xs:text-[18px] font-bold text-center">
                Course Fee Structure According to The Semester
              </p>

              <p className="text-bhawaniPink xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[18px] xs:text-[16px] font-m2 text-center">
                Your Academic Journey, One Semester at a Time
              </p>

              <p className="font-m2 xl:w-[50%] lg:w-[50%] md:w-[60%] w-[100%] xl:text-[20px] lg:text-[20px] md:text-[18px] sm:text-[16px] xs:text-[14px] text-center">
                Each semester is a step forward planned with care, aligned with
                your dreams, and built for your success.
              </p>

              <div className="lg:w-[70%] grid sm:grid-cols-1 lg:grid-cols-7 gap-2 justify-center items-center mt-5">
                <div className="flex xl:flex-col lg:flex-col flex-row xl:gap-2 lg:gap-2 md:gap-[62px] gap-8">
                  <p className="text-bhawaniDark font-m1 xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[18px] xs:text-[16px] ">
                    Semester
                  </p>
                  <p className="text-bhawaniDark font-m1 xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[18px] xs:text-[16px] ">
                    Amount
                  </p>
                </div>
                {course.semesterFees.map((semesterFees, index) => (
                  <div
                    key={index}
                    className="flex lg:flex-row justify-center items-center lg:gap-[50px]"
                  >
                    <div className="lg:w-[1px] lg:h-[50px] bg-bhawaniDark"></div>
                    <div className="flex xl:flex-col lg:flex-col flex-row xl:gap-0 lg:gap-0 md:gap-[80px] gap-[70px] justify-center items-center">
                      <p className=" font-m1 xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px] xs:text-[14px]">
                        {semesterFees.semesterNumber}
                      </p>
                      <p className=" font-m1 xl:text-[22px] lg:text-[22px] md:text-[18px] sm:text-[16px] xs:text-[14px]">
                        ₹{semesterFees.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[90%] xs:w-[100%] mx-auto xl:mt-32 lg:mt-32 md:mt-24 mt-20 flex justify-center items-center">
              <img
                src={Yellow}
                alt="Yellow"
                loading="lazy"
                draggable="false"
                className="xl:w-[180px] lg:w-[180px] md:w-[150px] sm:w-[90px] w-[50px] xl:-translate-y-36 lg:-translate-y-36 md:-translate-y-36 sm:-translate-y-36 -translate-y-24 "
              />
              <div className="xl:w-[65%] lg:w-[65%] md:w-[65%] sm:w-[70%] w-[80%] flex flex-col h-auto rounded-3xl shadow-2xl xl:text-[25px] lg:text-[25px] md:text-[20px] sm:text-[18px] text-[12px] font-m2 xl:py-14 lg:py-14 md:py-10 sm:py-5 py-4 xl:px-16 lg:px-16 md:px-12 sm:px-6 px-5">
                <p>
                  From our first hello to the final farewell every moment
                  becomes a memory, every step a story. A journey of growth,
                  laughter, and learning to cherish for a lifetime
                </p>

                <p className="mt-10 font-m1 text-bhawaniDark flex justify-end">
                  – A {course.duration} year journey at Shri Bhawani Niketan
                  College
                </p>
              </div>

              <img
                src={Red}
                alt="Red"
                loading="lazy"
                draggable="false"
                className="xl:w-[180px] lg:w-[180px] md:w-[150px] sm:w-[90px] w-[50px] xl:translate-y-32 lg:translate-y-32 md:translate-y-32 sm:translate-y-32 translate-y-24"
              />
            </div>

            <div className="xl:mt-32 lg:mt-32 md:mt-24 mt-20 flex flex-col justify-center items-center mb-10">
              <p className="font-m1 xl:text-[40px] lg:text-[40px] md:text-[30px] sm:text-[25px] text-[20px] font-bold text-bhawaniDark text-center ">
                Every journey begins with a guide Meet yours.
              </p>
              <div className="w-[60%] xl:h-[3px] lg:h-[3px] h-[1px] bg-bhawaniYellow"></div>
              <div className="relative w-full flex justify-center xl:h-[300px] lg:h-[300px] md:h-[250px] h-[200px] mx-auto bg-bhawaniDark mt-10">
                <img
                  src={ContentArea}
                  alt="ContentArea"
                  loading="lazy"
                  draggable="false"
                  className="w-full h-full object-cover absolute"
                />

                <div className="absolute flex justify-center items-center xl:w-[60%] lg:w-[60%] md:w-[60%] w-[85%] mx-auto mt-5">
                  <p className=" text-center text-bhawaniYellow font-m1 font-bold xl:text-[35px] lg:text-[35px] md:text-[25px] sm:text-[20px] text-[16px] ">
                    "Not all heroes wear capes some stand before you with
                    knowledge, kindness, and the power to change lives through
                    teaching."
                  </p>
                </div>

                <Link
                  to={`/staff/${course.instructorName
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  className="flex items-end justify-center mb-8"
                >
                  <YButton className="absolute hover:border hover:border-bhawaniYellow text-[17px] xs:text-[14px]">
                    {"Meet Your Mentor"}
                  </YButton>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!BackUpto && <Footer />}
    </div>
  );
}

export default CourseDetails;
