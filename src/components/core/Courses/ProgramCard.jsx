import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../../Pages/Error";
import { showAllCategoryPrograms } from "../../../services/operations/courseAPI";
import RButton from "../../Common/Buttons/rButton";

function ProgramCard() {
  const [loading, setLoading] = useState(0);
  const [catProgram, setCatProgram] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(prev => prev + 1)
      try {
        const res = await showAllCategoryPrograms();
        if (res && res.length > 0) {
          setCatProgram(res);
        }
      } catch (error) {
        console.log("Error fetching category program : ", error);
      } finally {
        setLoading(prev => prev - 1)
      }
    };

    fetchData();
  }, []);

  if (loading > 0)
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="loader"></div>
      </div>
    );
  if (catProgram.length === 0) return <Error />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-20">
      {catProgram.map((category) => (
        <div
          key={category._id}
          className="relative xl:h-[400px] lg:h-[350px] md:h-[300px] sm:h-[270px] xs:h-[250px] 
                     group overflow-hidden rounded-xl shadow-xl transition-all duration-700 
                     lg:hover:-translate-y-2"
        >
          {/* Background Image */}
          <img
            src={category.image}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover"
          />

          {/* Gradient Overlay */}
          <div
            className="absolute top-0 left-0 w-full h-full rounded-xl 
            bg-gradient-to-t from-black/80 via-black/50 to-transparent 
            opacity-70 transition-opacity duration-700 ease-in-out 
            z-10 group-hover:opacity-80"
          ></div>

          {/* Foreground Text Content */}
          <div
            className="absolute lg:bottom-10 md:bottom-8 bottom-5 lg:left-10 md:left-8 sm:left-5 left-4 flex flex-col text-white z-20 
            transition-all duration-700"
          >
            <p
              className="font-m1 text-bhawaniLight font-bold lg:text-[36px] md:text-[30px] sm:text-[27px] text-[22px]
              lg:translate-y-[60px] lg:group-hover:-translate-y-[10px] transition-all duration-700"
            >
              {category.name}
            </p>

            <p
              className="lg:text-[18px] md:text-[16px] text-[14px] lg:opacity-0 opacity-100 text-bhawaniLight lg:w-[400px] md:w-[300px] sm:w-[300px] xs:w-[230px]
              lg:group-hover:opacity-100 delay-150 transition-all duration-500 mt-2"
            >
              {category.description}
            </p>

            <Link
              to={`/course/${category.name.split(" ").join("-").toLowerCase()}`}
            >
              <RButton className="px-10 py-2 mt-4">Discover Program</RButton>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramCard;
