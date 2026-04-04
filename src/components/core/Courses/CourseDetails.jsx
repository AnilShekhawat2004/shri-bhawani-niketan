import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Red from "../../../assets/ImageLine/Red.png";
import Yellow from "../../../assets/ImageLine/Yellow.png";
import ContentArea from "../../../assets/Logo/ContentArea.svg";
import Error from "../../../Pages/Error";
import { getCourseCategoryDetails } from "../../../services/operations/courseAPI";
import YButton from "../../Common/Buttons/yButton";
import Footer from "../../Common/Footer/Footer";
import LandingImage from "../../Common/landingImage";
import RedBar from "../../Common/redBar";
import LoaderOverlay from "../../Common/LoaderOverlay";

function CourseDetails() {
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const res = await getCourseCategoryDetails(courseId);
        console.log("This is the response : ", res);
        setCourseData(res);
      } catch (error) {
        console.log("Error fetching course data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const BackUpto = ["/dashboard/courses"].some((path) =>
    location.pathname.includes(path),
  );

  if (loading) {
    return <LoaderOverlay />;
  }

  if (!courseData) {
    return <Error />;
  }

  return (
  <div className="overflow-x-hidden">

    {/* Hero Section */}
    <div className={`${BackUpto ? "-mt-[140px]" : "mt-0"} relative`}>
      {courseData && (
        <div className="relative">

          <LandingImage
            LineImage={courseData.image}
            text={courseData.name}
            className="z-10 lg:h-[720px] md:h-[600px] sm:h-[500px]"
            textClassName="text-[28px] sm:text-[40px] lg:text-[52px] text-center uppercase font-bold"
          />

          <div className="absolute bottom-0 left-0 w-full z-20 translate-y-16">
            <RedBar
              className="font-m1"
              text={courseData.description}
              textClassName="font-m1 text-center text-[13px] sm:text-[18px] md:text-[22px] lg:text-[26px] px-4"
            />
          </div>
        </div>
      )}

      {/* Back Button */}
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

    {/* Course Content */}
    <div className="mt-32 space-y-36 pb-10">

      {courseData?.courses?.map((course) => (
        <div key={course._id} className="space-y-24">

          {/* Course Intro */}
          <div className="w-[85%] mx-auto flex flex-col items-center text-center gap-6">

            <p className="font-m1 font-bold xl:text-[40px] lg:text-[36px] md:text-[30px] text-[22px] text-bhawaniDark">
              {course.courseName} at Bhawani
            </p>

            <div className="bg-bhawaniYellow w-[120px] h-[3px]"></div>

            <p className="font-verdana xl:w-[60%] md:w-[70%] w-[90%] xl:text-[20px] md:text-[18px] text-[15px] leading-relaxed">
              {course.courseDescription}
            </p>
          </div>


          {/* Year Fees */}
          <div className="bg-bhawaniRed py-16 px-6">

            <div className="max-w-[1100px] mx-auto flex flex-col items-center gap-6">

              <p className="text-bhawaniYellow font-m1 xl:text-[36px] md:text-[28px] text-[22px] font-bold">
                Course Fee Structure
              </p>

              <p className="text-white font-m2 text-center xl:text-[20px] md:text-[18px] text-[15px]">
                Supporting Your Dreams with Transparency
              </p>

              <p className="text-white font-m2 text-center max-w-[650px] xl:text-[18px] md:text-[16px] text-[14px]">
                We believe quality education should come with clarity. Here's a
                thoughtful overview of the course fees designed to support your
                journey, not burden it.
              </p>


              {/* Fee Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 mt-10 text-center">

                <div className="flex flex-col gap-2">
                  <p className="text-bhawaniYellow font-m1 text-[20px]">
                    Years
                  </p>
                  <p className="text-bhawaniYellow font-m1 text-[20px]">
                    Amount
                  </p>
                </div>

                {course.fees.map((fees, index) => (
                  <div key={index} className="flex flex-col items-center gap-2">
                    <p className="text-white font-m1 text-[18px]">
                      {fees.year}
                    </p>

                    <p className="text-white font-m1 text-[18px]">
                      ₹{fees.amount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Semester Intro */}
          <p className="max-w-[700px] mx-auto text-center font-m2 xl:text-[20px] md:text-[18px] text-[15px]">
            As you’ve seen, the yearly course fees are shared above. But to
            make things even clearer and more convenient, we’ve also broken
            them down semester-wise below so you can understand everything at
            a glance.
          </p>


          {/* Semester Fees */}
          <div className="flex flex-col items-center gap-6 px-6">

            <p className="text-bhawaniDark font-m1 xl:text-[36px] md:text-[28px] text-[22px] font-bold text-center">
              Course Fee Structure According to The Semester
            </p>

            <p className="text-bhawaniPink xl:text-[24px] md:text-[20px] text-[16px] font-m2 text-center">
              Your Academic Journey, One Semester at a Time
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-7 gap-8 mt-8 text-center">

              <div className="flex flex-col gap-2">
                <p className="text-bhawaniDark font-m1 text-[20px]">
                  Semester
                </p>
                <p className="text-bhawaniDark font-m1 text-[20px]">
                  Amount
                </p>
              </div>

              {course.semesterFees.map((semesterFees, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <p className="font-m1 text-[18px]">
                    {semesterFees.semesterNumber}
                  </p>

                  <p className="font-m1 text-[18px]">
                    ₹{semesterFees.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>


          {/* Quote Section */}
          <div className="w-[90%] mx-auto flex justify-center items-center relative">

            <img
              src={Yellow}
              alt="Yellow"
              className="w-[120px] absolute left-0 -top-10"
            />

            <div className="max-w-[750px] shadow-2xl rounded-3xl text-center font-m2 py-12 px-10 text-[18px]">
              <p>
                From our first hello to the final farewell every moment
                becomes a memory, every step a story.
              </p>

              <p className="mt-10 font-m1 text-bhawaniDark text-right">
                – A {course.duration} year journey at Shri Bhawani Niketan College
              </p>
            </div>

            <img
              src={Red}
              alt="Red"
              className="w-[120px] absolute right-0 -bottom-10"
            />
          </div>


          {/* Mentor Section */}
          <div className="flex flex-col items-center gap-6 mt-24">

            <p className="font-m1 xl:text-[40px] md:text-[30px] text-[22px] font-bold text-bhawaniDark text-center">
              Every journey begins with a guide. Meet yours.
            </p>

            <div className="w-[120px] h-[3px] bg-bhawaniYellow"></div>

            <div className="relative w-full max-w-[1100px] h-[260px] bg-bhawaniDark rounded-xl overflow-hidden">

              <img
                src={ContentArea}
                alt="ContentArea"
                className="absolute w-full h-full object-cover opacity-30"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

                <p className="text-bhawaniYellow font-m1 font-bold xl:text-[32px] md:text-[24px] text-[18px] max-w-[800px]">
                  "Not all heroes wear capes — some stand before you with
                  knowledge and the power to change lives through teaching."
                </p>

                <Link
                  to={`/staff/${course.instructorName
                    .split(" ")
                    .join("-")
                    .toLowerCase()}`}
                  className="mt-6"
                >
                  <YButton className="hover:border hover:border-bhawaniYellow text-[17px]">
                    Meet Your Mentor
                  </YButton>
                </Link>

              </div>
            </div>
          </div>

        </div>
      ))}

    </div>

    {!BackUpto && <Footer />}
    {loading && <LoaderOverlay />}

  </div>
);
}

export default CourseDetails;
