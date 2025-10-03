import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Error from "../../../Pages/Error";
import { showAllCategoryPrograms } from "../../../services/operations/courseAPI";
import RButton from "../../Common/Buttons/rButton";

function ProgramCard() {
  const [loading, setLoading] = useState(true);
  const [catProgram, setCatProgram] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await showAllCategoryPrograms();
        if (res && res.length > 0) {
          setCatProgram(res);
        }
      } catch (error) {
        console.log("Error fetching category program : ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
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
          className="relative lg:h-[400px] h-[350px] group overflow-hidden rounded-xl shadow-xl transition-all duration-700 hover:-translate-y-2"
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
            className="relative flex flex-col -translate-y-[230px] ml-10 text-white z-20 
            opacity-100 ease-in-out "
          >
            <p
              className="font-m1 text-bhawaniLight translate-y-[50px] font-bold lg:text-[36px] text-[30px]
              group-hover:-translate-y-[30px] transition-all duration-700"
            >
              {category.name}
            </p>

            <p
              className="lg:text-[18px] text-[16px] opacity-0 -translate-y-[20px] text-bhawaniLight lg:w-[400px] w-[300px]
              group-hover:opacity-100 delay-150 transition-all duration-500"
            >
              {category.description}
            </p>

            <Link
              to={`/course/${category.name.split(" ").join("-").toLowerCase()}`}
            >
              <RButton className="w-[200px] mt-2">{"Discover Program"}</RButton>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProgramCard;
