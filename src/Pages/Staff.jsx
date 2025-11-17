import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Classroom from "../assets/Student/Classroom.png";
import RButton from "../components/Common/Buttons/rButton";
import Footer from "../components/Common/Footer/Footer";
import LandingImage from "../components/Common/landingImage";
import RedBar from "../components/Common/redBar";
import { getAllTeacherCategories } from "../services/operations/teacherAPI";
import Error from "./Error";

const Staff = () => {
  const [loading, setLoading] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await getAllTeacherCategories();
        if (res && res.length > 0) {
          setCategories(res);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchData();
  }, []);

  const groupedCategories = categories.reduce((acc, category) => {
    const branch = category.branch || "Other";
    if (!acc[branch]) acc[branch] = [];
    acc[branch].push(category);
    return acc;
  }, {});

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (categories.length === 0) return <Error />;

  return (
    <div className="overflow-x-hidden">
      <div className="relative">
        <LandingImage
          LineImage={Classroom}
          text={"Faculty & Staff"}
          className="z-10 lg:h-[750px] md:h-[600px] sm:h-full xs:h-full"
          textClassName="text-[30px] sm:text-[50px] lg:text-[60px] text-center uppercase font-bold"
        />

        <div className="absolute bottom-0 left-0 w-full z-20 xs:translate-y-5 sm:translate-y-16 md:translate-y-18 lg:translate-y-24">
          <RedBar
            className="font-m1"
            text="In every classroom, there’s a spark waiting to become a flame and a teacher ready to light it"
            textClassName="font-m1 text-center text-[16px] sm:text-[22px] md:text-[24px] lg:text-[28px] px-4"
          />
        </div>
      </div>

      <div className="w-[80%] mx-auto xl:mt-36 lg:mt-36 mt-20">
        {Object.entries(groupedCategories).map(([branch, categories]) => (
          <div key={branch} className="mb-24 ">
            <div className="flex flex-col gap-5 items-center justify-center mb-10">
              <h2 className="text-2xl font-semibold  text-center font-m1 xl:text-[45px] lg:text-[45px] md:text-[40px] sm:text-[30px] xs:text-[25px] text-bhawaniDark">
                {branch} Staff
              </h2>
              <div className="w-[35%] h-[2px] bg-bhawaniYellow"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className="border group bg-bhawaniBeige p-4 flex flex-col justify-center items-center
                    shadow-[0_4px_10px_rgba(152,0,46,0.1)] hover:shadow-[0_8px_20px_rgba(152,0,46,0.2),_0_0_10px_rgba(253,183,20,0.3)] 
                    transition-shadow duration-300 rounded-lg"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="xl:w-[200px] lg:w-[200px] md:w-[170px] sm:w-[140px] xs:w-[110px] xl:h-[205px] lg:h-[205px] md:h-[175px] sm:h-[145px] xs:h-[115px] object-cover mb-2 rounded xl:group-hover:scale-110 lg:group-hover:scale-110 transition-all duration-700"
                  />
                  <p className="font-semibold font-m1 text-center xl:text-[22px] lg:text-[22px] md:text-[20px] sm:text-[18px] xs:text-[17px]">
                    {category.name}
                  </p>
                  <Link
                    to={`/staff/${category.name
                      .split(" ")
                      .join("-")
                      .toLowerCase()}`}
                  >
                    <RButton className="xl:scale-0 lg:scale-0 scale-100 text-[15px] font-verdana mt-3 xl:group-hover:scale-100 lg:group-hover:scale-100 transition-all duration-700">
                      {"Know Your Mentors"}
                    </RButton>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Staff;
