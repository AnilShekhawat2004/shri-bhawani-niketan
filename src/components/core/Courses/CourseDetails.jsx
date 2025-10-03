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
  const [loading, setLoading] = useState(true);
  const [loadingData, setLoadingData] = useState(true);
  const [courseCatDetails, setCourseCatDetails] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await fetchCourseCategories();

        const filtered = res.filter((item) => item._id.includes(courseId));

        setCourseCatDetails(filtered[0]);
      } catch (error) {
        console.log("Error fetching course details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const res = await getAllCourses(courseId);

        const filtered = res.filter((item) => item.category.includes(courseId));

        setCourseData(filtered);
      } catch (error) {
        console.log("Error in fetching the course details", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const BackUpto = ["/dashboard/courses"].some((path) =>
    location.pathname.includes(path)
  );

  if (loading || loadingData)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (courseData.length === 0) return <Error />;

  return (
    <div>
      <div className={`${BackUpto ? "-mt-[136px]" : "mt-0"}`}>
        {courseCatDetails && (
          <div>
            <LandingImage
              LineImage={courseCatDetails.image}
              text={courseCatDetails.name}
              className="absolute z-20"
              textClassName="text-[50px] w-[800px] text-center uppercase font-bold"
            />
            <RedBar
              className="absolute font-m1"
              textClassName="font-m1 text-center flex justify-center text-[30px] translate-x-[150px] -translate-y-[20px]"
              text={courseCatDetails.description}
            />
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
              <p className="font-m1 font-bold text-[40px] text-bhawaniDark">
                {course.courseName} at Bhawani
              </p>
              <div className="bg-bhawaniYellow w-[35%] h-[3px]"></div>

              <p className="font-verdana w-[60%] text-[20px] text-center mt-5">
                {course.courseDescription}
              </p>
            </div>

            <div className="bg-bhawaniRed flex flex-col items-center justify-center gap-5 mt-32 w-full h-[auto] pt-10 pb-10 pl-20 pr-20">
              <p className="text-bhawaniYellow font-m1 text-[35px] font-bold">
                Course Fee Structure
              </p>

              <p className="text-[20px] font-m2 text-white">
                Supporting Your Dreams with Transparency
              </p>

              <p className="text-white font-m2 w-[50%] text-[18px] text-center">
                We believe quality education should come with clarity. Here's a
                thoughtful overview of the course fees designed to support your
                journey, not burden it.
              </p>

              <div className="lg:w-[45%] grid sm:grid-cols-1 lg:grid-cols-4 gap-2 justify-center items-center mt-5">
                <div className="flex flex-col gap-2">
                  <p className="text-bhawaniYellow font-m1 text-[22px] ">
                    Years
                  </p>
                  <p className="text-bhawaniYellow font-m1 text-[22px] ">
                    Amount
                  </p>
                </div>
                {course.fees.map((fees, index) => (
                  <div
                    key={index}
                    className="flex lg:flex-row justify-center items-center lg:gap-[50px]"
                  >
                    <div className="lg:w-[1px] lg:h-[50px] bg-bhawaniYellow"></div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="text-white font-m1 text-[20px]">
                        {fees.year}
                      </p>
                      <p className="text-white font-m1 text-[20px]">
                        ₹{fees.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="w-[50%] mx-auto font-m2 text-[20px] mt-32 text-center">
              As you’ve seen, the yearly course fees are shared above. But to
              make things even clearer and more convenient, we’ve also broken
              them down semester-wise below so you can understand everything at
              a glance. If there’s ever any doubt, we’re always here to support
              and guide you.
            </p>

            <div className="flex flex-col items-center justify-center gap-5 mt-10 w-full h-[auto] pt-10 pb-10 pl-20 pr-20">
              <p className="text-bhawaniDark font-m1 text-[35px] font-bold">
                Course Fee Structure According to The Semester
              </p>

              <p className="text-bhawaniPink text-[25px] font-m2">
                Your Academic Journey, One Semester at a Time
              </p>

              <p className="font-m2 w-[50%] text-[20px] text-center">
                Each semester is a step forward planned with care, aligned with
                your dreams, and built for your success.
              </p>

              <div className="lg:w-[70%] grid sm:grid-cols-1 lg:grid-cols-7 gap-2 justify-center items-center mt-5">
                <div className="flex flex-col gap-2">
                  <p className="text-bhawaniDark font-m1 text-[25px] ">
                    Semester
                  </p>
                  <p className="text-bhawaniDark font-m1 text-[25px] ">
                    Amount
                  </p>
                </div>
                {course.semesterFees.map((semesterFees, index) => (
                  <div
                    key={index}
                    className="flex lg:flex-row justify-center items-center lg:gap-[50px]"
                  >
                    <div className="lg:w-[1px] lg:h-[50px] bg-bhawaniDark"></div>
                    <div className="flex flex-col justify-center items-center">
                      <p className=" font-m1 text-[22px]">
                        {semesterFees.semesterNumber}
                      </p>
                      <p className=" font-m1 text-[22px]">
                        ₹{semesterFees.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-[90%] mx-auto mt-32 flex justify-center items-center">
              <img
                src={Yellow}
                alt="Yellow"
                loading="lazy"
                draggable="false"
                className="lg:w-[180px] -translate-y-36"
              />
              <div className="w-[65%] flex flex-col h-auto rounded-3xl shadow-2xl text-[25px] font-m2 pt-14 pb-14 pl-16 pr-16">
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
                className="lg:w-[180px] translate-y-32"
              />
            </div>

            <div className="mt-32 flex flex-col justify-center items-center mb-10">
              <p className="font-m1 text-[40px] font-bold text-bhawaniDark ">
                Every journey begins with a guide Meet yours.
              </p>
              <div className="w-[60%] h-[3px] bg-bhawaniYellow"></div>
              <div className="relative w-full flex justify-center lg:h-[300px] mx-auto bg-bhawaniDark mt-10">
                <img
                  src={ContentArea}
                  alt="ContentArea"
                  loading="lazy"
                  draggable="false"
                  className="w-full h-full object-cover absolute"
                />

                <div className="absolute flex justify-center items-center w-[60%] mx-auto mt-5">
                  <p className=" text-center text-bhawaniYellow font-m1 font-bold text-[35px]">
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
                  <YButton className="absolute hover:border hover:border-bhawaniYellow">
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
